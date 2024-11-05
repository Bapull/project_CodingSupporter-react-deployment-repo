import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Barchart = () => {
  const baseUrl = "https://localhost:3000";
  const [errors, setErrors] = useState({
    logical: 0,
    syntax: 0,
    runtime: 0,
    etc: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/user/error-info`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // console.log("Fetched data:", data.errorInfo);

        // 데이터를 올바르게 매핑하여 설정
        const mappedErrors = {
          logical: data.errorInfo["1"] || 0,
          syntax: data.errorInfo["2"] || 0,
          runtime: data.errorInfo["3"] || 0,
          etc: data.errorInfo["4"] || 0,
        };

        // console.log("Mapped errors:", mappedErrors);
        setErrors(mappedErrors);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [baseUrl]);

  return (
    <div
      style={{
        width: "50%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
      }}
    >
      <Bar
        data={{
          labels: ["Logical", "Syntax", "Runtime", "Etc"],
          datasets: [
            {
              label: "Error Information",
              data: [errors.logical, errors.syntax, errors.runtime, errors.etc],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false, // 부모값 참조하기
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default Barchart;
