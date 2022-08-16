import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    showModal: false,
    input: '',
    imagesArray: null,
    page: 1,
    activeObj: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = inputValue => {
    this.setState({
      input: inputValue,
      page: 1,
    });
  };

  handleImagesArray = array => {
    if (array.length > 0) {
      this.setState({ imagesArray: array });
    } else {
      this.setState({ imagesArray: null });
    }
  };

  handleActiveObj = obj => {
    this.setState({ activeObj: obj });
    this.toggleModal();
  };

  handleButton = page => {
    this.setState({
      page: page,
    });
  };

  executeScroll = () => document.querySelector(`#toScroll`).scrollIntoView();

  render() {
    const { showModal, input, imagesArray, activeObj, page } = this.state;
    const notify = () => toast.info('What are you searching for?');
    const errorMessage = () => toast.error('Oops... we didn`t find anything');

    return (
      <div className={css.App}>
        <Searchbar onSubmitProp={this.handleFormSubmit} notify={notify} />
        <ImageGallery
          inputValue={input}
          page={page}
          onHandleImagesArray={this.handleImagesArray}
          onHandleActiveObj={this.handleActiveObj}
          errorMessage={errorMessage}
        />
        {imagesArray && <Button onHandleButton={this.handleButton} />}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {showModal && (
          <Modal onClose={this.toggleModal} activeObj={activeObj}></Modal>
        )}
      </div>
    );
  }
}
