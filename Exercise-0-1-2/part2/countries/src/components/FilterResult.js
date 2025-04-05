import Country from './Country'


const FilterResult = ({countries, setCountries}) => {
    // console.log(countries.length)
    if(countries.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    }
    else if((countries.length >1 && countries.length <=10) || countries.length === 0){
        return(
            <div>
                {countries.map((country, index) => <p key={index}>{country.name.common} <button onClick={() => setCountries([country])}>Show</button></p>)}
            </div>
        )
    }
    else{
        return(
            <Country country={countries[0]}/>
        )
    }
}

export default FilterResult
