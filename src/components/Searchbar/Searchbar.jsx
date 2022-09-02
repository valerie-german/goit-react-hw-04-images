import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export function Searchbar ({notify,onSubmitProp}) {
  
const [input, setInput]=useState('');

const inputHandle = event => {
    event.preventDefault();
    setInput(event.currentTarget.value.toLowerCase());
  };

const submitHandle = event => {
    event.preventDefault();
    if (input.trim() === '') {
      notify();
      return;
    }
    
    onSubmitProp(input);
    // reset();
    setInput('');
  };

  // const reset = () => {
  //   setInput('');
  // };

  
    return (
      <header className={css.Searchbar}>
        <form onSubmit={submitHandle} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={inputHandle}
          />
        </form>
      </header>
    );
  }


Searchbar.propTypes = {
  onSubmitProp: PropTypes.func.isRequired,
  notify: PropTypes.func,
};
