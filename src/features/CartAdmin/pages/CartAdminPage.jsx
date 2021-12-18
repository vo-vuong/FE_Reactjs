import { Box, Button, Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import orderApi from 'api/orderApi';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { formatPrice } from 'utils';
import { formatDateTime } from 'utils/date';

const columns = [
  { id: 'id', label: 'id', minWidth: 10 },
  { id: 'createdBy', label: 'Được mua bởi', minWidth: 100 },
  {
    id: 'createdDate',
    label: 'Ngày mua',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'phone',
    label: 'Số điện thoại đặt hàng',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'totalPrice',
    label: 'Tổng số tiền',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'action',
    label: 'Tùy chọn',
    minWidth: 200,
    align: 'center',
  },
];

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },

  root: {
    flexGrow: 1,
    marginLeft: '30px',
    marginTop: '40px',
    marginRight: '30px',
  },
  title: {
    width: '100%',
  },
});

function CartAdminPage(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowsSate, SetRowsSate] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const list = await orderApi.getAllAdmin();
        // console.log(list);
        SetRowsSate(
          list.map((x) => ({
            id: x.id,
            createdBy: x.createdBy,
            createdDate: x.createdDate,
            phone: x.phone,
            totalPrice: x.totalPrice,
            status: x.status,
          }))
        );
      } catch (error) {
        console.log('Failed load category', error);
      }
    })();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (rowId) => {
    // console.log(rowId);
    // const newProductList = [...rowsSate];
    // const index = rowsSate.findIndex((row) => row.id === rowId);
    // newProductList.splice(index, 1);
    // (async () => {
    //   try {
    //     const result = await productApi.remove(rowId);
    //     enqueueSnackbar(result.message, { variant: 'success' });
    //     SetRowsSate(newProductList);
    //   } catch (error) {
    //     enqueueSnackbar('Không thể xóa sản phẩm.', { variant: 'error' });
    //   }
    // })();
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" component="h3" className={classes.title}>
              Trang danh sách đơn đặt hàng
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.table}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsSate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const rowId = row['id'];
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          if (column.id === 'action') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  //   onClick={() => handleClick(rowId)}
                                  variant="outlined"
                                  size="small"
                                  color="inherit"
                                >
                                  Chi tiết
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="secondary"
                                  onClick={() => handleDelete(rowId)}
                                >
                                  delete
                                </Button>
                              </TableCell>
                            );
                          } else if (column.id === 'totalPrice') {
                            {
                              return <TableCell align={column.align}>{formatPrice(value)}</TableCell>;
                            }
                          } else if (column.id === 'createdDate') {
                            {
                              return <TableCell align={column.align}>{formatDateTime(value)}</TableCell>;
                            }
                          } else if (column.id === 'status') {
                            {
                              if (value === -1) {
                                return <TableCell align={column.align}>Đã hủy</TableCell>;
                              }
                              if (value === 0) {
                                return <TableCell align={column.align}>Đang đợi duyệt</TableCell>;
                              }
                              if (value === 1) {
                                return <TableCell align={column.align}>Đã được duyệt</TableCell>;
                              }
                              if (value === 2) {
                                return <TableCell align={column.align}>Đã thanh toán</TableCell>;
                              }
                            }
                          } else {
                            return (
                              <TableCell align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rowsSate.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartAdminPage;
