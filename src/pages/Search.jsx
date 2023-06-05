//imports
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Search = () => {
  //states
  const [loading, setLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //fonction pour récupérer toutes les données
  const getCountries = () => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setLoading(false);
      setFilteredCountries(res.data);
    });
  };

  //fonction qui filtre les pays selon ce que l'on entre dans le champ de recherche
  const filterByLanguage = (e, searchInput) => {
    e.preventDefault();
    //si le champ de recherche est vide, on affiche tous les pays
    if (searchInput == "") {
      getCountries();
    } else {
      try {
        axios
          .get(`https://restcountries.com/v3.1/lang/${searchInput}`)
          .then((res) => {
            setLoading(false);
            setFilteredCountries(res.data);
          });
      } catch (err) {
        //j'ai une erreur Uncaught(in promise) avec ce bloc trycatch, empêchant l'alerte toastify de se lancer
        toast.error("Veuillez entrer une langue valide (en anglais)");
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  //tous les pays sont récupérés lors du chargement de la page :
  useEffect(() => {
    setLoading(true);
    getCountries();
  }, []);

  //utilisation du composant <Loading/> à chaque changement du state loading
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="home-container">
        <h1 className="title">Ma super page de recherche</h1>
        <form>
          <input
            type="search"
            placeholder="Rechercher par langue"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => filterByLanguage(e, searchInput)}
          >
            Search
          </button>
        </form>

        <div className="countries-container">
          {filteredCountries.map((country, index) => {
            return (
              <div className="country-card" key={index}>
                <img className="flag" src={country.flags.svg} />
                <p className="continent">{country.region}</p>
                <p className="country-name">
                  {country.translations.fra.common}
                </p>
                <p className="languages">Liste des langues parlées :</p>

                {/* La console me renvoie la même erreur que dans la page Home quand je décommente la partie ci-dessous */}

                {/* <p>
                  {Object.values(country.languages).map(
                    (lang, index) => (index ? ", " : "") + lang
                  )}
                </p> */}

                <a href={country.maps.googleMaps} target="_blank">
                  <button className="google-maps-btn">
                    Voir sur Google Maps
                  </button>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Search;
