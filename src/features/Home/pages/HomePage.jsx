import { Box, Container, Grid, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import FavoriteProductList from '../components/FavoriteProductList';

const useStyles = makeStyles((theme) => ({
  root: {},
  mainFeaturedPost: {
    width: '100%',
    height: '50vh',
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

function HomePage({ post }) {
  const classes = useStyles();
  const [productList, setProductList] = useState([]);

  const filters = {
    page: 1,
    sort: 'gia-thap-den-cao',
  };

  useEffect(() => {
    (async () => {
      try {
        // goi request len server thi kem try catch
        const { data } = await productApi.getAll({ filters }); // desturing data
        setProductList(data.slice(0, 8));
      } catch (error) {
        console.log('Failed load product', error);
      }

      // setLoading(false);
    })();
  }, []);

  return (
    <Box>
      <Container>
        <Grid container>
          <Paper className={classes.mainFeaturedPost}>
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} alt="test" src="https://source.unsplash.com/random" />}
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    post.title
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    post.description
                  </Typography>
                  <Link variant="subtitle1" href="#">
                    post.linkText
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container>
          <FavoriteProductList title="Sản phẩm nổi bật" productList={productList} />
        </Grid>
      </Container>
    </Box>
  );
}
// Box cai ngoai cung Phan tich layout tu ngoai vao trong. tu trai sang phai
// trong Box co container de trong hai ben
// trong bosstrap co row column thi trong marial co grid
// Gird o ngoai la row, hai cai o trong column

export default HomePage;
