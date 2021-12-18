import { Box, Button, Grid, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import contentApi from 'api/contentApi';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { formatPrice } from 'utils';

const columns = [
  { id: 'id', label: 'id', minWidth: 10 },
  { id: 'name', label: 'Tên bài viết', minWidth: 100, align: 'center' },
  { id: 'code', label: 'Định danh bài viết', minWidth: 100, align: 'center' },
  {
    id: 'title',
    label: 'Tiêu đề bài viết',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'shortdescription',
    label: 'Mô tả ngắn',
    minWidth: 170,
    align: 'center',
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

export default function ContentsAdminPage() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowsSate, SetRowsSate] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const list = await contentApi.getAllAdmin();
        SetRowsSate(
          list.map((x) => ({
            id: x.id,
            name: x.name,
            code: x.code,
            title: x.title,
            shortdescription: x.shortdescription,
            price: x.price,
          }))
        );
      } catch (error) {
        console.log('Failed load contents', error);
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
    (async () => {
      try {
        const result = await contentApi.remove(rowId);
        const newContentsList = [...rowsSate];
        const index = rowsSate.findIndex((row) => row.id === rowId);
        newContentsList.splice(index, 1);
        enqueueSnackbar(result.message, { variant: 'success' });
        SetRowsSate(newContentsList);
      } catch (error) {
        enqueueSnackbar('Không thể xóa bài viết.', { variant: 'error' });
      }
    })();
  };

  const handleClick = (id) => {
    history.push(`/admin/contents/${id}`);
  };

  const handleCreate = () => {
    history.push('/admin/contents/create');
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" component="h3" className={classes.title}>
              Trang danh sách bài viết
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" size="small" style={{ color: green[500] }} onClick={handleCreate}>
            Tạo mới bài viết
          </Button>
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
                                  onClick={() => handleClick(rowId)}
                                  variant="outlined"
                                  size="small"
                                  color="primary"
                                  style={{ marginRight: '5px' }}
                                >
                                  update
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
                          } else if (column.id === 'price') {
                            {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {formatPrice(value)}
                                </TableCell>
                              );
                            }
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
        </Grid>
      </Grid>
    </Box>
  );
}
