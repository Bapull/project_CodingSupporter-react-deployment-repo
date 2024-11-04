import * as React from "react";
import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
// import { ErrorType } from "../../utils/ErrorType"; // error.logical -> 로지컬 굿

interface GraphData {
  id: string;
  value: number;
}

const Barchart = () => {
  const [attendance, setAttendance] = useState([]);
  const [graphInfo, setGraphInfo] = useState<GraphData[]>([]);
  const baseUrl = "https://localhost:3000";

  useEffect(() => {
    setAttendance([]);
    fetch(`${baseUrl}/user/graph`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => res.data)
      .then((data) => {
        const formattedData = Object.entries(data).map(([id, value]) => ({
          id,
          value: Number(value),
        }));
        setGraphInfo(formattedData);
      });
  }, []);

  const handle = {
    barClick: (data: any) => {
      console.log(data);
    },

    legendClick: (data: any) => {
      console.log(data);
    },
  };

  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div
      style={{
        width: "50%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
      }}
    >
      <ResponsiveBar
        /**
         * chart에 사용될 데이터 */
        data={[
          { month: "1", logical: 12, systax: 10, runtime: 11, etc: 10 },
          { month: "2", logical: 13, systax: 20, runtime: 21, etc: 5 },
          { month: "3", logical: 10, systax: 20, runtime: 11, etc: 6 },
          { month: "4", logical: 20, systax: 20, runtime: 21, etc: 3 },
        ]}
        /**
         * chart에 보여질 데이터 key (측정되는 값) */
        keys={["logical", "syntax", "runtime", "etc"]}
        /**
         * keys들을 그룹화하는 index key (분류하는 값) */
        indexBy="month"
        /**
         * chart margin */
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        /**
         * chart padding (bar간 간격) */
        padding={0.3}
        /**
         * chart 색상 */
        colors={{ scheme: "blues" }} // 커스터하여 사용할 때
        // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
        /**
         * color 적용 방식 */
        colorBy="id" // 색상을 keys 요소들에 각각 적용
        // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용
        theme={{
          /**
           * label style (bar에 표현되는 글씨) */
          labels: {
            text: {
              fontSize: 14,
              fill: "#000000",
            },
          },
          /**
           * legend style (default로 우측 하단에 있는 색상별 key 표시) */
          legends: {
            text: {
              fontSize: 10,
              fill: "#000000",
            },
          },
          axis: {
            /**
             * axis legend style (bottom, left에 있는 글씨) */
            legend: {
              text: {
                fontSize: 10,
                fill: "#000000",
              },
            },
            /**
             * axis ticks style (bottom, left에 있는 값) */
            ticks: {
              text: {
                fontSize: 10,
                fill: "#000000",
              },
            },
          },
        }}
        /**
         * axis bottom 설정 */
        axisBottom={{
          tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
          tickPadding: 5, // tick padding
          tickRotation: 0, // tick 기울기
          legend: "bottle", // bottom 글씨
          legendPosition: "middle", // 글씨 위치
          legendOffset: 40, // 글씨와 chart간 간격
        }}
        /**
         * axis left 설정 */
        axisLeft={{
          tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
          tickPadding: 5, // tick padding
          tickRotation: 0, // tick 기울기
          legend: "price", // left 글씨
          legendPosition: "middle", // 글씨 위치
          legendOffset: -50, // 글씨와 chart간 간격
        }}
        /**
         * label 안보이게 할 기준 width */
        labelSkipWidth={36}
        /**
         * label 안보이게 할 기준 height */
        labelSkipHeight={12}
        /**
         * bar 클릭 이벤트 */
        onClick={handle.barClick}
        /**
         * legend 설정 (default로 우측 하단에 있는 색상별 key 표시) */
        legends={[
          {
            dataFrom: "keys", // 보일 데이터 형태
            anchor: "bottom-right", // 위치
            direction: "column", // item 그려지는 방향
            justify: false, // 글씨, 색상간 간격 justify 적용 여부
            translateX: 100, // chart와 X 간격
            translateY: 0, // chart와 Y 간격
            itemsSpacing: 0.5, // item간 간격
            itemWidth: 100, // item width
            itemHeight: 20, // item height
            itemDirection: "left-to-right", // item 내부에 그려지는 방향
            itemOpacity: 0.85, // item opacity
            symbolSize: 12, // symbol (색상 표기) 크기
            effects: [
              {
                // 추가 효과 설정 (hover하면 item opacity 1로 변경)
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
            onClick: handle.legendClick, // legend 클릭 이벤트
          },
        ]}
      />
    </div>
  );
};

export default Barchart;
