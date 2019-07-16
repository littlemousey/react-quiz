import React, { Component } from "react";
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

const mapStateToProps = state => ({
  quizType: state.quizType,
  playerName: state.namePlayer
});

const mapDispatchToProps = dispatch => ({
  setQuizType: quizType => dispatch(ACTIONS.setName(quizType))
});

class GameConfig extends Component {
  state = { quizType: "" };

  handleClick = type => {
    this.setState({ quizType: type });
    this.setQuizType(this.state.quizType);
  };

  render() {
    return (
      <div>
        <h2>Quiz time {this.props.playerName}!</h2>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleClick("challenge")}
          >
            Challenge mode
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.handleClick("category")}
          >
            Category
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleClick("endless")}
          >
            Endless trivia
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameConfig);
