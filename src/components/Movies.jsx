import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/Like";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import Genres from "./Genres";

export default class Movies extends Component {
  state = {
    movies: [], // ไปดึงค่ามาจาก ComponentDidMonth เพื่อหาจำนวนหมวด
    genres: [], // ไปดึงค่ามาจาก ComponentDidMonth เพื่อหาจำนวนหมวด
    pageSize: 4,
    currentPage: 1,
  };
  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLikeButton = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
    // console.log(movies);
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSelectedGenres = (genres) => {
    this.setState({selectedGenres: genres})
  };

  render() {
    const count = this.state.movies.length;
    const { pageSize, currentPage, movies: allmovies, selectedGenres } = this.state;
    console.log(selectedGenres, allmovies);

    const filtered = selectedGenres ? allmovies.filter(m => m.genre._id === selectedGenres._id) : allmovies
    const movies = paginate(filtered, currentPage, pageSize);

    if (count === 0) {
      return <h4>There are no movies</h4>;
    }

    return (
      <div className="row mt-5">
        <div className="col-md-9 order-2">
          <h4>Showing {filtered.length} movies in the database.</h4>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th className="text-center">In Stock</th>
                <th className="text-center">Rental Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td className="text-center">{movie.numberInStock}</td>
                  <td className="text-center">{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onLike={() => this.handleLikeButton(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div className="col-md-3 order-1">
          <Genres
            items={this.state.genres}
            onSelectedGenres={this.handleSelectedGenres}
            selectedGenres ={this.state.selectedGenres}
          />
        </div>
      </div>
    );
  }
}
