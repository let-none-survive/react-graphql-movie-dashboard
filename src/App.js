// React
import React from "react";
// Graphql
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//Material UI
import { withStyles } from "@material-ui/core/styles";

// Components
import MoviesList from "./components/MoviesList";
import Header from './components/Header';


const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjt2za2zj2u0w0175wlhamwa6"
});

const styles = {
  root: {
    flexGrow: 1,
  },
};

const App = props => {
  const { classes } = props;
  return (
    <ApolloProvider client={client}>
      <div className={classes.root}>
        <Header />
        <MoviesList />
      </div>
    </ApolloProvider>
  );
};

export default withStyles(styles)(App);
