// @flow
import React from 'react';
import './styles.scss';

export const Pagination = () => {
  return (
    <ul className="pagination">
      <li className="pagination__item prev">В начало</li>
      <li className="pagination__item ">1</li>
      <li className="pagination__item">2</li>
      <li className="pagination__item active">3</li>
      <li className="pagination__item">4</li>
      <li className="pagination__item">5</li>
      <li className="pagination__item next">Дальше</li>
    </ul>
  )
};

export default Pagination;
