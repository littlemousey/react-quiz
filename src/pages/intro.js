import React, { Component } from "react";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setName: name => dispatch(ACTIONS.setName(name))
});

class Intro extends Component {
  state = { name: "" };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleClick = () => {
    this.props.setName(this.state.name);
    // this.setState({ nextPage: true });
    this.props.history.push("/options");
  };

  render() {
    console.log("router: ", this.props.history);
    return (
      <div>
        <h2>Quiz time!</h2>
        <label>
          What is your name?
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClick}
          >
            Go
          </Button>
        </div>
        {/* {this.state.nextPage && <Redirect to="/options" />} */}
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Intro)
);
