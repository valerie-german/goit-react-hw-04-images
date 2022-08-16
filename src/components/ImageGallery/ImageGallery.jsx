import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

const KEY = '28152174-c362e84e874961aded494c5b6';

export class ImageGallery extends Component {
  state = {
    imagesArray: [],
    error: null,
    status: 'idle',
    activeObj: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({
        imagesArray: [],
      });
    }

    if (
      prevProps.inputValue !== this.props.inputValue ||
      prevProps.page !== this.props.page
    ) {
      this.setState({ status: 'pending' });
      this.setPages();

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${this.props.inputValue}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
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
            this.setState(prevState => {
              return {
                imagesArray: [...prevState.imagesArray, ...obj.hits],
                status: 'resolved',
              };
            });
            this.props.onHandleImagesArray(obj.hits);
          })
          .catch(error => {
            this.setState({ error: error, status: 'rejected' });
          });
      }, 1000);
    }
  }

  setPages = () => {
    this.setState({
      page: this.props.page,
    });
  };

  getActiveObj = id => {
    const activeObj = this.state.imagesArray.find(image => image.id === id);
    this.setState({ activeObj: activeObj });
    this.props.onHandleActiveObj(activeObj);
  };

  render() {
    const { imagesArray, status } = this.state;

    if (status === 'pending') {
      return <Loader />;
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
                  tags={tags}
                  onGetActiveObj={this.getActiveObj}
                />
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  inputValue: PropTypes.string,
  page: PropTypes.number,
  onHandleImagesArray: PropTypes.func,
  onHandleActiveObj: PropTypes.func,
  errorMessage: PropTypes.func,
};
