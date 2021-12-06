import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import categoryApi from 'api/categoryApi';
import React, { useEffect, useState } from 'react';

ProductCategoryPage.propTypes = {};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
    minWidth: 700,
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
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">ID</StyledTableCell>
                  <StyledTableCell align="right">Tên danh mục</StyledTableCell>
                  <StyledTableCell align="right">Code</StyledTableCell>
                  <StyledTableCell align="right">Được tạo bởi</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryList.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell align="right" scope="row">
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.name}</StyledTableCell>
                    <StyledTableCell align="right">{item.code}</StyledTableCell>
                    <StyledTableCell align="right">{item.createdBy}</StyledTableCell>
                  </StyledTableRow>
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
