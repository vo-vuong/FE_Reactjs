import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import useProductDetailAdmin from '../hooks/useProductDetailAdmin';
import { Box, LinearProgress, makeStyles } from '@material-ui/core';

ProductDetailAdminPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},

  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function ProductDetailAdminPage(props) {
  const classes = useStyles();
  const {
    params: { productId },
  } = useRouteMatch(); // day la destructuring 2 tang
  //Binh thuong khi co productId roi se useEffect get san pham. nhung bay gio se lam custom hook

  const { product, loading } = useProductDetailAdmin(productId);
  console.log(product);
  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  return <div>ProductDetailAdminPage</div>;
}

export default ProductDetailAdminPage;
