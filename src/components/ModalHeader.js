import React from "react"
import {
	AppBar,
	Toolbar,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Container,
	makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
	navbarDisplayFlex: {
		display: `flex`,
		justifyContent: `space-between`
	},
	navDisplayFlex: {
		display: `flex`,
		justifyContent: `space-between`
	},
	linkText: {
		textDecoration: `none`,
		textTransform: `uppercase`,
		color: `white`
	}
})

const navLinks = [
	{ title: `info`, path: `info` },
	{ title: `base stats`, path: `base stats` },
	{ title: `evolution chart`, path: `evolution chart` },
	{ title: `moves`, path: `moves` },
];

const Header = () => {
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Toolbar>
				<Container maxWidth="md" className={classes.navbarDisplayFlex}>
					<List
						component="nav"
						aria-labelledby="main navigation"
						className={classes.navDisplayFlex}>
						{navLinks.map(({ title, path }) => (
							<ListItem button>
								<ListItemText primary={title} />
							</ListItem>
						))}

					</List>
				</Container>
			</Toolbar>
		</AppBar>
	)
}

export default Header;