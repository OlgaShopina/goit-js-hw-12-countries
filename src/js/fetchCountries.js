import createMarkup from '../index';

export default function fetchCountries(searchQuery) {
  
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(res => res.json())
    .then(name => createMarkup(name))
    .catch(err => console.log(err));
}

