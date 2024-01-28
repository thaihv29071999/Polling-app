import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = ({ pollingOptions }) => {
  const totalVote = pollingOptions.reduce((accumulator, item) => {
    if (Array.isArray(item.optionUsers)) {
      accumulator += item.optionUsers.length;
    }
    return accumulator;
  }, 0);
  const labels = pollingOptions?.map((e) => e?.content);
  const datalabel = pollingOptions?.map(
    (e) => (e?.optionUsers?.length / totalVote).toFixed(2) * 100 ?? 0
  );
  const data = {
    labels,
    datasets: [
      {
        label: "Vote",
        data: datalabel,
        backgroundColor: "green",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
export default Chart;
