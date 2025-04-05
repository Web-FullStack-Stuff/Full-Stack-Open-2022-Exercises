import { useEffect, useState } from 'react'
import axios from 'axios'

import FilterResult from './components/FilterResult'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [filterQuery, setFilterQuery] = useState('')


  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        
        setAllCountries(response.data)
      })
  }, [])

  const handleQueryChange = (event) => {
    setFilterQuery(event.target.value)
    if(filterQuery) {
      const regex = new RegExp(filterQuery, 'i')
      const filteredCountries = () => allCountries.filter(country => country.name.common.match(regex))
      setCountries(filteredCountries)
    }
  }
  
  return (
    <div>
      <Filter value={filterQuery} onChange={handleQueryChange} />
      <FilterResult countries={countries} setCountries={setCountries}/>
    </div>
  );
}


export default App;
