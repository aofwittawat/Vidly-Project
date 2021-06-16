/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash";
import PropsTypes from 'prop-types'

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
//   console.log(currentPage);
  const pageCount = Math.ceil(itemsCount / pageSize);
//   console.log(pageCount);
  // console.log(itemsCount,pageSize,pageCount);
  if (pageCount === 1) {
    return null;
  }
//   สร้างจำนวนหน้า โดยทำเป็น array >> [1,2,3,...] ที่ +1 เพื่อจะได้รวม end ด้วย ไม่งั้นจะได้ array ที่ไม่รวม end
  const pages = _.range(1, pageCount + 1);
//   console.log(pages);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className={ page === currentPage ? "page-item active" : "page-item"}>
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propsTypes = {
    itemsCount: PropsTypes.number.isRequired, 
    pageSize:  PropsTypes.number.isRequired, 
    onPageChange:  PropsTypes.func.isRequired, 
    currentPage:  PropsTypes.number.isRequired
}

export default Pagination;
