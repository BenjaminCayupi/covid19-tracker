import React, { useState, useEffect } from "react";
import styles from "./CountryPicker.module.css";
import { getCountries } from "../../api/index";
import { Spring } from "react-spring/renderprops";

function CountryPicker({ handleCountryChange }) {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    async function fetchCountries() {
      const result = await getCountries();
      setCountries(result);
    }
    fetchCountries();
  }, [setCountries]);
  return (
    <Spring
      from={{opacity: 0 }}
      to={{opacity: 1 }}
    >
      {(props) => (
        <div style={props}>
          <div className={styles.content}>
            <div className="field is-horizontal">
              <div className="field-label is-normal"><label className="label">Pais: </label> </div>
              <div className="field-body">
                <div className="field">
                  <div className="control has-icons-left">
                    <div className="select">
                      <select onChange={(e) => { handleCountryChange(e.target.value); }} >
                        <option value="" defaultValue> - Global - </option>
                        {countries.map((country, i) => (
                          <option value={country} key={i}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="icon is-small is-left"> {" "} <i className="fas fa-globe"></i>{" "} </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Spring>
  );
}

export default CountryPicker;
