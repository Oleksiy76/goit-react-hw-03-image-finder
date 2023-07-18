import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt=""
        onClick={() => onClick(largeImageURL)}
        className={css.ImageGalleryItem_image}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
