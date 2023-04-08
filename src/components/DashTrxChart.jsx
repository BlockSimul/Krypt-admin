import { Box, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

function DashTrxChart({ trx }) {
  const [chartData, setChartData] = useState({
    labels: trx?.map((data) => new Date(data.createdAt).toLocaleString()),
    datasets: [
      {
        label: "Recieved",
        data: trx
          ?.filter((data) => data.type === "credit")
          ?.map((data) => data.amount),
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 2,
        lineTension: 0.5,
        fill: true,
      },
      {
        label: "Sent",
        data: trx
          ?.filter((data) => data.type === "debit")
          ?.map((data) => data.amount),
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 2,
        lineTension: 0.5,
        fill: true,
      },
    ],
  });

  useEffect(() => {
    trx &&
      setChartData({
        labels: trx?.map((data) => new Date(data.createdAt).toLocaleString()),
        datasets: [
          {
            label: "Recieved",
            data: trx
              ?.filter((data) => data.type === "credit")
              ?.map((data) => data.amount),
            backgroundColor: "green",
            borderColor: "green",
            borderWidth: 2,
            lineTension: 0.5,
            fill: true,
          },
          {
            label: "Sent",
            data: trx
              ?.filter((data) => data.type === "debit")
              ?.map((data) => data.amount),
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 2,
            lineTension: 0.5,
            fill: true,
          },
        ],
      });
  }, [trx]);
  return (
    <Box
      border={"1px solid"}
      borderColor={useColorModeValue("gray.400", "gray.500")}
      rounded={"lg"}
      p={6}
      overflowX={"auto"}
    >
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                useBorderRadius: true,
                usePointStyle: true,
                pointStyle: "circle",
                font: { family: "Euclid Circular B", weight: "500" },
              },
            },
            title: {
              display: true,
              text: "Transactions",
              position: "bottom",
              font: { family: "Euclid Circular B", weight: "500" },
              padding: {
                top: 10,
                bottom: 30,
              },
            },
          },
        }}
      />
    </Box>
  );
}

export default DashTrxChart;
