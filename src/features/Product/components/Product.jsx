import { Box, Typography } from '@material-ui/core';
import { STATIC_IMAGE } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  // console.log(product.images[0].url);
  const thumbnailUrl = product.images.length > 0 ? product.images[0]?.url : STATIC_IMAGE; // dang nho

  return (
    <Box padding={1}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%"></img>
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
        </Box>
      </Typography>
    </Box>
  );
}

export default Product;