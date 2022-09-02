import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import { ImageService } from '../../imageServices';

import css from './ImageGallery.module.css';

//const imageService = new ImageService();

export function ImageGallery ({inputValue, page, errorMessage, onHandleImagesArray, onHandleActiveObj}) {

  const [imagesArray, setImagesArray] = useState([]);
  const [status, setStatus] = useState('idle');
  //const [activeObj, setActiveObj] = useState(null);
  const [input, setInput] = useState('');

  useEffect(()=>{
    if(!inputValue){
       return;
    }

    if (inputValue !== input) {
      setImagesArray([]);
      setInput(inputValue);
    }

    setStatus('pending');

      ImageService(inputValue, page).then(obj => {
          if (obj.total === 0) {
            errorMessage();
            setStatus('rejected');      
          }
          setImagesArray(prevState =>([...prevState, ...obj.hits]) );
          setStatus('resolved');   
            
          onHandleImagesArray(obj.hits);
        })
        .catch(error => {
          setStatus('rejected');
        });

  },[inputValue, page]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.inputValue !== this.props.inputValue) {
  //     this.setState({
  //       imagesArray: [],
  //     });
  //   }

  //   if (
  //     prevProps.inputValue !== this.props.inputValue ||
  //     prevProps.page !== this.props.page
  //   ) {
  //     this.setState({ status: 'pending' });

  //     ImageService(this.props.inputValue,this.props.page).then(obj => {
  //         if (obj.total === 0) {
  //           this.props.errorMessage();
  //           this.setState({ status: 'rejected' });
            
  //         }
  //         this.setState(prevState => {
  //           return {
  //             imagesArray: [...prevState.imagesArray, ...obj.hits],
  //             status: 'resolved',
  //           };
  //         });
  //         this.props.onHandleImagesArray(obj.hits);
  //       })
  //       .catch(error => {
  //         this.setState({ error: error, status: 'rejected' });
  //       });
  //   }
  // }

  const getActiveObj = id => {
    const activeObj = imagesArray.find(image => image.id === id);
    onHandleActiveObj(activeObj);
  };

   

    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return;
    }
    if (status === 'resolved') {
      return (
        <div>
          <ul className={css.ImageGallery}>
            {imagesArray.map(({ id, webformatURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={webformatURL}
                  id={id}
                  webformatURL={webformatURL}
                  tags={tags}
                  onGetActiveObj={getActiveObj}
                />
              );
            })}
          </ul>
        </div>
      );
    }
  }


ImageGallery.propTypes = {
  inputValue: PropTypes.string,
  page: PropTypes.number,
  onHandleImagesArray: PropTypes.func,
  onHandleActiveObj: PropTypes.func,
  errorMessage: PropTypes.func,
};