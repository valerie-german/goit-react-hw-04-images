import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

//const KEY = '28152174-c362e84e874961aded494c5b6';

export class App extends Component {
  state = {
    showModal: false,
    input: '',
    imagesArray: null,
    loading: false,
    page: 1,
    activeIndex: null,
  };

  //componentDidMount() {
  // this.setState({
  //   loading: true,
  //  });

  // fetch(
  //    `https://pixabay.com/api/?q=cat&page=1&key=${this.state.KEY}&image_type=photo&orientation=horizontal&per_page=12`
  //   )
  //     .then(response => response.json())
  //    .then(images => {
  //     this.setState({ imagesArray: images });
  //    })
  //    .finally(() => {
  //     this.setState({ loading: false });
  //   });
  //}

  componentDidUpdate() {}

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = inputValue => {
    this.setState({
      input: inputValue,
    });
  };

  render() {
    const { showModal } = this.state;
    const notify = () => toast.info('What are you searching for?');
    const errorMessage = () => toast.error('Oops... we didn`t find anything');

    return (
      <div className={css.App}>
        <Searchbar onSubmitProp={this.handleFormSubmit} notify={notify} />
        <ImageGallery
          inputValue={this.state.input}
          errorMessage={errorMessage}
        />
        {/* {this.state.loading && <h1>Loading</h1>}
        {this.state.imagesArray && <div>Здесь будет картинка</div>} */}
        <Button />
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
        {showModal && <Modal onClose={this.toggleModal}></Modal>}
      </div>
    );
  }
}
