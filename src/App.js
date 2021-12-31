import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Catalog from "./components/Catalog";
import MovieDetails from "./components/MovieDetails";
import dataUsers from "./data/dataUsers.js";
import dataMovies from "./data/dataMovies.js";
class App extends Component {
  constructor() {
    super();
    this.state = {
      users: dataUsers,
      movies: dataMovies,
      budget: undefined,
      userName: undefined,
    };
  }

  handleRent = (movieInfo) => {
    let rentalStatus = movieInfo.isRented;
    let isRented = !rentalStatus;

    let movies = this.state.movies;
    movies[movieInfo.id].isRented = isRented;
    this.setState({ movies }, () => {
      this.saveUserInfo();
    });
  };

  handleBudget = (rentalStatus) => {
    let isRented = !rentalStatus;

    if (!isRented) {
      this.setState({ budget: this.state.budget + 3 });
    } else {
      if (this.state.budget - 3 < 0) {
        return false;
      } else {
        this.setState({ budget: this.state.budget - 3 });
      }
    }
    return true;
  };

  handleRegisteredUser = (userName) => {
    this.setState({ userName }, () => {
      localStorage.currentUserName = userName;
      console.log("Current user: " + userName);

      this.renderSavedUserInfo();
    });
  };

  restartMoviesInfo = () => {
    let movies = this.state.movies;
    for (let m in movies) {
      movies[m].isRented = false;
    }
    this.setState({ movies });
  };

  saveUserInfo = async () => {
    let rentedMovies = [];
    let movies = this.state.movies;
    await movies.forEach((m) => {
      if (m.isRented) {
        rentedMovies.push(m);
      }
    });

    let UserInfo = {
      rentedMovies: rentedMovies,
      budget: this.state.budget,
    };

    localStorage[this.state.userName] = JSON.stringify(UserInfo);
  };

  handleOldUsersData = (user) => {
    let movies = this.state.movies;
    let budget = user.budget;

    for (let movie of user.rentedMovies) {
      movies[movie.id].isRented = true;
    }

    this.setState({
      movies: movies,
      budget: budget,
    });
  };

  handleNewUsersData = () => {
    let movies = this.state.movies;
    let user = this.state.users.filter(
      (u) => u.name === this.state.userName
    )[0];
    let budget = user.budget;
    // let budget = 10
    let userInfo = {
      rentedMovies: [],
      budget: budget,
    };
    localStorage[this.state.userName] = JSON.stringify(userInfo);

    this.setState({
      movies: movies,
      budget: budget,
    });
  };

  renderSavedUserInfo = () => {
    this.restartMoviesInfo();

    let user = JSON.parse(localStorage[this.state.userName] || null);
    if (user && user.rentedMovies.length > 0) {
      //for old user
      this.handleOldUsersData(user);
    } else if (localStorage.currentUserName !== ("undefined" || undefined)) {
      //for new user
      this.handleNewUsersData();
    } else {
      //for an unregistered user
      console.log("user doesn't exist");
    }
  };

  componentDidMount = () => {
    let userName = localStorage.currentUserName;
    this.setState({ userName }, () => {
      console.log("Current user: " + userName);

      if (userName !== undefined) {
        this.renderSavedUserInfo();
      }
    });
  };

  render() {
    let movies = this.state.movies;
    let userInfo = this.state.users.filter(
      (u) => u.name === this.state.userName
    )[0];
    return (
      <Router>
        <div id="header">
          <div id="main-links">
            <Link to="/" className="header-link">
              Home
            </Link>
            <Link to="/Catalog" className="header-link">
              {" "}
              Catalog{" "}
            </Link>
          </div>

          {userInfo !== undefined ? (
            <Link to="/" id="user-icon-link">
              <div
                id="user-icon"
                style={{ backgroundImage: `url(${userInfo.img})` }}
              ></div>
            </Link>
          ) : null}

          <div id="logo">REFLIX</div>
        </div>

        <div id="app-background"></div>

        <Route
          exact
          path="/"
          render={() => (
            <Landing
              users={this.state.users}
              userName={this.state.userName}
              handleRegisteredUser={this.handleRegisteredUser}
              signOut={this.signOut}
            />
          )}
        />

        <Route
          exact
          path="/Catalog"
          render={() => (
            <Catalog
              movies={movies}
              userName={this.state.userName}
              budget={this.state.budget}
              handleBudget={this.handleBudget}
              handleRent={this.handleRent}
              key="catalog"
            />
          )}
        />

        <Route
          exact
          path="/movie/:id"
          render={({ match }) => (
            <MovieDetails match={match} movies={movies} key="catalog" />
          )}
        />
      </Router>
    );
  }
}

export default App;
