// @flow
import React from "react";
import "./styles.scss";

export const Pagination = () => {
  return (
    <ul className="pagination">
      <li className="pagination__item ">1</li>
      <li className="pagination__item">2</li>
      <li className="pagination__item active">33</li>
      <li className="pagination__item">Дальше</li>
    </ul>
  );
};

export default Pagination;
