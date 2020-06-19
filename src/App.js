import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import Card from './components/Card/Card';
import Chart from './components/Chart/Chart';
import Footer from './components/Footer/Footer';
import CountryPicker from './components/CountryPicker/CountryPicker';
import {getData} from './api';


function App() {
  const [data, setData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    async function fetchData(){
      const result = await getData();
      setData(result)
    }
    fetchData();
  }, []);

  async function handleCountryChange(country){
    const result = await getData(country);
    setData(result);
    setSelectedCountry(country);;
    console.log(country);
  }

  return ( 
    <React.Fragment>
      <div className={`container is-fluid ${styles.container}`}>
        <div className={styles.titleHeader}>
          <h3 className={`title is-3 ${styles.title}`}>Covid-19 Tracker</h3>
          <i class={`fas fa-virus fa-2x ${styles.icon}`}></i>
        </div>
        <Card data={data}/>
        <CountryPicker handleCountryChange={handleCountryChange}/>
        <Chart data={data} country={selectedCountry}/>
      </div>
      <Footer/>
    </React.Fragment>
    
  );
}

export default App;
