import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';

import css from './ImageGallery.module.css';

const KEY = '28152174-c362e84e874961aded494c5b6';

export class ImageGallery extends Component {
  state = {
    imagesArray: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${this.props.inputValue}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(new Error(this.props.errorMessage()));
          })

          .then(obj => {
            if (obj.total === 0) {
              this.props.errorMessage();
            }
            this.setState({ imagesArray: obj.hits, status: 'resolved' });
          })
          .catch(error => {
            this.setState({ error: error, status: 'rejected' });
          });
      }, 2000);
    }
  }

  render() {
    const { imagesArray, status } = this.state;

    // if (status === 'idle') {
    //   return;
    // }
    if (status === 'pending') {
      return <Loader />;
      // <div>Loading...</div>;
    }
    if (status === 'rejected') {
      return this.props.errorMessage();
    }
    if (status === 'resolved') {
      return (
        <div>
          <ul className={css.ImageGallery}>
            {imagesArray.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  id={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              );
            })}
          </ul>
        </div>
      );
    }
  }
}
