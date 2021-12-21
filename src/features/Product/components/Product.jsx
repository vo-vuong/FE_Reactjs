import { Box, makeStyles, Typography } from '@material-ui/core';
import { STATIC_IMAGE } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import { formatPrice } from 'utils';

Product.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  productImage: {
    backgroundSize: 'content',
    width: '100%',
    height: '250px',
  },
}));

function Product({ product }) {
  const classes = useStyles();
  const thumbnailUrl = product.images[0].url ? product.images[0].url : STATIC_IMAGE; // dang nho
  const history = useHistory();

  const handleClick = () => {
    // Navigate to detail page: /products/:productId
    history.push(`/products/${product.id}`);
  };
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} className={classes.productImage}></img>
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {formatPrice(product.price)}
        </Box>
      </Typography>
    </Box>
  );
}

export default Product;
