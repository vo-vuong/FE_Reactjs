import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import ProductCart from './ProductCart';
import { formatPrice } from 'utils';
import { useSnackbar } from 'notistack';
import orderApi from 'api/orderApi';
import ProductOrder from './ProductOrder';

FormListOrder.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: '20px' },
  listTitle: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px 0',
  },
  itemProductCart: {
    marginBottom: '10px',
  },
  item: {
    width: '200px',
    alignItems: 'center',
    textAlign: 'center',
  },
  listTotal: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px 0',
  },
}));
function FormListOrder(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = React.useState('female');

  // const handleOrder = async () => {
  //   try {
  //     const { message, object } = await orderApi.addClient();
  //     enqueueSnackbar(message, { variant: 'success' });
  //   } catch (error) {
  //     enqueueSnackbar(error.message, { variant: 'error' });
  //   }
  // };
  console.log(props.listOrder);
  return (
    <div className={classes.root}>
      <Box style={{ paddingLeft: '16px' }}>
        <Typography component="h5" variant="h6">
          Danh sách hàng đã đặt
        </Typography>
      </Box>
      <Paper className={classes.listTitle}>
        <Typography style={{ flexGrow: '1', paddingLeft: '16px' }} component="h5" variant="h5">
          Sản phẩm
        </Typography>
        <Typography className={classes.item} component="h5" variant="h5">
          Đơn giá
        </Typography>
        <Typography className={classes.item} component="h5" variant="h5">
          Số lượng
        </Typography>
        <Typography className={classes.item} component="h5" variant="h5">
          Thành tiền
        </Typography>
        <Typography className={classes.item} component="h5" variant="h5">
          Trạng thái
        </Typography>
      </Paper>

      <Grid>
        {props.listOrder.map((item) => (
          <Paper key={item.id} className={classes.itemProductCart}>
            <Grid item>
              <ProductOrder status={item.status} orderDetail={item.orderDetail} idOrder={item.id} />
            </Grid>
          </Paper>
        ))}
      </Grid>

      <Paper>
        {/* <Box className={classes.listTotal}>
          <Typography style={{ paddingLeft: '16px' }} component="h5" variant="h6">
            Tổng số lượng sản phẩm: {props.totalQuantity}
          </Typography>
          <Typography style={{ paddingLeft: '16px', paddingRight: '16px' }} component="h5" variant="h6">
            Tổng tiền: {formatPrice(props.totalPrice)}
          </Typography>
          <Button
            onClick={handleOrder}
            variant="contained"
            color="primary"
            style={{ width: '100px', marginRight: '16px' }}
            size="small"
          >
            Mua hàng
          </Button>
        </Box> */}
      </Paper>

      <Paper style={{ marginTop: '8px' }}>
        {/* <Box className={classes.listTotal}>
          <Typography style={{ paddingLeft: '16px' }} component="h5" variant="h6">
            Tổng số lượng sản phẩm: {props.totalQuantity}
          </Typography>
          <Typography style={{ paddingLeft: '16px', paddingRight: '16px' }} component="h5" variant="h6">
            Tổng tiền: {formatPrice(props.totalPrice)}
          </Typography>
          <Button
            onClick={handleOrder}
            variant="contained"
            color="primary"
            style={{ width: '100px', marginRight: '16px' }}
            size="small"
          >
            Mua hàng
          </Button>
        </Box> */}
      </Paper>
    </div>
  );
}

export default FormListOrder;
