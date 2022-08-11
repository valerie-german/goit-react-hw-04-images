import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = () => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src="https://cdn.pixabay.com/photo/2022/04/10/19/33/house-7124141_960_720.jpg"
        alt=""
      />
    </li>
  );
};
