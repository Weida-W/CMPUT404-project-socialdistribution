import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginComp from "./components/LoginComp";
import "./App.css";
import TopNav from "./components/TopNav";
import Post from "./components/Post";

export default class App extends React.Component {
  Home = () => {
    return (
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>Welcome To Social Distribution!</h1>
        <LoginComp />
      </div>
    );
  };

  render() {
    return (
      <Router>
        {/* add route */}
        <Route exact path="/" component={this.Home} />
        <Route
          path="/author/:id"
          render={(props) => (
            <div>
              <TopNav />
              <Post />
            </div>
          )}
        />
      </Router>
    );
  }
}
