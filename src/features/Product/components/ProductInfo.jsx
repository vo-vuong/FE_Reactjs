import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from 'utils';
import { Rating } from '@material-ui/lab';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: theme.spacing(1), borderBottom: `1px solid ${theme.palette.grey[200]}` },
  nameCode: {
    margin: theme.spacing(0, 0, 1, 0),
  },
  name: {
    display: 'inline',
  },
  code: {
    margin: theme.spacing(0, 0, 0, 2),
    display: 'inline',
  },
  shortdescription: {
    margin: theme.spacing(0, 0, 1, 0),
  },
  priceBox: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
  },
  price: {
    marginRight: theme.spacing(2),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  ratingBox: {
    marginTop: theme.spacing(1),
    display: 'flex',
  },
  detail: {},
  quantity: {},
}));

function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const { name, shortdescription, price, quantity, code, rate } = product;

  return (
    <Box className={classes.root}>
      <Box className={classes.nameCode}>
        <Typography variant="h4" component="h3" className={classes.name}>
          {name}
        </Typography>
        <Typography className={classes.code}>code: {code}</Typography>
      </Box>

      <Typography className={classes.shortdescription}>{shortdescription}</Typography>
    
      <Box className={classes.priceBox}>
        <Box className={classes.price} component="span">
          {formatPrice(price)}
        </Box>
      </Box>
      <Box className={classes.ratingBox}>
        <Typography className={classes.code}>Đánh giá</Typography>
        <Rating name="half-rating-read" defaultValue={rate || 5} precision={0.1} readOnly />
      </Box>
      
    </Box>
  );
}

export default ProductInfo;
