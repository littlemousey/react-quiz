import React, { Component } from "react";
import "./App.css";
import Quiz from "./pages/quiz";
import Results from "./pages/results";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import configureStore from "./modules/store";
import Intro from "./pages/intro";
import gameConfig from "./pages/gameConfig";
import "typeface-roboto";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReduxProvider store={reduxStore}>
          <Router>
            <Route exact path="/" component={Intro} />
            <Route path="/options" component={gameConfig} />
            <Route path="/quiz" component={Quiz} />
            <Route path="/results" component={Results} />
          </Router>
        </ReduxProvider>
      </div>
    );
  }
}

export default App;
