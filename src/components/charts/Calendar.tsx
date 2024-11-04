import { ResponsiveCalendar } from "@nivo/calendar";
import React, { useEffect, useState } from "react";

interface Attendance {
  value: 100;
  day: string;
}

const Calendar = () => {
  const [data, setData] = useState<Attendance[]>([]);
  const baseUrl = "https://localhost:3000";

  useEffect(() => {
    fetch(`${baseUrl}/user/attendance`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => data.attendance)
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

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
        data={data}
        from="2024-01-01"
        to="2025-12-30"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={1}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
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
