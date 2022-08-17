import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import PropTypes from 'prop-types';
import { ImageService } from '../../imageServices';

import css from './ImageGallery.module.css';

const imageService = new ImageService();

export class ImageGallery extends Component {
  state = {
    imagesArray: [],
    error: null,
    status: 'idle',
    activeObj: null,
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

      imageService.getImages(this.props.inputValue,this.props.page).then(obj => {
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
    }
  }

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
            {imagesArray.map(({ id, webformatURL, tags }) => {
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
