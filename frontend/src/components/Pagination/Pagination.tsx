import styles from "./Pagination.module.scss";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";
import { useState, useEffect } from "react";

interface IPagination {
  numberOfPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

function Pagination({ numberOfPages, currentPage, onPageChange }: IPagination) {
  const pageNumeration = Array.from({ length: numberOfPages });
  const [newPage, setNewPage] = useState<number | null>(null);

  useEffect(() => {
    if (newPage !== null) {
      onPageChange(newPage);
      setNewPage(null);
    }
  }, [newPage, onPageChange]);

  const handlePageClick = (pageNumber: number) => {
    setNewPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setNewPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < numberOfPages) {
      setNewPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.shopPagination}>
      <span
        className={`${styles.paginationElement} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={() => handlePrevClick()}
      >
        <BiSolidChevronLeft />
      </span>
      {pageNumeration.map((page, index) => (
        <span
          key={index}
          className={
            currentPage === index + 1
              ? `${styles.paginationElement} ${styles.paginationElementActive}`
              : styles.paginationElement
          }
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </span>
      ))}
      <span
        className={`${styles.paginationElement} ${
          currentPage === numberOfPages ? styles.disabled : ""
        }`}
        onClick={() => handleNextClick()}
      >
        <BiSolidChevronRight />
      </span>
    </div>
  );
}

export default Pagination;
