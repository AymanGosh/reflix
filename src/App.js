import React , {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.css';  
import Landing from './components/Landing'
import Catalog from './components/Catalog'
import MovieDetails from './components/MovieDetails'

class App extends Component{
  constructor(){
    super()
    this.state={
        users : [
          {name: "Josef", img: "https://occ-0-2616-2774.1.nflxso.net/art/bd699/2f5075ef2c57898f34ca627377b4ccfc615bd699.png", budget : 42},
          {name: "Keren", img: "https://occ-0-2616-2774.1.nflxso.net/art/6ecfa/2799a7f10e6481ef52df1800d3ddfc1176d6ecfa.png",budget : 10}
        ],
        movies : [
            { id: 0, isRented: false, title: "Tarzan", year: 1999, img: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", descrShort: "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out." },
            { id: 1, isRented: false, title: "The Lion King", img: "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", year: 1994, descrShort: "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies." },
            { id: 2, isRented: false, title: "Beauty and the Beast", year: 1991, img: "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", descrShort: "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself." },
            { id: 3, isRented: false, title: "The Sword in the Stone", year: 1963, img: "https://is5-ssl.mzstatic.com/image/thumb/Video2/v4/02/1a/11/021a11a6-3e5f-af39-6414-a3f538e8513a/pr_source.lsr/268x0w.png", descrShort: "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means." },
            { id: 4, isRented: false, title: "Beauty and the Beast", year: 2016, img: "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", descrShort: "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation." }
        ],
        budget: undefined,
        userName: undefined
    }
  }

  handleRent = (movieInfo) => {
    let rentalStatus = movieInfo.isRented
    let isRented = !rentalStatus

    let movies = this.state.movies
    movies[movieInfo.id].isRented = isRented
    this.setState({movies}, () => {
      this.saveUserInfo()
    })
  }

  handleBudget = (rentalStatus) => {
    let isRented = !rentalStatus
    
    if (!isRented) {
        this.setState({budget: this.state.budget +3})
    }
    else {
      if (this.state.budget - 3 < 0) { return false} 
      else { this.setState({budget: this.state.budget -3}) }
    }
    return true
  }

  handleRegisteredUser = (userName) => {
    this.setState({userName}, () => {
      localStorage.currentUserName = userName
      console.log("Current user: " + userName)

      this.renderSavedUserInfo()
    })
  }

  restartMoviesInfo = () => {
    let movies = this.state.movies
    for (let m in movies){
      movies[m].isRented= false
    }
    this.setState({movies})
  }

  saveUserInfo = async () => {
    let rentedMovies = []
    let movies = this.state.movies
    await movies.forEach(m => { 
        if (m.isRented){
            rentedMovies.push(m)
        } 
    })

    let UserInfo = { 
      rentedMovies: rentedMovies,
      budget : this.state.budget
    }

    localStorage[this.state.userName] =JSON.stringify(UserInfo)
  }

  handleOldUsersData = (user) => {
    let movies = this.state.movies
    let budget = user.budget

    for (let movie of user.rentedMovies){
        movies[movie.id].isRented = true
    }
    
    this.setState({
      movies: movies,
      budget: budget
    })
  }

  handleNewUsersData = () => {
    let movies = this.state.movies
    let user = this.state.users.filter(u => u.name === this.state.userName)[0]
    let budget = user.budget
    // let budget = 10
    let userInfo= {
      rentedMovies : [],
      budget : budget
    }
    localStorage[this.state.userName] =JSON.stringify(userInfo)

    this.setState({
      movies: movies,
      budget: budget
    })
  }

  renderSavedUserInfo = () => {
    this.restartMoviesInfo()

    let user = JSON.parse(localStorage[this.state.userName] || null)
    if (user && user.rentedMovies.length > 0){ //for old user
      this.handleOldUsersData(user)
    }
    else if ((localStorage.currentUserName !== ("undefined" || undefined) )){ //for new user
      this.handleNewUsersData()
      
    }
    else { //for an unregistered user
      console.log("user doesn't exist")
    }
    
  }

  componentDidMount = () => {
    let userName = localStorage.currentUserName
    this.setState({userName}, () => {
      console.log("Current user: " + userName)
        
      if (userName !== undefined) {
        this.renderSavedUserInfo()
      }
    })
  }

  render(){
    let movies = this.state.movies
    let userInfo = this.state.users.filter( u => u.name === this.state.userName)[0]
    return(
      <Router>

        <div id="header">
          <div id="main-links">
            <Link to="/" className="header-link">Home</Link>
            <Link to="/Catalog" className="header-link"> Catalog </Link>
          </div>
          
          {userInfo !== undefined ?
            <Link to="/" id="user-icon-link">
              <div id="user-icon" style={{backgroundImage: `url(${userInfo.img})` }}></div>
            </Link> 
            : null }
            
          
          <div id="logo">REFLIX</div>
        </div>

        <div id="app-background"></div>

        <Route exact path="/" render={ () =>
          <Landing 
            users={this.state.users}
            userName={this.state.userName}
            handleRegisteredUser={this.handleRegisteredUser}
            signOut={this.signOut}/> } />

        <Route exact path="/Catalog" render={ () =>
          <Catalog 
            movies={movies} 
            userName={this.state.userName}
            budget={this.state.budget}
            handleBudget={this.handleBudget}
            handleRent={this.handleRent}
            key="catalog" />} />

        <Route exact path="/movie/:id" render={ ({match}) => 
          <MovieDetails match={match} movies={movies} key="catalog"/>} />

      </Router>

    )
  }

}

export default App;
