import React from "react";
import * as echarts from "echarts";

const EchartManual: React.FC = () => {
  const [dataset, setDataset] = React.useState<any>([
    820, 932, 901, 934, 1290, 1330, 1320,
  ]); // [
  const initChart = () => {
    var chartDom = document.getElementById("main2");
    var option;

    option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: dataset,
          type: "line",
          smooth: true,
        },
      ],
    };
    var myChart: echarts.ECharts;
    if (chartDom != null && chartDom != undefined) {
      myChart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
      myChart && option && myChart.setOption(option);
    }
    // React.useEffect(() => {

    // }, []);

    // option && myChart && myChart.setOption(option);
  };

  React.useEffect(() => {
    initChart();
  }, [dataset]);

  return (
    <div>
      <div id="main2" className="w-full h-72">
        aa
      </div>
      <button
        onClick={() => {
          setDataset([1, 2, 3, 4, 5, 6, 7]);
        }}
      >
        Get
      </button>
    </div>
  );
};

export default EchartManual;
