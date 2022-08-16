import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  inputHandle = event => {
    event.preventDefault();

    this.setState({
      input: event.currentTarget.value.toLowerCase(),
    });
  };

  submitHandle = event => {
    event.preventDefault();
    if (this.state.input.trim() === '') {
      this.props.notify();
      return;
    }
    this.props.onSubmitProp(this.state.input);
    this.reset();
  };

  reset = () => {
    this.setState({
      input: '',
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.submitHandle} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.inputHandle}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmitProp: PropTypes.func.isRequired,
  notify: PropTypes.func,
};
