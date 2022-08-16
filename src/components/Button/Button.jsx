import css from './Button.module.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Button extends Component {
  state = {
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.props.onHandleButton(this.state.page);
    }
  }

  pagesIncrease = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    return (
      <button
        type="button"
        className={css.Button}
        onClick={() => {
          this.pagesIncrease();
        }}
      >
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onHandleButton: PropTypes.func.isRequired,
};
