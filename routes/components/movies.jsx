import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService';
import Like from './like'

class Movies extends Component {
    state = {
        movies: getMovies()
    }

    handleMovieDelete = (id) => {
        const movies = this.state.movies.filter(m => m._id !== id);
        this.setState({movies});
    }

    handleLike = id => {
        var movies = this.state.movies;
        const movie = movies.find(m => m._id === id);
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }
    
    render() {
        const length = this.state.movies.length;
        if (length === 0) return <p>There are no movies in the Database. </p>
        return <div><p>showing {length} movies in the Database</p><table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>stock</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.movies.map(movie => <tr key={movie._id}><td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><Like liked={movie.liked} onClick={() => this.handleLike(movie._id)}/></td>
                    <td><button className="button btn btn-danger btn-sm" onClick={() => this.handleMovieDelete(movie._id)}>Delete</button></td>
                    </tr>)
                }
            </tbody>
        </table></div>
        }
}

export default Movies;