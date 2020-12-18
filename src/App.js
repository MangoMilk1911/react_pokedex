import React, { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard.js";
import axios from "axios";
import Pagination from "./components/Pagination.js";
import style from './styling.css';
import { Box, TextField, MenuItem, makeStyles, Grid } from "@material-ui/core"



function App() {
  let goToNextPage;
  let goToPreviousPage;
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonURLs, setPokemonURLs] = useState([]);
  const [generation, setGeneration] = React.useState();

  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=36"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  const generations = [
    { label: 'Gen 1' },
    { label: 'Gen 2' },
    { label: 'Gen 3' },
    { label: 'Gen 4' },
    { label: 'Gen 5' },
    { label: 'Gen 6' },
    { label: 'Gen 7' },
  ]

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPreviousPageUrl(res.data.previous);
        setPokemonURLs(res.data.results.map((p) => p.url));
      })


    return () => {
      cancel();
    };
  }, [currentPageUrl]);

  goToNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  }

  goToPreviousPage = () => {
    setCurrentPageUrl(previousPageUrl);
  }

  useEffect(() => {
    if (pokemonURLs.length !== 0) {
      const promises = pokemonURLs.map((p) => axios.get(p));
      (async () => {
        const reqs = await Promise.all(promises)
        const data = reqs.map((r) => r.data);
        setPokemonData(data);
      })()

    }
  }, [pokemonURLs])

  if (loading) return "Loading...";



  const handleChange = (event) => {
    setGeneration(event.target.label)
  }



  return (
    <>
      <h1>PokéDex</h1>
      <Grid>
        <form noValidate autoComplete="off">
          <TextField id="standard-basic" label="Search Pokemon TODO" />
        </form>

        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField select
              label="Select Generation"
              value={generation}
              onChange={handleChange}>
              label={generations.map((selection) => (
                < MenuItem key={selection.value} value={selection.value} >
                  {selection.label}
                </MenuItem>
              ))}

            </TextField>
          </div>
        </form>
      </Grid>

      <Box display="flex" flexWrap="wrap" justifyContent="space-between" maxWidth={2304} >
        {pokemonData.map((p) => (
          <PokemonCard pokemonData={p} />
        ))}
      </Box>

      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPreviousPage={previousPageUrl ? goToPreviousPage : null}
      />
    </>
  );
}

export default App;
