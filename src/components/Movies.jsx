import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieService";
import { genres, getGenres } from "../services/fakeGenreService";
import MovieTable from "./MovieTable";
import Pagination from "./common/Pagination";
import SearchBox from "./common/SearchBox";
import { paginate } from "../utils/paginate";
import Genres from "./Genres";
import { Link } from "react-router-dom";

export default class Movies extends Component {
  state = {
    movies: [], // ไปดึงค่ามาจาก ComponentDidMonth เพื่อหาจำนวนหมวด
    genres: [], // ไปดึงค่ามาจาก ComponentDidMonth เพื่อหาจำนวนหมวด
    pageSize: 4, // จำนวน Items per page
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenres: null
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
      searchQuery
    } = this.state;

    let filtered = allmovies
      if (searchQuery)
      filtered = allmovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
      else if (selectedGenres && selectedGenres._id)
      filtered =allmovies.filter(m => genres._id === selectedGenres._id)
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
    this.setState({ selectedGenres: genres,searchQuery:"", currentPage: 1 });
    // console.log(genres);
  };
  handleSearch = query => {
    this.setState({ searchQuery: query,selectedGenres:null,currentPage:1})
  }
  handleSorting = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const count = this.state.movies.length;

    const { TotalCount, data: movies } = this.getPageData();
    const { pageSize, currentPage,searchQuery } = this.state;

    if (count === 0) {
      return <h4>There are no movies</h4>;
    }

    return (
      <div className="row mt-5">
        <div className="col-md-9 order-2">
          <Link to="/movies/new">
            <button className="btn btn-primary mb-5">New Movie</button>
          </Link>
          <h4>Showing {TotalCount} movies in the database.</h4>
          <br />
          <SearchBox value={searchQuery} onChange={this.handleSearch}/>
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
