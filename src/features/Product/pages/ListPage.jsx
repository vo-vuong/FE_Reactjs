import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },
}));
ListPage.propTypes = {};

function ListPage(props) {
  const classes = useStyles();
  // Thuong phan trang se co 3 state
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 1,
  });
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    page: 1, //default filters
  });

  useEffect(() => {
    (async () => {
      try {
        // goi request len server thi kem try catch
        const { data, pagination } = await productApi.getAll({ filters }); // desturing data
        setProductList(data);
        setPagination(pagination);
        // console.log(data, pagination);
      } catch (error) {
        console.log('Failed load product', error);
      }

      setLoading(false);
    })();
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: page,
    }));
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left column </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}

              <Pagination
                variant="outlined"
                color="primary"
                count={pagination.totalPage}
                page={pagination.page}
                onChange={handlePageChange}
              ></Pagination>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
// Box cai ngoai cung Phan tich layout tu ngoai vao trong. tu trai sang phai
// trong Box co container de trong hai ben
// trong bosstrap co row column thi trong marial co grid
// Gird o ngoai la row, hai cai o trong column

export default ListPage;
