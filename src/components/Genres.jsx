import React from "react";

const Genres = (props) => {
  const { items, textProperty, valueProperty, onSelectedGenres, selectedGenres } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty] || item[textProperty]}
          className={ item === selectedGenres ? "list-group-item active" : "list-group-item"}
          onClick={() => onSelectedGenres(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
// การทำ Default จะได้ง่ายต่อการจัดการ โดยไม่ต้องไปยุ่งกับ code ด้านบน ในกรณี ที่ API เราเปลี่ยนชื่อ property
Genres.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default Genres;
