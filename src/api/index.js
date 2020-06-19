import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';

export async function getData (country){
   // Obtener solo los datos de los confirmados, fallecidos, recuperados y la ultima actualizacion desde la api
   let dinamicUrl = url;
   if(country){
      dinamicUrl = `${url}/countries/${country}`
   }
   try {
      const {data:{confirmed, deaths, recovered, lastUpdate }} = await axios.get(dinamicUrl);
      const modifiedData = {
         confirmed: confirmed.value,
         deaths: deaths.value,
         recovered: recovered.value,
         lastUpdate: lastUpdate,
      }
      return modifiedData;
   } catch (error) {
      alert(error)
   }
}

export async function getDailyData(){
   // Obtener los casos por dia de pacientes confirmados, fallecidos y la fecha por dia 
   try {
      const {data} = await axios.get(url + '/daily');
      const modifiedData= data.map((day) => ({
         confirmed: day.confirmed.total,
         deaths: day.deaths.total,
         date: day.reportDate,
      }));
      return modifiedData
   } catch (error) {
      alert(error)
   }
}

export async function getCountries(){
   try {
      const {data:{countries}} = await axios.get(url + '/countries');
      const modifiedData = countries.map((country) => (country.name))
      return modifiedData;
   } catch (error) {
      
   }
}