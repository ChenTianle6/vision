<template>
	<div class="com-container" @dblclick="revertMap">
		<div class="com-chart" ref="mapRef"></div>
	</div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { getProvinceMapInfo } from '../utils/map_utils'
export default {
	data () {
		return {
			chartInstance: null,
			allData: null,
			mapData: {}
		}
	},
	created() {
		this.$socket.registerCallBack('mapData', this.getData)
	},
	mounted() {
		this.initChart();
		this.$socket.send({
			action: 'getData',
			socketType: 'mapData',
			chartName: 'map',
			value: ''
		});
		window.addEventListener('resize', this.screenAdapter);
		this.screenAdapter();
	},
	destroyed() {
		window.removeEventListener('resize',this.screenAdapter);
		this.$socket.unRegisterCallBack('mapData');
	},
	methods: {
		async initChart() {
			this.chartInstance = this.$echarts.init(this.$refs.mapRef, this.theme);
			const ret = await axios.get('http://localhost:4000/static/map/china.json');
			this.$echarts.registerMap('china', ret.data);
			const initOption = {
				title: {
					text: '▎商家分布',
					left: 20,
					top: 20
				},
				geo: {
					type: 'map',
					map: 'china',
					top: '5%',
					bottom: '5%',
					itemStyle: {
						areaColor: '#2e72bf',
						borderColor: '#333'
					}
				},
				legend: {
					left: '5%',
					bottom: '5%',
					orient: 'vertical'
				}
			};
			this.chartInstance.setOption(initOption);
			// 地图点击事件监听
			this.chartInstance.on('click', async arg => {
				const provinceInfo = getProvinceMapInfo(arg.name);
				if (!this.mapData[provinceInfo.key]){
					const ret = await axios.get('http://localhost:4000' + provinceInfo.path);
					this.mapData[provinceInfo.key] = ret.data;
					this.$echarts.registerMap(provinceInfo.key, ret.data);
				}
				const changeOption = {
					geo: {
						map: provinceInfo.key
					}
				};
				this.chartInstance.setOption(changeOption);
			});
		},
		getData(ret){
			this.allData = ret;
			this.updateChart();
		},
		updateChart() {
			const legendArr = this.allData.map(item => {
				return item.name;
			});
			const seriesArr = this.allData.map(item => {
				return {
					type: 'effectScatter',
					rippleEffect: {
						scale: 5,
						brushType: 'stroke'
					},
					name: item.name,
					data: item.children,
					coordinateSystem: 'geo'
				}
			});
			const dataOption = {
				series: seriesArr,
				legend: {
					data: legendArr
				}
			};
			this.chartInstance.setOption(dataOption);
		},
		screenAdapter() {
			const titleFontSize = this.$refs.mapRef.offsetWidth / 100 * 3.6;
			const adapterOption = {
				title: {
					textStyle: {
						fontSize: titleFontSize
					}
				},
				legend: {
					itemWidth: titleFontSize / 2,
					itemHeight: titleFontSize / 2,
					itemGap: titleFontSize / 2,
					textStyle: {
						fontSize: titleFontSize / 2
					}
				}
			};
			this.chartInstance.setOption(adapterOption);
			this.chartInstance.resize();
		},
		revertMap() {
			const revertOption = {
				geo: {
					map: 'china'
				}
			};
			this.chartInstance.setOption(revertOption);
		}
	},
	computed: {
		...mapState(['theme'])
	},
	watch: {
		theme() {
			this.chartInstance.dispose();
			this.initChart();
			this.screenAdapter();
			this.updateChart();
		}
	}
};
</script>
<style scoped lang='less'>
 
</style>
