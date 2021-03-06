import React from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import Nav from "./components/Nav";
import store from "./components/redux/redux-store";
import UsersContainer from "./components/users/UsersContainer";
import MessagesContainer from "./components/messages/MessagesContainer";
import { Route } from "react-router-dom";
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/HeaderContainer";
import LoginPage from "./components/login/Login";
import { connect } from "react-redux";
import { initializeApp } from "./components/redux/app-reducer";
import { compose } from "redux";
import Preloader from "./components/Preloader.js/Preloader";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialize) {
      return <Preloader />;
    }
    return (
      <div className="app__wrapper">
        <HeaderContainer />
        <Nav />
        <div className="app__main">
          <Route path="/messages" render={() => <MessagesContainer />} />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/login" render={() => <LoginPage />} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  initialize: state.app.initialize
});
const AppWithRouter = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

export const AppContainer = props => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppWithRouter />
      </Provider>
    </BrowserRouter>
  );
};
