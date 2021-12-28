import { Box, Container, Grid, LinearProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import cartApi from 'api/cartApi';
import commentApi from 'api/commentApi';
import rateApi from 'api/rateApi';
import { useSnackbar } from 'notistack';
// import { addToCart } from 'features/Cart/cartSlice';
import React, { useEffect, useState } from 'react';
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

  wanrranty: {
    marginTop: '15px',
  },
}));

function DetailPage() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [commentList, setCommentList] = useState([]);
  const [rateList, setRateList] = useState([]);
  // const match = useRouteMatch();
  // console.log({ match }); get param do tren url

  const {
    params: { productId },
    url,
  } = useRouteMatch(); // day la destructuring 2 tang
  //Binh thuong khi co productId roi se useEffect get san pham. nhung bay gio se lam custom hook

  const { product, loading } = useProductDetail(productId);
  // const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { list } = await commentApi.get(productId);
        setCommentList(
          list.map((x) => ({
            id: x.id,
            message: x.message,
            commentReply: x.commentReply,
            createdDate: x.createdDate,
            user: x.user,
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
        const { list } = await rateApi.get(productId);
        setRateList(
          list.map((x) => ({
            id: x.id,
            message: x.message,
            rateReply: x.rateReply,
            createdDate: x.createdDate,
            user: x.user,
          }))
        );
      } catch (error) {
        // enqueueSnackbar(error.message, { variant: 'error' });
        console.log(error);
      }
    })();
  }, []);
  console.log(rateList);

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
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  const handleCommentSubmit = async (values) => {
    try {
      if (values.hasOwnProperty('productId')) {
        const { message, object } = await commentApi.addClient(values);
        const objectResult = {
          id: object.id,
          message: object.message,
          commentReply: object.commentReply,
          createdDate: object.createdDate,
          user: object.user,
        };
        const newCommentList = [...commentList, objectResult];
        setCommentList(newCommentList);
        enqueueSnackbar(message, { variant: 'success' });
      } else {
        const { message, object } = await commentApi.addClientReply(values);
        // const objectResult = {
        //   id: object.id,
        //   message: object.message,
        //   commentReply: object.commentReply,
        //   createdDate: object.createdDate,
        //   user: object.user,
        // };
        // const newCommentList = [...commentList, objectResult];
        // setCommentList(newCommentList);
        enqueueSnackbar(message, { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleRateSubmit = async (values) => {
    console.log(values);
    try {
      if (values.hasOwnProperty('productId')) {
        // const { message, object } = await rateApi.addClient(values);
        // const objectResult = {
        //   id: object.id,
        //   message: object.message,
        //   commentReply: object.commentReply,
        //   createdDate: object.createdDate,
        //   user: object.user,
        // };
        // const newCommentList = [...commentList, objectResult];
        // setCommentList(newCommentList);
        // enqueueSnackbar(message, { variant: 'success' });
      } else {
        const { message, object } = await rateApi.addClientReply(values);
        // const objectResult = {
        //   id: object.id,
        //   message: object.message,
        //   commentReply: object.commentReply,
        //   createdDate: object.createdDate,
        //   user: object.user,
        // };
        // const newCommentList = [...commentList, objectResult];
        // setCommentList(newCommentList);
        enqueueSnackbar(message, { variant: 'success' });
      }
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
              <Typography className={classes.wanrranty}>Số lượng hàng còn: {product.quantity}</Typography>
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />
        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>
          <Route path={`${url}/evaluation`}>
            {rateList ? (
              <ProductEvaluation rateList={rateList} productId={productId} onSubmit={handleRateSubmit} />
            ) : (
              ''
            )}
          </Route>
          <Route path={`${url}/comment`}>
            {commentList ? (
              <ProductComment commentList={commentList} productId={productId} onSubmit={handleCommentSubmit} />
            ) : (
              ''
            )}
          </Route>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
