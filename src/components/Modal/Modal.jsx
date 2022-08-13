import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    // const { children } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          {/* {children} */}
          <img src="" alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func,
};

<div class="overlay">
  <div class="modal">
    <img src="" alt="" />
  </div>
</div>;
