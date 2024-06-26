import Chart from "chart.js/auto";
import { useEffect, useRef } from "preact/hooks";
import { Candidate } from "../types/candidate";

interface ChartComponentProps {
  data: Candidate[];
}
export default function ChartComponent({ data }: ChartComponentProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: data.map((candidate: Candidate) => candidate.name),
            datasets: [
              {
                label: "Jumlah Suara",
                data: data.map((candidate: Candidate) => candidate.voteCount),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Jumlah Suara",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Nama Kandidat",
                },
              },
            },
          },
        });
      }
    }
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
}
