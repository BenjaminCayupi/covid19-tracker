import React from "react";
import styles from "./Card.module.css";
import CountUp from "react-countup";
import { Spring } from "react-spring/renderprops";

function Card({ data: { confirmed, deaths, recovered, lastUpdate } }) {
  let options = { year: "numeric", month: "long", day: "numeric" };
  let cardData = [
    {
      styleCard: `column card is-3-desktop is-12-tablet ${styles.confirmed}`,
      styleTitle: `${styles.title}`,
      title: "Confirmados",
      icon: `fas fa-virus fa-lg ${styles.icon_confirmed}`,
      styleSubtitle: `${styles.subtitle}`,
      data: confirmed,
      styleDate: `${styles.date}`,
      lastUpdate: lastUpdate,
    },
    {
      styleCard: `column card is-3-desktop is-12-tablet ${styles.recovered}`,
      styleTitle: `${styles.title}`,
      title: "Recuperados",
      icon: `fas fa-heartbeat fa-lg ${styles.icon_recovered}`,
      styleSubtitle: `${styles.subtitle}`,
      data: recovered,
      styleDate: `${styles.date}`,
      lastUpdate: lastUpdate,
    },
    {
      styleCard: `column card is-3-desktop is-12-tablet ${styles.deaths}`,
      styleTitle: `${styles.title}`,
      title: "Fallecidos",
      icon: `fas fa-skull fa-lg ${styles.icon_deaths}`,
      styleSubtitle: `${styles.subtitle}`,
      data: deaths,
      styleDate: `${styles.date}`,
      lastUpdate: lastUpdate,
    },
  ];

  if (!confirmed) {
    return (
      <div className={`container ${styles.content_loading}`}>
        {/* <progress className="progress is-small is-primary" max="100">
          15%
        </progress> */}
        Cargando ...
      </div>
    );
  } else {
    return (
      <Spring from={{ marginTop: -100 }} to={{ marginTop: 0 }}>
        {(props) => (
          <div style={props}>
            <div className={`columns is-desktop ${styles.content}`}>
              {cardData.map((data) => (
                <div className={data.styleCard}>
                  <div className={`card-content ${styles.card}`}>
                    <div className="content">
                      <div className={data.styleTitle}>
                        <h5 className="title is-5">{data.title}</h5>
                        <i className={data.icon}></i>
                      </div>
                      <h3 className={data.styleSubtitle}>
                        <CountUp
                          start={0}
                          end={data.data}
                          duration={1.1}
                          separator="."
                        />
                      </h3>
                      <p className={data.styleDate}>
                        {new Date(data.lastUpdate).toLocaleDateString(
                          "es-ES",
                          options
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

export default Card;
