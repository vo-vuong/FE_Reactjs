import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'utils';
import { STATIC_IMAGE } from 'constants/index';

ProductCart.propTypes = {};

function ProductCart(props) {
  const history = useHistory();
  const thumbnailUrl = props.product.images.length > 0 ? props.product.images[0]?.url : STATIC_IMAGE;

  const handleClick = () => {
    history.push(`/products/${props.product.id}`);
  };

  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={props.product.name} width="100%"></img>
      </Box>
      <Typography variant="body2">{props.product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {formatPrice(props.product.price)}
        </Box>
      </Typography>
    </Box>
  );
}

export default ProductCart;
