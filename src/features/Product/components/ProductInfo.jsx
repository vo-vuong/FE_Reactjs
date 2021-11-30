import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: theme.spacing(2), borderBottom: `1px solid ${theme.palette.grey[200]}` },
  description: {
    margin: theme.spacing(2, 0),
  },
  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  price: {
    marginRight: theme.spacing(2),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  detail: {},
  quantity: {},
}));

function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const { name, shortdescription, price, detail, quantity } = product;

  return (
    <Box className={classes.root}>
      <Typography> {name}</Typography>
      <Typography>{shortdescription}</Typography>

      <Box className={classes.priceBox}>
        <Box className={classes.price} component="span">
          {formatPrice(price)}
        </Box>
        <Box className={classes.quantity} component="span">
          {quantity}
        </Box>
      </Box>
      <Box>{detail}</Box>
    </Box>
  );
}

export default ProductInfo;
