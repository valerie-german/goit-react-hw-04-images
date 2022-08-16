import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  onGetActiveObj,
}) => {
  return (
    <li className={css.ImageGalleryItem} onClick={() => onGetActiveObj(id)}>
      <img
        id={id}
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onGetActiveObj: PropTypes.func.isRequired,
};
