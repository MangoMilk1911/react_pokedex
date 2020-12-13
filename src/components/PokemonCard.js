import React, { Component } from "react";
import { Card, CardContent, GridList, GridListTile, Grid, Link, Typography, makeStyles, Paper, ThemeProvider } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
  },
  paper: {
    padding: theme.spacing(10),
    color: theme.palette.text.secondary,
  },
}));

export default function PokemonCard({ pokemonData }) {

  const classes = useStyles();

  const { id } = pokemonData

  return (

    <>
      <Link to={`/pokemon/${id}`}>
        <Grid container justify="center" spacing={3}>

          <Grid item >
            <Paper className={classes.paper}>
              <Typography
                className={classes.title}
              // color="textSecondary"
              >
                {pokemonData.name}
              </Typography>
              <p>{pokemonData.id}</p>
              <div><img src={pokemonData.sprites.front_default} /></div>
            </Paper>
          </Grid>
        </Grid>
      </Link>
    </>
  );
}
