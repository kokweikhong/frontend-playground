import React from "react";
import * as echarts from "echarts";

const EchartManual: React.FC = () => {
  const [dataset, setDataset] = React.useState<number[]>([
    820, 932, 901, 934, 1290, 1330, 1320,
  ]);

  const chart = React.useRef<echarts.ECharts | null>(null);

  React.useEffect(() => {
    const chartDom = document.getElementById("main2");
    if (chartDom == null || chartDom == undefined) {
      return;
    }
    chart.current = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
    chart.current.setOption({

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
          label: {
            show: true,
          }
        },
      ],
    })
  }, [dataset]);


    return (
      <div className="bg-red w-full">
        <div id="main2" className="w-full h-[400px]"></div>
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
