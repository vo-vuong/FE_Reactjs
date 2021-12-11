import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from 'api/productApi';
import { useSnackbar } from 'notistack';
import { React, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import ProductDetail from '../components/ProductDetail';
import ProductForm from '../components/ProductForm';

ProductCreatePage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, marginLeft: '30px', marginTop: '40px', marginRight: '30px' },

  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
  title: {
    width: '100%',
  },
}));

function ProductCreatePage(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  //   const {
  //     params: { productId },
  //   } = useRouteMatch();

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const product = await productApi.get(productId);

  //         setProduct(product);
  //       } catch (error) {
  //         console.log('Failed to fetch product ', error);
  //       }
  //     })();
  //   }, []);

  const handleProductFormSubmit = async (values) => {
    try {
      //   const { message, object } = await categoryContentApi.addAdmin(values);
      console.log(values);
      enqueueSnackbar('message', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" component="h3" className={classes.title}>
              Tạo mới sản phẩm
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ProductForm onSubmit={handleProductFormSubmit} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductCreatePage;
