import React from "react";
import { Box, Grid, Typography, createMuiTheme, CardMedia, Badge, makeStyles, CardActionArea, Paper, Modal, Card, CardContent, Button, Dialog } from "@material-ui/core"
import { typingColours } from "../lib/lib"
import { useStyles } from "../lib/styles"
import { motion } from "framer-motion"
import Header from "./ModalHeader"
import PokemonModal from "./PokemonModal"


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    // top: `${top}%`,
    // left: `${left}%`,
    // transform: `translate(-${top}%, -${left}%)`,

  };
}

export default function PokemonCard({ pokemonData }) {

  const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'fixed',
      width: 400,
      backgroundColor: theme.palette.background.paper, // FIGURE OUT HOW TO MAKE IT SAME AS TYPECOLOUR
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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
  const pokemonImg = "https://pokeres.bastionbot.org/images/pokemon/" + id + ".png"

  const [modalStyle] = React.useState(getModalStyle());
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pokemonModal = (
    <div style={{ backgroundColor: { typeColour } }} style={modalStyle} className={classes.modal} >
      <h2 style={{ textAlign: 'center' }} id="simple-modal-title">{kappa(name)}</h2>
      <Header />
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



      <Dialog
        maxWidth={'xl'}
        style={{ backgroundColor: { typeColour }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <PokemonModal
          pokemonData={pokemonData}
          name={kappa(name)}
          typeColour={typeColour}
        >

        </PokemonModal>
      </Dialog>

    </>

  );
}
