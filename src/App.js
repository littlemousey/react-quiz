import React, { Component } from "react";
import "./App.css";
import Quiz from "./pages/quiz";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <div className="App">
          <Quiz />
        </div>
      </ReduxProvider>
    );
  }
}

export default App;
