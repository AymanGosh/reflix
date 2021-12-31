import React, { Component } from 'react';
import '../styles/catalog.css'
import SearchBar from './SearchBar'
import Movie from './Movie'
import Budget from './Budget'

class Catalog extends Component {
    constructor(){
        super()
        this.state={
            searchFilter : [],
            showBudgetMessage : false,
            showNoRentalMessage :false
        }
    }

    handleSearch = (inputVal) => {
        let searchFilter = this.props.movies.filter(s => 
            s.title.toLowerCase().includes(inputVal.toLowerCase())
        )
        this.setState({searchFilter})
    }

    showBudgetMessage = () => {
        this.setState({showBudgetMessage : true})
        setTimeout( () => {
            this.setState({showBudgetMessage : false})
        },2000)
    }

    showNoRentalMessage = () => {
        this.setState({showNoRentalMessage : true})
        setTimeout( () => {
            this.setState({showNoRentalMessage : false})
        },3000)
    }

    componentDidMount = async () => {
        this.setState({
            searchFilter : this.props.movies,
        })
    }

    render() {
        let movies = this.state.searchFilter 
        
        let rentedMovies = []
        movies.forEach(m => { 
            if (m.isRented){
                rentedMovies.push(m)
            } 
        })

        return (
            <div id="catalog-page">
                <SearchBar handleSearch={this.handleSearch}/>
                
                {this.state.showNoRentalMessage ? <div id="no-rental-message"> The rentl feature is availabele for registered users only </div> : null}

                {rentedMovies.length !== 0 ?
                    <Budget budget={this.props.budget} key={this.props.userName}/> : <></>}

                {rentedMovies.length !== 0 ?
                    <div className="movies-container" id="rented-container">
                        <div className="box-label">Rented</div>
                        {this.state.showBudgetMessage ? <div id="budget-message">There are insufficient funds</div> : <></>}
                        <div className="movies-box" >
                            {rentedMovies.map(r => 
                                <Movie 
                                    movieInfo={r} 
                                    handleRent={this.props.handleRent}
                                    boxType="rented" 
                                    key={r.title}/> 
                            )}
                        </div>  
                    </div>
                    : <></> }
                
                <div className="movies-container" id="catalog-container" >
                    <div className="box-label">Catalog</div>
                    <div className="movies-box">
                        {movies.map(m => 
                            <Movie 
                                movieInfo={m} 
                                userName ={this.props.userName}
                                handleRent={this.props.handleRent} 
                                boxType="catalog" 
                                handleBudget={this.props.handleBudget}
                                showBudgetMessage={this.showBudgetMessage}
                                showNoRentalMessage={this.showNoRentalMessage}
                                key={m.id}/>)}
                    </div>
                </div>

            </div>
        )
    }
}

export default Catalog;