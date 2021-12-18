import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'utils';
import { STATIC_IMAGE } from 'constants/index';
import DeleteIcon from '@material-ui/icons/Delete';

ProductCart.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', alignItems: 'center' },
  listTitle: {
    marginBottom: '10px',
  },
  imgProduct: { backgroundSize: 'content', width: '100px', height: '100px' },
  product: {
    display: 'flex',
    alignItems: 'center',
  },
  nameProduct: {
    marginLeft: '30px',
  },
  item: {
    width: '200px',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

function ProductCart(props) {
  const history = useHistory();
  const classes = useStyles();
  const thumbnailUrl = props.product.images.length > 0 ? props.product.images[0]?.url : STATIC_IMAGE;

  const handleClick = () => {
    history.push(`/products/${props.product.id}`);
  };
  console.log(props);
  return (
    <Box className={classes.root} padding={1}>
      <Box style={{ flexGrow: '1', cursor: 'pointer' }} padding={1} onClick={handleClick}>
        <Box className={classes.product}>
          <img className={classes.imgProduct} src={thumbnailUrl} alt={props.product.name}></img>
          <Typography className={classes.nameProduct} variant="body2">
            {props.product.name}
          </Typography>
        </Box>
      </Box>

      <Typography className={classes.item} variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {formatPrice(props.product.price)}
        </Box>
      </Typography>

      <Typography className={classes.item} variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {props.quantity}
        </Box>
      </Typography>

      <Typography className={classes.item} variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {formatPrice(props.quantity * props.product.price)}
        </Box>
      </Typography>

      <Typography className={classes.item} variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          <DeleteIcon></DeleteIcon>
        </Box>
      </Typography>
    </Box>
  );
}

export default ProductCart;
