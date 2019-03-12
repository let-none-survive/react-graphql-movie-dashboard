import React from "react";

import Modal from '../Modal';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import gql from "graphql-tag";

import { withStyles } from "@material-ui/core/styles";

export const ADD_MOVIE = gql`
  mutation addMovie(
    $genre: String!
    $actorsData: [MovieactorsActor!]
    $title: String!
  ) {
    createMovie(genre: $genre, actors: $actorsData, title: $title) {
      genre
      actors {
        fullname
      }
      title
    }
  }
`;


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  text: {
    fontSize: 14,
    marginRight: theme.spacing.unit
  },
  movies: {
    position: 'relative',
    top: theme.spacing.unit
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      isOpen: false
    };
  }

  openModal() {
    this.setState({
      ...this.state,
      isOpen: true
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      isOpen: false
    });
  }

  render() {
    const { classes } = this.props;
    const { isOpen } = this.state;
    
    return (
      <AppBar className={classes.root} position="static" color="default">
        <Toolbar>
          <Grid container spacing={24} justify="space-between">
            <Grid item>
              <Typography className={classes.movies} variant="h6" color="inherit">
                Movies
              </Typography>
            </Grid>
            <Grid item>
              <Fab
                variant="extended"
                size="small"
                color="default"
                aria-label="Add"
                onClick={this.openModal}
                className={classes.margin}
              >
                <AddIcon className={classes.extendedIcon} />
                <span className={classes.text}>Add</span>
              </Fab>
            </Grid>
          </Grid>
          <Modal isOpen={isOpen} close={this.closeModal} mutation={ADD_MOVIE}/>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
