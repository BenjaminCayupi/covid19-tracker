import React, { useEffect, useState } from "react";
import { getDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import { Spring } from "react-spring/renderprops";

function Chart({ data: { confirmed, deaths, recovered }, country }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    async function fetchDailyData() {
      const result = await getDailyData();
      setDailyData(result);
    }
    fetchDailyData();
  }, []);

  const lineChart = (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infectados",
            borderColor: "#3d5afe",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Fallecidos",
            borderColor: "red",
            backgroundColor: "#f06292",
            fill: true,
          },
        ],
      }}
    />
  );
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Confirmados", "Recuperados", "Fallecidos"],
        datasets: [
          {
            label: "Personas",
            backgroundColor: ["#3d5afe", "#64ffda", "#f06292"],
            data: [confirmed, recovered, deaths],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Indice de casos en ${country}` },
      }}
    />
  ) : null;

  if (!dailyData) {
    return <div>Loading ...</div>;
  } else {
    return (
      <Spring
      from={{opacity: 0, marginLeft: -1000}}
      to={{opacity: 1, marginLeft: 0}}
      >
        {(props) => (
          <div style={props}>
            <div className={styles.container}>
              <div className={`box ${styles.box}`}>
                <div className={styles.chart}>
                  {country ? barChart : lineChart}
                </div>
              </div>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default Chart;
