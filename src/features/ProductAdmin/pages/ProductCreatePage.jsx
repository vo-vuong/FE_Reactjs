import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import originApi from 'api/originApi';
import productApi from 'api/productApi';
import { useSnackbar } from 'notistack';
import { React, useEffect, useState } from 'react';
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
  const [categoryList, setCategoryList] = useState([]);
  const [categoryOriginList, setCategoryOriginList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const list = await originApi.getAll();
        setCategoryOriginList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    })();
  }, []);

  const handleProductFormSubmit = async (values) => {
    try {
      console.log(values);
      const result = await productApi.addAdmin(values);
      enqueueSnackbar('Đã thêm sản phẩm mới thành công.', { variant: 'success' });
    } catch (error) {
      // enqueueSnackbar(error.message, { variant: 'error' });
      console.log(error);
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
          <ProductForm
            categoryList={categoryList}
            categoryOriginList={categoryOriginList}
            onSubmit={handleProductFormSubmit}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductCreatePage;
