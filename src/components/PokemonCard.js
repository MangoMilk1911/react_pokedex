import React from "react";
import { Box, Grid, Typography, createMuiTheme, CardMedia, Badge, makeStyles, CardActionArea, Paper, Modal, Card, CardContent, Button } from "@material-ui/core"
import { typingColours } from "../lib/typingColours"
import { useStyles } from "../lib/styles"
import { motion } from "framer-motion"



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function PokemonCard({ pokemonData }) {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();
  const { name, id, sprites, types } = pokemonData;
  const typeColours = Object.keys(typingColours);
  const pokemonTypes = types.map(types => types.type.name);
  const primaryType = typeColours.find(type => pokemonTypes.indexOf(type) > -1);
  const typeColour = typingColours[primaryType];
  const kappa = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  const pokemonImg = "https://img.pokemondb.net/artwork/vector/" + name + ".png"

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pokemonModal = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>

    </div>
  );



  return (

    <>
      {/* TODO: Change Da Font Fam */}
      <Card style={{ backgroundColor: typeColour, borderRadius: 32, width: 384, height: 256 }} >
        <Button type="button" onClick={handleOpen}>
          <CardContent>
            <Box fontWeight="fontWeightBold" fontSize={48} color="primary.contrastText" p={1} >
              {kappa(name)}
            </Box>
            <Badge badgeContent={primaryType} />
            {/* <p>{id}</p> */}
            <Box display="flex" justifyContent="flex-end">
              <CardMedia style={{ width: '40%' }} src={pokemonImg} width="128" component="img" title={kappa(name)} />
            </Box>
          </CardContent>

        </Button>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {pokemonModal}
      </Modal>

    </>

  );
}
