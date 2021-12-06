import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import categoryApi from 'api/categoryApi';
import React, { useEffect, useState } from 'react';

ProductCategoryPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: '30px',
    marginTop: '40px',
    marginRight: '30px',
  },
  title: {
    width: '100%',
  },
  table: {
    minWidth: 650,
  },
}));

function ProductCategoryPage(props) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        console.log({ list });
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
            code: x.code,
            createdBy: x.createdBy,
          }))
        );
      } catch (error) {
        console.log('Failed load category', error);
      }
    })();
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" component="h3" className={classes.title}>
              Danh mục sản phẩm
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {/* <Paper></Paper> */}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">Tên danh mục</TableCell>
                  <TableCell align="right">Code</TableCell>
                  <TableCell align="right">Được tạo bởi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="right" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.code}</TableCell>
                    <TableCell align="right">{item.createdBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductCategoryPage;
