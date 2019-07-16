import React, { Component } from "react";
import "./App.css";
import Quiz from "./pages/quiz";
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
            <nav>
              <div>
                <span>
                  <Link to="/">Home</Link> |
                </span>
                <span>
                  <Link to="/quiz/">Quiz</Link>
                </span>
              </div>
            </nav>

            <Route exact path="/" component={Intro} />
            <Route path="/options" component={gameConfig} />
            <Route path="/quiz" component={Quiz} />
          </Router>
        </ReduxProvider>
      </div>
    );
  }
}

export default App;
