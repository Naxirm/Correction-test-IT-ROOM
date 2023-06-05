//imports
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

const Home = () => {
  //states
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxCount, setMaxCount] = useState(6);

  //fonction pour récupérer toutes les données
  const getCountries = () => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setLoading(false);
      setCountries(res.data);
    });
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
        <div className="countries-container">
          {countries.slice(0, maxCount).map((country, index) => {
            return (
              <div className="country-card" key={index}>
                <img className="flag" src={country.flags.svg} />
                <p className="continent">{country.region}</p>
                <p className="country-name">
                  {country.translations.fra.common}
                </p>
                <p className="languages">Liste des langues parlées :</p>

                {/* La partie commentée ci-dessous, pour afficher les langues parlées, fonctionne pour les six premières cartes mais lorsque j'essaye d'en charger plus, l'erreur "can't convert undefined to object" s'affiche dans ma console. Il semblerait que l'objet en question passe par un état non défini, mais je ne parviens pas à résoudre le problème.
                Vous pouvez essayer de décommenter la partie en question afin de tester */}

                {/* <p>
                  {Object.values(country.languages).map((lang, index) => {
                    return (index ? ", " : "") + lang;
                  })}
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
        {maxCount <= countries.length && (
          <button
            onClick={() => setMaxCount(maxCount + 6)}
            className="show-more-btn"
          >
            Voir plus
          </button>
        )}
      </div>
    </>
  );
};
export default Home;
