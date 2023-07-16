import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item }) => {
  const [shownModal, setShownModal] = useState(false);

  const onModal = () => {
    setShownModal(prevState => !prevState);
  };
  return (
    <li className={css.imageGalleryItem}>
      <img
        onClick={onModal}
        className={css.imageGalleryItemImage}
        src={item.webformatURL}
        alt={item.tags}
      />
      {shownModal && <Modal onClose={onModal} image={item} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
