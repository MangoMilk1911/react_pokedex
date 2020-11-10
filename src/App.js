import React, { useState, useEffect } from "react";
import PokemonList from "./components/PokemonList.js";
import axios from "axios";
import Pagination from "./components/Pagination.js";
import style from './styling.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [primaryType, setPrimaryType] = useState();
  const [pokemonURL, setPokemonURL] = useState();
  const [colour, setColour] = useState();
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=36"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        console.log(res)
        setPokemon(res.data.results)
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPreviousPageUrl(res.data.previous);
        setPokemonURL(res.data.results.map((p) => p.url));
      })

    return () => {
      cancel();
    };
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPreviousPage() {
    setCurrentPageUrl(previousPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList className={style.pokemon} pokemonList={pokemon} type={primaryType} />
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPreviousPage={previousPageUrl ? goToPreviousPage : null}
      />
    </>
  );
}

export default App;
