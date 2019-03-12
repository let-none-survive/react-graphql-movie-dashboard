import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";

import { ALL_MOVIES } from "../MoviesList";

import { withStyles } from "@material-ui/core/styles";
import { Mutation } from "react-apollo";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  }
});

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

const initialState = {
  title: "",
  genre: "",
  actors: "",
  actorsdata: []
};

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleInputChange(input, e) {
    let value = e.target.value;
    if (input === "actors") {
      let actorsData = value.split(", ").map(item => ({
        fullname: item
      }));


      this.setState({
        ...this.state,
        [input]: value,
        actorsData
      });

      return;
    }

    this.setState({
      ...this.state,
      [input]: value
    });
  }

  componentDidMount() {
    if (this.props.movie) {
      this.setState({
        ...this.state,
        ...this.props.movie
      });
    }
  }


  render() {
    const {
      isOpen,
      close,
      classes,
      edit = false,
      mutation,
      id,
      movie = {} 
    } = this.props;

    const { genre, actors, title, actorsData} = this.state;


    return (
      <Dialog
        onClose={close}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={close}>
          {edit ? "Movie editor" : "Add new movie"}
        </DialogTitle>
        <DialogContent>
          <form className={classes.container} autoComplete="off">
            <TextField
              id="outlined-with-placeholder"
              label="Title"
              placeholder="Type a title..."
              className={classes.textField}
              margin="normal"
              required
              value={title}
              onChange={this.handleInputChange.bind(this, "title")}
            />

            <TextField
              id="outlined-with-placeholder"
              label="Genre"
              placeholder="Type a genre..."
              className={classes.textField}
              margin="normal"
              required
              value={genre}
              onChange={this.handleInputChange.bind(this, "genre")}
            />

            <TextField
              id="outlined-with-placeholder"
              label="Actors"
              placeholder="John Smith..."
              className={classes.textField}
              margin="normal"
              helperText="Separated by comma*"
              required
              value={actors}
              onChange={this.handleInputChange.bind(this, "actors")}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Mutation
            mutation={mutation}
            variables={{ genre, actorsData, title, id }}
            refetchQueries={[{ query: ALL_MOVIES }]}
          >
            {mutationFunc => (
              <Button
                onClick={() => {
                  mutationFunc().then(() => {
                    if (!edit) this.setState(initialState)
                    close();
                  }).catch(e => {
                    close();
                  });
                }}
                color="primary"
              >
                {edit ? "save" : "Add movie"}
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Modal);
