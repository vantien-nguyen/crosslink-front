import { useEffect } from "react";
import Chart from "chart.js/auto";

interface Props {
  labels: string[];
  data: number[] | any;
}

let myLineChart: { destroy: () => void };

const LineChart = ({ labels, data }: Props) => {
  useEffect(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;

    ctx.style.width = "100%";
    ctx.style.height = "100%";
    ctx.width = ctx.offsetWidth;
    ctx.height = ctx.offsetHeight;
    if (typeof myLineChart !== "undefined") myLineChart.destroy();

    myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: [
              "rgba(0, 150, 255, 0.3)",
              "rgba(0, 150, 255, 0.2)",
              "rgba(0, 150, 255, 0.1)",
              "rgba(0, 150, 255, 0)",
              "rgba(0, 150, 255, 0)",
              "rgba(0, 150, 255, 0)",
            ],
            borderColor: "rgb(0, 150, 255)",
            data: data,
            fill: true,
            borderWidth: 3,
            pointStyle: "circle",
            pointRadius: 3,
            pointBackgroundColor: "rgba(255, 255, 255, 1)",
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              color: "grey",
              lineWidth: 0.12,
            },
          },
        },
      },
    });
  });

  return <canvas id="myChart"></canvas>;
};

export default LineChart;
