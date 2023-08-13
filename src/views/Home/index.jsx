import { useEffect, useRef, useState, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import Navbar from '../../components/Navbar';
import Events from '../../components/Events';
import useEventsResults from '../../state/events-results';
import styles from './Home.module.css'

const Home = () => {
  const { data, isLoading, error, fetchEvents } = useEventsResults();
  
  const events = data?._embedded?.events || [];
  const page = data?.page || {};

  const [searchValue, setSearchValue] = useState('');
  const containerRef = useRef();

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleNavbarSearch = (val) => {
    setSearchValue(val);
    fetchEvents(`&keyword=${val}`);
  };

  const handlePageClick = useCallback(({selected}) => {
    fetchEvents(`&keyword=${searchValue}&page=${selected}`);
  }, [searchValue, fetchEvents]);

  const renderEvents = () => {
    if (isLoading) {
      return <div>Cargando resultados...</div>;
    }
    if (error) {
      return <div>Ha ocurrido un error</div>;
    }
    return (
      <div>
        <Events searchValue={searchValue} events={events} />
        <ReactPaginate
          className={styles.pagination}
          nextClassName={styles.next}
          previousClassName={styles.previous}
          pageClassName={styles.page}
          activeClassName={styles.activePage}
          disabledClassName={styles.disablePage}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={page.totalPages}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    )
  };

  return (
    <>
      <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
      {renderEvents()}
    </>
  )
};

export default Home;