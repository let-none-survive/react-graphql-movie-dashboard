import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import MovieCard from "../MovieCard/index";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export const ALL_MOVIES = gql`
  {
    allMovies {
      id
      title
      genre

      actors {
        id
        fullname
      }
    }
  }
`;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    margin: theme.spacing.unit,
    width: '100% !important',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('md')]: {
      display: 'inline',
    }
  },
  noContent: {
    fontSize: 22,
    color: '#b3abab',
    textAlign: 'center'
  }
});


const MoviesList = props => {
  const { classes } = props;
  return (
    <Query query={ALL_MOVIES}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        
        if (data.allMovies.length === 0) return <p className={classes.noContent}>There is no movies</p>
        return (
          <Grid className={classes.grid} container spacing={8}>
            {data.allMovies.map((item, i) => <MovieCard key={i} {...item} />)}
          </Grid>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(MoviesList);
