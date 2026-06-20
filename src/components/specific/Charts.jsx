import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Filler,
  Tooltip,
  LineElement,
  ArcElement,
  Legend,
  PointElement,
  LinearScale,
  Chart as ChartJS,
} from "chart.js";
import { orange, orangeLight, purple, purpleLight } from "../constants/Color.js";
import { getLast7Days } from "../../lib/featues";

ChartJS.register(
  CategoryScale,
  Filler,
  PointElement,
  Tooltip,
  LinearScale,
  LineElement,
  ArcElement,
  Legend,
);
const labels=getLast7Days()

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
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
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};


/////////////         charts 
const LineChart = ({value=[]}) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Revenue",
        fill: true,
        backgroundColor: purpleLight,
        borderColor: purple,
      },
     
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};





const doughnutChartOptions={
 responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout:110
  //  cutout: "70%",
}

const DoughnutChart = ({value=[],labels=[]}) => {
      const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Total Chats vs Groups Chats",
        fill: true,
        backgroundColor: [purpleLight,orangeLight],
        borderColor: [purple,orange],
        hoverBackgroundColor:[purple,orange],
        offset:30
      },
     
    ],
  };
  return <Doughnut data={data} options={doughnutChartOptions}
  style={{zIndex:10}}
  />
};

export { LineChart, DoughnutChart };
