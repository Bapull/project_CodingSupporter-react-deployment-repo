import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";

interface GraphData {
  id: string;
  value: number;
}

const Piechart = () => {
  const [graphInfo, setGraphInfo] = useState<GraphData[]>([]);
  const baseUrl = "https://localhost:3000";

  // 그래프 정보 호출(언어별로 몇 개의 오답노트가 있는지)
  useEffect(() => {
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
    padClick: (data: any) => {
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
      <ResponsivePie
        /**
         * chart에 사용될 데이터 */
        data={graphInfo}
        /**
         * chart margin */
        margin={{ top: 40, right: 80, bottom: 80, left: 50 }}
        /**
         * chart 중간 빈공간 반지름 */
        innerRadius={0.5}
        /**
         * pad 간격 */
        padAngle={0}
        /**
         * pad radius 설정 (pad별 간격이 있을 시 보임) */
        cornerRadius={0}
        /**
         * chart 색상 */
        colors={["#6c92bf", "#8ba7cc", "#a8bcd8", "#c5d2e5"]} // 커스터하여 사용할 때
        // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
        /**
         * pad border 두께 설정 */
        borderWidth={0}
        /**
         * link label skip할 기준 각도 */
        arcLinkLabelsSkipAngle={0}
        /**
         * link label 색상 */
        arcLinkLabelsTextColor="#000000"
        /**
         * link label 연결되는 선 두께*/
        arcLinkLabelsThickness={1}
        /**
         * link label 연결되는 선 색상 */
        arcLinkLabelsColor={{ from: "color" }} // pad 색상에 따라감
        /**
         * label (pad에 표현되는 글씨) skip할 기준 각도 */
        arcLabelsSkipAngle={10}
        theme={{
          /**
           * label style (pad에 표현되는 글씨) */
          labels: {
            text: {
              fontSize: 10,
              fill: "#000000",
            },
          },
          /**
           * legend style (default로 하단에 있는 색상별 key 표시) */
          legends: {
            text: {
              fontSize: 10,
              fill: "#000000",
            },
          },
        }}
        /**
         * pad 클릭 이벤트 */
        onClick={handle.padClick}
        /**
         * legend 설정 (default로 하단에 있는 색상별 key 표시) */
        legends={[
          {
            anchor: "bottom", // 위치
            direction: "column", // item 그려지는 방향
            justify: false, // 글씨, 색상간 간격 justify 적용 여부
            translateX: 100, // chart와 X 간격
            translateY: 60, // chart와 Y 간격
            itemsSpacing: 0, // item간 간격
            itemWidth: 20, // item width
            itemHeight: 20, // item height
            itemDirection: "left-to-right", // item 내부에 그려지는 방향
            itemOpacity: 1, // item opacity
            symbolSize: 12, // symbol (색상 표기) 크기
            symbolShape: "circle", // symbol (색상 표기) 모양
            effects: [
              {
                // 추가 효과 설정 (hover하면 textColor를 olive로 변경)
                on: "hover",
                style: {
                  itemTextColor: "olive",
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

export default Piechart;
