import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

import css from './App.module.css';

export class App extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <div className={css.App}>
        <Searchbar />
        <ImageGallery />
        <Button />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <p>Modal</p>
          </Modal>
        )}
      </div>
    );
  }
}
