<script lang="ts">
	import { onMount } from 'svelte';
	import * as echarts from 'echarts';

	onMount(() => {
		var chartDom = document.getElementById('main');
		var myChart = echarts.init(chartDom);
		var option = {
			xAxis: {
				type: 'category',
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					data: [150, 230, 224, 218, 135, 147, 260],
					type: 'line'
				}
			]
		};
		option && myChart.setOption(option);
	});
</script>

<div id="main" style="width: 600px;height:400px;" />
