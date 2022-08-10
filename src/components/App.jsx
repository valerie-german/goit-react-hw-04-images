import React, { Component } from 'react';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    showModal: true,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <div>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <p>Modal</p>
          </Modal>
        )}
      </div>
    );
  }
}
