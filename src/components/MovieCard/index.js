import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { Mutation } from "react-apollo";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Modal from "../Modal";

import { ALL_MOVIES } from "../MoviesList";

import gql from "graphql-tag";
import { actorsDataToActor } from "../../helpers/helper";

export const REMOVE_MOVIE = gql`
  mutation removeMovie($id: ID!) {
    deleteMovie(id: $id) {
      id
    }
  }
`;

export const EDIT_MOVIE = gql`
  mutation editMovie(
    $genre: String!
    $actorsData: [MovieactorsActor!]
    $title: String!
    $id: ID!
  ) {
    updateMovie(genre: $genre, actors: $actorsData, title: $title, id: $id) {
      genre
      actors {
        fullname
      }
      title
    }
  }
`;

const styles = theme => ({
  card: {
    minWidth: 275,
    maxHeigth: 300,
    textAlign: 'left'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  actors: {
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  fab: {
    margin: theme.spacing.unit
  }
});


class MovieCard extends React.Component {
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
    const { title, genre, actors, id, classes } = this.props;
    const { isOpen } = this.state;
    const actorsNames = actorsDataToActor(actors);
    return (
      <Grid item xs='auto'>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {genre}
            </Typography>
            <Typography className={classes.actors} component="p">
              Actors: {actorsNames}
            </Typography>
          </CardContent>
          <CardActions>
            <Fab size="small" aria-label="Edit" onClick={this.openModal} className={classes.fab}>
              <i className="material-icons">edit</i>
            </Fab>
            <Mutation
              mutation={REMOVE_MOVIE}
              variables={{ id }}
              refetchQueries={[{ query: ALL_MOVIES }]}
            >
              {removeMovie => (
                <Fab
                  size="small"
                  onClick={removeMovie}
                  aria-label="Delete"
                  className={classes.margin}
                >
                  <DeleteIcon fontSize="small" />
                </Fab>
              )}
            </Mutation>
          </CardActions>
        </Card>
        <Modal movie={{title, genre, actors: actorsNames, actorsData: actors}} isOpen={isOpen} close={this.closeModal} edit={true} id={id} mutation={EDIT_MOVIE}/>
      </Grid>
    );
  }
}
export default withStyles(styles)(MovieCard);
