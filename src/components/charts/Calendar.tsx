import { ResponsiveCalendar } from "@nivo/calendar";
import { useEffect, useState } from "react";

const Calendar = () => {
  const [attendance, setAttendance] = useState([]);
  const baseUrl = "https://localhost:3000";
  const lastYear = new Date().getFullYear() - 1;
  const thisYear = new Date().getFullYear();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`${baseUrl}/user/attendance`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // console.log(data.attendance);

        const mappedAttendance = data.attendance.map(
          (item: any, index: any) => ({
            day: item,
            value: index + 1,
          })
        );

        // console.log(mappedAttendance);

        setAttendance(mappedAttendance);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchAttendance();
  }, [baseUrl]);

  return (
    <div
      style={{
        width: "100%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
      }}
    >
      <ResponsiveCalendar
        data={attendance.map((item: any) => ({
          day: item.day,
          value: item.value,
        }))}
        to={`${thisYear}-12-31`}
        from={`${lastYear}-12-30`}
        emptyColor="#eeeeee"
        colors={["#6c92bf", "#8ba7cc", "#a8bcd8", "#c5d2e5"]}
        margin={{ top: 0, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={1}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: -50,
            itemCount: 0,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
};

export default Calendar;
