import { Box, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import categoryApi from 'api/categoryApi';
import InputField from 'components/form-controls/InputField';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { formatPrice } from 'utils';
import { formatDateTime } from 'utils/date';

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
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        // console.log({ list });
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
            code: x.code,
            createdBy: x.createdBy,
            createdDate: x.createdDate,
          }))
        );
      } catch (error) {
        console.log('Failed load category', error);
      }
    })();
  }, []);

  const handleClick = (id) => {
    history.push(`/admin/product-category/${id}`);
  };

  const handleDelete = (id) => {
    const newCategoryList = [...categoryList];
    const index = categoryList.findIndex((row) => row.id === id);
    newCategoryList.splice(index, 1);
    (async () => {
      try {
        const result = await categoryApi.removeAdmin(id);
        enqueueSnackbar(result.message, { variant: 'success' });
        setCategoryList(newCategoryList);
      } catch (error) {
        enqueueSnackbar('Không thể xóa danh mục sản phẩm.', { variant: 'error' });
      }
    })();
  };

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
                  <StyledTableCell align="right">Ngày tạo</StyledTableCell>
                  <StyledTableCell align="right">Thao tác</StyledTableCell>
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
                    <StyledTableCell align="right">{formatDateTime(item.createdDate)}</StyledTableCell>

                    {/* <StyledTableCell align="right">{formatPrice(item.createdDate)}</StyledTableCell> */}
                    <StyledTableCell align="right">
                      <Button onClick={() => handleClick(item.id)} variant="contained" size="small" color="primary">
                        update
                      </Button>
                      <Button variant="contained" size="small" color="secondary" onClick={() => handleDelete(item.id)}>
                        delete
                      </Button>
                    </StyledTableCell>
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
