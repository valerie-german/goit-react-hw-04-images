import css from './Button.module.css';
import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function Button ({onHandleButton}) {
  // state = {
  //   page: 1,
  // };

const [page, setPage]=useState(1);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.page !== this.state.page) {
  //     onHandleButton(this.state.page);
  //   }
  // }

  useEffect(()=>{onHandleButton(page)},[onHandleButton, page]);

 const pagesIncrease = () => {
  setPage(prevState =>(prevState + 1))
  };

  
    return (
      <button
        type="button"
        className={css.Button}
        onClick={() => {
          pagesIncrease();
        }}
      >
        Load more
      </button>
    );
  }


Button.propTypes = {
  onHandleButton: PropTypes.func.isRequired,
};
