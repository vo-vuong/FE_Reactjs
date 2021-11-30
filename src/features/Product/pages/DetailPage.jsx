import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Route, useRouteMatch, Switch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductDescription from '../components/ProductDescription';
import ProductEvaluation from '../components/ProductEvaluation';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
}));

function DetailPage() {
  const classes = useStyles();
  // const match = useRouteMatch();
  // console.log({ match }); get param do tren url
  const {
    params: { productId },
    url,
  } = useRouteMatch(); // day la destructuring 2 tang
  //Binh thuong khi co productId roi se useEffect get san pham. nhung bay gio se lam custom hook

  const { product, loading } = useProductDetail(productId);

  if (loading) {
    // Tao cai loading cho dep ti
    return <Box>Loading</Box>;
  }

  const handleAddToCartSubmit = (formValues) => {
    console.log('Form submit', formValues);
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
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
