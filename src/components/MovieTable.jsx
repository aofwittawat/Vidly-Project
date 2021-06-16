import React, { Component } from "react";
import Like from "./common/Like";
import Table from "./common/Table";
import {Link} from 'react-router-dom'

export default class MovieTable extends Component {
  columns = [
    { path: "title", label: "Title", content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>  },
    { path: "genre.name", label: "Genres" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rental Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "deleteButton",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}
