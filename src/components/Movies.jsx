import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./MovieTable";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import Genres from "./Genres";

export default class Movies extends Component {
  state = {
    movies: [], // ไปดึงค่ามาจาก ComponentDidMonth เพื่อหาจำนวนหมวด
    genres: [], // ไปดึงค่ามาจาก ComponentDidMonth เพื่อหาจำนวนหมวด
    pageSize: 4, // จำนวน Items per page
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };
  // use for Hook API to state
  componentDidMount() {
    const genres = [{ name: "All movies" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
    // console.log(genres);
  }

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      movies: allmovies,
      selectedGenres,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenres && selectedGenres._id
        ? allmovies.filter((m) => m.genre._id === selectedGenres._id)
        : allmovies;
    const sort = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sort, currentPage, pageSize);

    return { TotalCount: filtered.length, data: movies };
  };

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
    this.setState({ selectedGenres: genres, currentPage: 1 });
    // console.log(genres);
  };
  handleSorting = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const count = this.state.movies.length;

    const { TotalCount, data: movies } = this.getPageData();
    const { pageSize, currentPage } = this.state;

    if (count === 0) {
      return <h4>There are no movies</h4>;
    }

    return (
      <div className="row mt-5">
        <div className="col-md-9 order-2">
          <h4>Showing {TotalCount} movies in the database.</h4>
          <br />
          <MovieTable
            movies={movies}
            onLike={this.handleLikeButton}
            onDelete={this.handleDelete}
            onSort={this.handleSorting}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            itemsCount={TotalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div className="col-md-3 order-1">
          <Genres
            items={this.state.genres}
            onSelectedGenres={this.handleSelectedGenres}
            selectedGenres={this.state.selectedGenres}
          />
        </div>
      </div>
    );
  }
}
