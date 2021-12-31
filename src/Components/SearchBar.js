import React, { Component } from 'react';
import '../styles/searchBar.css'

class SearchBar extends Component {
    constructor(){
        super()
        this.state = {
            inputVal : ""
        }
    }

    handleSearch = (e) => {
        this.setState({inputVal : e.target.value}, () => {
            this.props.handleSearch(this.state.inputVal)
        })
    }

    render() {
        return (
            <input className="search-input" type="text" value={this.state.inputVal}  onChange={this.handleSearch} placeholder="Search"/>
        );
    }
}

export default SearchBar;