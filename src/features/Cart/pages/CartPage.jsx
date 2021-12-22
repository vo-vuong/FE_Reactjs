import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, makeStyles, Typography } from '@material-ui/core';
import FormListCart from '../components/FormListCart';
import { useSnackbar } from 'notistack';
import cartApi from 'api/cartApi';
import orderApi from 'api/orderApi';
import FormListOrder from '../components/FormListOrder';


CartPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    // paddingRight: '400px',
    // paddingLeft: '400px',
    position: 'relative',
    marginTop: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(1, 0, 1, 0),
    textAlign: 'center',
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
  back: {
    marginBottom: '30px',
  },
  form: {
    minWidth: '500px',
    position: 'relative',
  },
}));

function CartPage(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [cartList, setCartList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrderQuantity, setTotalOrderQuantity] = useState(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState(0);
  const [statusOrder, setStatusOrder] = useState(0);
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { cartDetail, totalPrice, totalQuantity } = await cartApi.getAll();
        setCartList(
          cartDetail.map((x) => ({
            id: x.id,
            product: x.product,
            quantity: x.quantity,
          }))
        );
        setTotalQuantity(totalQuantity);
        setTotalPrice(totalPrice);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    })();
  }, []);
  //   console.log(cartList);
  useEffect(() => {
    (async () => {
      try {
        const list = await orderApi.getAll();
        // const list = await orderApi.getAll();
        // console.log(list);
        // setOrderList(
        //   list.map((x) => ({
        //     id: x.id,
        //     product: x.product,
        //     quantity: x.quantity,
        //   }))
        // );
        // totalOrderQuantity(totalQuantity);
        // totalOrderPrice(totalPrice);
        // setStatusOrder(status);
        setListOrder(list);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    })();
  }, []);
  console.log(listOrder);

  return (
    <Container className={classes.root}>
      {/* <Typography className={classes.title} component="h1" variant="h5">
        Quản lý giỏ hàng
      </Typography> */}

      {totalPrice ? (
        <FormListCart cartList={cartList} totalPrice={totalPrice} totalQuantity={totalQuantity} />
      ) : (
        <Typography className={classes.title} component="h1" variant="h5">
          Giỏ hàng của bạn hiện đang trống.
        </Typography>
      )}
      {listOrder ? (
        <FormListOrder listOrder={listOrder} />
      ) : (
        <Typography className={classes.title} component="h1" variant="h5">
          Bạn chưa đặt món hàng nào.
        </Typography>
      )}
    </Container>
  );
}

export default CartPage;
