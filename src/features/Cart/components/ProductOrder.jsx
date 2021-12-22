import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { formatPrice } from 'utils';
import { STATIC_IMAGE } from 'constants/index';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSnackbar } from 'notistack';
import orderApi from 'api/orderApi';
import cartApi from 'api/cartApi';

ProductOrder.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', alignItems: 'center' },
  root2: { display: 'flex', alignItems: 'center', flexGrow: '1' },
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

function ProductOrder(props) {
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  //const thumbnailUrl = props.product.images.length > 0 ? props.product.images[0]?.url : STATIC_IMAGE;
  // console.log(props);
  // const handleClick = () => {
  //   history.push(`/products/${props.product.id}`);
  // };

  const handleDeleteCart = async (idCart) => {
    try {
      const { message } = await cartApi.remove(idCart);
      enqueueSnackbar(message, { variant: 'success' });
      history.push('/');
      history.push('/cart');
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root} padding={1}>
      {props.orderDetail.map((item) => (
        <Box key={item.id} className={classes.root2}>
          <Box style={{ flexGrow: '1', cursor: 'pointer' }} padding={1}>
            <Box className={classes.product}>
              <img className={classes.imgProduct} src={item.product.images[0].url} alt={item.product.name}></img>
              <Typography className={classes.nameProduct} variant="body2">
                {item.product.name}
              </Typography>
            </Box>
          </Box>
          <Typography className={classes.item} variant="body2">
            <Box component="span" fontSize="16px" fontWeight="bold">
              {formatPrice(item.product.price)}
            </Box>
          </Typography>

          <Typography className={classes.item} variant="body2">
            <Box component="span" fontSize="16px" fontWeight="bold">
              {item.quantity}
            </Box>
          </Typography>

          <Typography className={classes.item} variant="body2">
            <Box component="span" fontSize="16px" fontWeight="bold">
              {formatPrice(item.price)}
            </Box>
          </Typography>
          <Typography className={classes.item} variant="body2">
            <Box component="span" fontSize="16px" fontWeight="bold">
              {/* <DeleteIcon onClick={() => handleDeleteCart(props.idCart)}></DeleteIcon> */}
              {/* {props.status + ''} */}
              {props.status == 0 ? 'Đang chờ duyệt' : ''}
              {props.status == -1 ? 'Đã hủy' : ''}
              {props.status == 2 ? 'Đã thanh toán' : ''}
              {props.status == 1 ? 'Đã duyệt' : ''}
            </Box>
          </Typography>
        </Box>
      ))}
      {/* <Box style={{ flexGrow: '1', cursor: 'pointer' }} padding={1} onClick={handleClick}>
        <Box className={classes.product}>
          <img className={classes.imgProduct} src={thumbnailUrl} alt={props.product.name}></img>
          <Typography className={classes.nameProduct} variant="body2">
            {props.product.name}
          </Typography>
        </Box>
      </Box>

      

      <Typography className={classes.item} variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {props.quantity}
        </Box>
      </Typography>

      <Typography className={classes.item} variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {formatPrice(props.quantity * props.product.price)}
        </Box>
      </Typography> */}

      {/* <Typography className={classes.item} variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          <DeleteIcon onClick={() => handleDeleteCart(props.idCart)}></DeleteIcon>
          {props.status + ''}
        </Box>
      </Typography> */}
    </Box>
  );
}

export default ProductOrder;
