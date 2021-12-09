import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import productApi from 'api/productApi';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const columns = [
  { id: 'id', label: 'id', minWidth: 170 },
  { id: 'name', label: 'Tên sản phẩm', minWidth: 100 },
  {
    id: 'shortdescription',
    label: 'Mô tả ngắn',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'price',
    label: 'Giá sản phẩm',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'action',
    label: 'a',
    minWidth: 200,
    align: 'center',
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function ProductAdminPage() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowsSate, SetRowsSate] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const list = await productApi.getAllAdmin();
        console.log({ list });
        SetRowsSate(
          list.map((x) => ({
            id: x.id,
            name: x.name,
            shortdescription: x.shortdescription,
            price: x.price,
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
    console.log(rowId);
    const newProductList = [...rowsSate];
    const index = rowsSate.findIndex((row) => row.id === rowId);
    newProductList.splice(index, 1);
    (async () => {
      try {
        const result = await productApi.remove(rowId);
        enqueueSnackbar(result.message, { variant: 'success' });
        console.log('Fai');
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    })();

    SetRowsSate(newProductList);
  };

  const handleClick = (id) => {
    history.push(`/admin/product/${id}`);
  };

  return (
    <Paper className={classes.root}>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === 'action') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button onClick={() => handleClick(rowId)} variant="contained" size="small" color="primary">
                            update
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            onClick={() => handleDelete(rowId)}
                          >
                            delete
                          </Button>
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={column.id} align={column.align}>
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
  );
}
