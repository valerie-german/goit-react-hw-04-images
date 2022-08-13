import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';

import css from './ImageGallery.module.css';

const KEY = '28152174-c362e84e874961aded494c5b6';

export class ImageGallery extends Component {
  state = {
    imagesArray: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
      console.log('изменился запрос');

      this.setState({ loading: true });
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
          this.setState({ imagesArray: obj.hits });
        })
        .catch(error => {
          this.setState({ error: error });
          // this.props.errorMessage();
        })
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { imagesArray, loading } = this.state;

    if (imagesArray !== null) {
      return (
        <div>
          {loading && <div>Loading...</div>}
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
