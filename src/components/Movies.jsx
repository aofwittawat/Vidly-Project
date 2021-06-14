import React, { Component } from 'react'
import {getMovies} from '../services/fakeMovieService'

export default class Movies extends Component {

    state ={
        movies: getMovies()
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({movies})
    }


    render() {

        const count = this.state.movies.length

        if (count === 0 ) {return <h4>There are no movies</h4>}

        return (
            <>
            <h4>There are {count} in your labraries</h4>
            <br />
            <table className="table">
               <thead>
                   <tr>
                       <th>Title</th>
                       <th>Genre</th>
                       <th>In Stock</th>
                       <th>Rental Rate</th>
                       <th></th>
                   </tr>
               </thead>
               <tbody>
                   {this.state.movies.map(movie => 
                   <tr key={movie._id}>
                       <td>{movie.title}</td>
                       <td>{movie.genre.name}</td>
                       <td>{movie.numberInStock}</td>
                       <td>{movie.dailyRentalRate}</td>
                       <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                   </tr>
                   )}  
               </tbody>
           </table>
            </>
           
        )
    }
}
