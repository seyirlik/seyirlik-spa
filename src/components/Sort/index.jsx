import React, { useCallback } from 'react';
import SortPanel from '../SortPanel';
import './sort.css';

function Sort({ showModal }) {
  const showFilterPanel = useCallback(
    (e) => {
      showModal(true);
      e.preventDefault();
    },
    [showModal]
  );

  return (
    <div className="sort">
      <a href="/" className="filter-btn" onClick={showFilterPanel}>
        <svg
          height="1em"
          viewBox="0 0 18 12"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          className="filter-icon"
        >
          <path
            d="M7 12h4v-2H7v2zM0 0v2h18V0H0zm3 7h12V5H3v2z"
            fill="#fff"
            fillRule="evenodd"
          />
        </svg>
        Filtrele
      </a>
      <SortPanel />
      <div className="flex--small tablet-hidden"></div>
    </div>
  );
}

export default Sort;
