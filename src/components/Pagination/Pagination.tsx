import React from 'react';

import styles from './Pagination.module.css';

type Props = {
  pages: number;
  selectedPage: number;
  onChange: (page: number) => void;
};

export default function Pagination({ pages, selectedPage, onChange }: Props) {
  let pagesList: Array<number | string>;

  if (pages < 8) {
    pagesList = Array.from({ length: pages }, (_, index) => index + 1);
  } else if (selectedPage - 5 >= 0 && selectedPage + 5 <= pages) {
    pagesList = [
      1,
      '...',
      selectedPage - 1,
      selectedPage,
      selectedPage + 1,
      '...',
      pages,
    ];
    // 1,...,x-1,x,x+1,...,n
  } else if (selectedPage - 5 < 0) {
    pagesList = [1, 2, 3, 4, 5, '...', pages];
    // [1,2,3,4,5,6, ..., n]
  } else {
    pagesList = [1, '...', pages - 4, pages - 3, pages - 2, pages - 1, pages];
  }

  return (
    <div className={styles['pagination-container']}>
      <button
        type="button"
        className={`${styles['dir-btn']} ${
          selectedPage === 1 ? styles.disabled : ''
        }`}
        disabled={selectedPage === 1}
        onClick={() => {
          if (selectedPage !== 1) onChange(selectedPage - 1);
        }}
      >
        &lt;
      </button>
      {pagesList.map((page, index) =>
        typeof page === 'number' ? (
          <button
            type="button"
            key={index}
            className={`${styles['page-btn']} ${
              page === selectedPage ? styles.selected : ''
            }`}
            onClick={() => {
              if (selectedPage !== page) onChange(page);
            }}
          >
            {page}
          </button>
        ) : (
          <button
            type="button"
            disabled
            key={index}
            className={`${styles['page-btn']} ${styles.disabled}`}
          >
            {page}
          </button>
        )
      )}
      <button
        type="button"
        className={`${styles['dir-btn']} ${
          selectedPage === pages ? styles.disabled : ''
        }`}
        onClick={() => {
          if (selectedPage !== pages) onChange(selectedPage + 1);
        }}
        disabled={selectedPage === pages}
      >
        &gt;
      </button>
    </div>
  );
}
