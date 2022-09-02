import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import { ImageService } from '../../imageServices';

import css from './ImageGallery.module.css';


export function ImageGallery ({inputValue, page, errorMessage, onHandleImagesArray, onHandleActiveObj}) {

  const [imagesArray, setImagesArray] = useState([]);
  const [status, setStatus] = useState('idle');  
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
// eslint-disable-next-line 
  },[inputValue, page]);

  
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