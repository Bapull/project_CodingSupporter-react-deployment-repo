import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const ErrorType = {
  LogicalError: "1",
  SyntaxError: "2",
  RuntimeError: "3",
  EtcError: "4",
};

const Barchart = () => {
  const baseUrl = "https://localhost:3000";
  const [errors, setErrors] = useState(ErrorType);

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

        console.log("Fetched data:", data.errorInfo);

        // 데이터를 올바르게 매핑하여 설정
        const mappedErrors = {
          LogicalError: data.errorInfo[ErrorType.LogicalError] || 0,
          SyntaxError: data.errorInfo[ErrorType.SyntaxError] || 0,
          RuntimeError: data.errorInfo[ErrorType.RuntimeError] || 0,
          EtcError: data.errorInfo[ErrorType.EtcError] || 0,
        };

        console.log("Mapped errors:", mappedErrors);
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
              data: [
                errors.LogicalError,
                errors.SyntaxError,
                errors.RuntimeError,
                errors.EtcError,
              ],
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
