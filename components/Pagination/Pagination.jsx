import React from "react";
import styles from "./styles.module.css";

export const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className={styles.pagination}>
      <button 
        onClick={onPrevPage} 
        disabled={currentPage <= 1}
        className={styles.button}
      >
        Previous
      </button>
      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button 
        onClick={onNextPage} 
        disabled={currentPage >= totalPages}
        className={styles.button}
      >
        Next
      </button>
    </div>
  );
};