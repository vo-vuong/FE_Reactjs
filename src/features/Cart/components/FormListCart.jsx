import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import ProductCart from './ProductCart';

FormListCart.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  listTitle: {
    display: 'flex',
    alignItems: 'stretch',
    marginBottom: '10px',
  },
}));
function FormListCart(props) {
  const classes = useStyles();

  console.log(props);
  return (
    <div>
      <Paper className={classes.listTitle}>
        <Typography style={{ flexGrow: '5' }} component="h5" variant="h5">
          Sản phẩm
        </Typography>
        <Typography style={{ flexGrow: '1' }} component="h5" variant="h5">
          Đơn giá
        </Typography>
        <Typography style={{ flexGrow: '1' }} component="h5" variant="h5">
          Số lượng
        </Typography>
        <Typography style={{ flexGrow: '1' }} component="h5" variant="h5">
          Thành tiền
        </Typography>
        <Typography style={{ flexGrow: '1' }} component="h5" variant="h5">
          Thao tác
        </Typography>
      </Paper>
      <Paper>
        <Grid container>
          {props.cartList.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCart product={item.product} />
              <Typography component="h1" variant="h3">
                {item.quantity}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Box>hi</Box>
    </div>
  );
}

export default FormListCart;
