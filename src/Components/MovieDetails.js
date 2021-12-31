import React, { Component } from 'react';
import '../styles/movieDetails.css'

class MovieDetails extends Component {
    render() {
        let movieInfo = this.props.movies[this.props.match.params.id]
        return (
            <div id="movie-details">
                <div className="title" >{movieInfo.title} ({movieInfo.year})</div>
                <img src={movieInfo.img} alt=""></img>
                <div className="info">{movieInfo.descrShort}</div>
            </div>
        )
    }
}

export default MovieDetails;