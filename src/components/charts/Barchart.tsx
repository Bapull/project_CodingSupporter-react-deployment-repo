import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Barchart = () => {
  const baseUrl = import.meta.env.VITE_BACK_URL;
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
        width: "45%",
        height: "50%",
        margin: "0 auto",
        marginLeft: "5%",
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
              backgroundColor: ["#6c92bf", "#8ba7cc", "#a8bcd8", "#c5d2e5"],
              borderColor: ["#c5d2e5", "#a8bcd8", "#8ba7cc", "#6c92bf"],
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
