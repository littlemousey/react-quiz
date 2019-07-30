import React, { Component } from "react";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const mapStateToProps = state => ({
  namePlayer: state.namePlayer
});

const mapDispatchToProps = dispatch => ({
  setName: name => dispatch(ACTIONS.setName(name))
});

class Results extends Component {
  render() {
    return (
      <div>
        <Typography variant="h3" component="h2">
          Hi {this.props.namePlayer}!
        </Typography>
        <Typography variant="h3" component="h2">
          Here are your results
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.props.history.push("/options");
          }}
        >
          Restart game
        </Button>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Results)
);
