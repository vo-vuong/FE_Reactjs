import { Box } from '@material-ui/core';
import { STATIC_IMAGE } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumbnail({ product }) {
  const thumbnailUrl = product.images?.length > 0 ? product.images[0]?.url : STATIC_IMAGE; // dang nho

  return (
    <Box>
      <img src={thumbnailUrl} alt={product.name} width="100%" />
    </Box>
  );
}

export default ProductThumbnail;
