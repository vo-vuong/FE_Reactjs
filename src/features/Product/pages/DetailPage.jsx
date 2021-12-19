import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import cartApi from 'api/cartApi';
import { useSnackbar } from 'notistack';
// import { addToCart } from 'features/Cart/cartSlice';
import React from 'react';
// import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductComment from '../components/ProductComment';
import ProductDescription from '../components/ProductDescription';
import ProductEvaluation from '../components/ProductEvaluation';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },

  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function DetailPage() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  // const match = useRouteMatch();
  // console.log({ match }); get param do tren url

  const {
    params: { productId },
    url,
  } = useRouteMatch(); // day la destructuring 2 tang
  //Binh thuong khi co productId roi se useEffect get san pham. nhung bay gio se lam custom hook

  const { product, loading } = useProductDetail(productId);
  // const dispatch = useDispatch();

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }
  const handleAddToCartSubmit = async ({ quantity }) => {
    // const action = addToCart({
    //   id: product.id,
    //   product,
    //   quantity,
    // });
    // dispatch(action);
    try {
      const values = {
        productId: product.id,
        quantity: quantity,
      };
      const result = await cartApi.addClient(values);
      console.log(values);
      enqueueSnackbar(result.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />
        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>
          
          <Route path={`${url}/evaluation`} component={ProductEvaluation} />
          <Route path={`${url}/comment`} component={ProductComment} />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
