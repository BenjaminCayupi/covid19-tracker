import React from "react";
import styles from './Footer.module.css';
function Footer() {
  return (
    <React.Fragment>
      <footer className={`footer ${styles.footer}`}>
        <div className="content has-text-centered">
          <p>
            <strong>Autor :</strong> {" "}
            <a href="https://github.com/benjaminCayupi">Benjamin Cayupi</a>
            {" "} / {" "}
            <strong>API :</strong> {" "}
            <a href="https://github.com/mathdroid/covid-19-api#covid-19-api">mathdroid</a>
            {" "}
            - MIT License 2020, mathdroid.
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
