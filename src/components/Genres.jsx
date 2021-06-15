import React from "react";

const Genres = (props) => {
  const { items, textProperty, valueProperty, onSelectedGenres, selectedGenres } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={ item === selectedGenres ? "list-group-item active" : "list-group-item"}
          onClick={() => onSelectedGenres(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
Genres.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default Genres;
