import  { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'components/Modal/Modal';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

export function App () {
//  state = {
//    showModal: false,
//    input: '',
//    imagesArray: null,
//    page: 1,
//    activeObj: null,
//  };

const [showModal, setShowModal] = useState(false);
const [input, setInput] = useState('');
const [imagesArray, setImagesArray] = useState(null);
const [page, setPage] = useState(1);
const [activeObj, setActiveObj] = useState(null);

const toggleModal = () => {
  setShowModal((prevState) => (
      !prevState ));
  };

const handleFormSubmit = inputValue => {
  setInput(inputValue);
  setPage(1);
  };

const handleImagesArray = array => {
    array.length > 0 ? setImagesArray(array): setImagesArray(null)
    }
  

const  handleActiveObj = obj => {
  setActiveObj(obj );
  toggleModal();
  };

const handleButton = page => {
   setPage(page);
  };

  const notify = () => toast.info('What are you searching for?');
  const errorMessage = () => toast.error('Oops... we didn`t find anything');

//  executeScroll = () => document.querySelector(`#toScroll`).scrollIntoView();

  
    // const { showModal, input, imagesArray, activeObj, page } = this.state;
   

    return (
      <div className={css.App}>
        <Searchbar onSubmitProp={handleFormSubmit} notify={notify} />
        <ImageGallery
          inputValue={input}
          page={page}
          onHandleImagesArray={handleImagesArray}
          onHandleActiveObj={handleActiveObj}
          errorMessage={errorMessage}
        />
        {imagesArray && <Button onHandleButton={handleButton} />}
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
          <Modal onClose={toggleModal} activeObj={activeObj}></Modal>
        )}
      </div>
    );
  };

