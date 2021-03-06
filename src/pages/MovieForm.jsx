import React from "react";
import Form from "../components/common/Form";
import Joi from "joi-browser";
import {getMovie, saveMovie} from '../services/fakeMovieService'
import {getGenres} from '../services/fakeGenreService'

export default class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres:[],
    errors: {},
  };

  schema = {
    _id:Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().integer().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().precision(1).min(0).max(10).label("Daily Rental Rate"),
  };

  componentDidMount(){
      //เก็บหมวด จากค่าว่าง
      const genres = getGenres()
      this.setState({ genres })
    // console.log(genres);
    // หา movie
    const movieId = this.props.match.params.id
    if(movieId === "new") return
    console.log(this.props);

    const movie = getMovie(movieId)
    if(!movie) return this.props.history.replace("/not-found")

    this.setState({data: this.mapToviewModel(movie)})
  }

  mapToviewModel(movie){
      return {
          _id:movie._id,
          title:movie.title,
          genreId: movie.genre._id,
          numberInStock:movie.numberInStock,
          dailyRentalRate:movie.dailyRentalRate
      }
  }

  doSubmit = () => {
      saveMovie(this.state.data)
      this.props.history.push("/movies")
  }


  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId","Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}
