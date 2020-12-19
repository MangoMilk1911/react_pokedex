import React from "react";
import { Box, Grid, Typography, createMuiTheme, TableCell, CardMedia, Table, TableBody, TableRow, Badge, makeStyles, CardActionArea, Paper, Modal, Card, CardContent, Button, Dialog, TableContainer } from "@material-ui/core"
import { typingColours } from "../lib/lib"
import Header from "./ModalHeader"


export default function PokemonModal(props) {
	const { pokemonData, typeColour, name } = props;

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

	const [modalStyle] = React.useState(getModalStyle());

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

	const pokemonStats = pokemonData.stats;
	const stats = []
	const rawStats = pokemonStats.map((s) => {
		stats.push(s);
	})

	function statTotal(rawStats) {
		const reducer = (accumulator, currentValue) => accumulator + currentValue;
		return rawStats.reduce(reducer);
	}

	function createData(stat, value) {
		return { stat, value };
	}

	const rows = [
		createData('HP', pokemonStats[0].base_stat),
		createData('Attack', pokemonStats[1].base_stat),
		createData('Defense', pokemonStats[2].base_stat),
		createData('Sp. Atk', pokemonStats[3].base_stat),
		createData('Sp. Def', pokemonStats[4].base_stat),
		createData('Speed', pokemonStats[5].base_stat),
		createData('Total', statTotal()),
	]



	return (
		<div style={{ backgroundColor: { typeColour } }} style={modalStyle} className={classes.modal} >
			<h2 style={{ textAlign: 'center' }} id="simple-modal-title">{name}</h2>
			<Header />
			<p id="simple-modal-description">
				Drop it like its hot
      </p>
			<TableContainer>
				<Table aria-label="Stats Table">
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.stat}>
								<TableCell component="th" scope="row">
									{row.stat}
								</TableCell>
								<TableCell align="left">{row.value} </TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>


		</div>)
};