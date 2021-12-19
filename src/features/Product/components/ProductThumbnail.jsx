import { Box, makeStyles } from '@material-ui/core';
import { STATIC_IMAGE } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  productImage: {
    backgroundSize: 'content',
    width: '100%',
    height: '350px',
  },
}));

function ProductThumbnail({ product }) {
  const classes = useStyles();
  const thumbnailUrl = product.images[0].url ? product.images[0].url : STATIC_IMAGE;

  return (
    <Box>
      <img src={thumbnailUrl} alt={product.name} className={classes.productImage} />
    </Box>
  );
}

export default ProductThumbnail;
