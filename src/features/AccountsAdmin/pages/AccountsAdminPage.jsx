import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
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
import WarningIcon from '@material-ui/icons/Warning';
import accountsApi from 'api/accountsApi';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const columns = [
  { id: 'id', label: 'id', minWidth: 10 },
  { id: 'username', label: 'Tên đăng nhập', minWidth: 100, align: 'center' },
  { id: 'fullname', label: 'Họ và tên', minWidth: 100, align: 'center' },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'roles',
    label: 'Vai trò',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'status',
    label: 'Trạng thái',
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
    maxHeight: '65vh',
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

export default function AccountsAdminPage() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowsSate, SetRowsSate] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [idAccount, setIdAccount] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await accountsApi.getAllAdmin();
        SetRowsSate(
          list.map((x) => ({
            id: x.id,
            username: x.username,
            fullname: x.fullname,
            email: x.email,
            status: x.status,
            roles: x.roles[0].name,
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

  const handleAgreeDelete = () => {
    (async () => {
      try {
        const result = await accountsApi.remove(idAccount);
        const newAccountList = [...rowsSate];
        const index = rowsSate.findIndex((row) => row.id === idAccount);
        newAccountList.splice(index, 1);
        enqueueSnackbar(result.message, { variant: 'success' });
        SetRowsSate(newAccountList);
        setIdAccount();
        setOpen(false);
      } catch (error) {
        enqueueSnackbar('Không thể xóa tài khoản.', { variant: 'error' });
      }
    })();
  };

  const handleDelete = (id) => {
    setIdAccount(id);
    setOpen(true);
  };

  const handleClick = (id) => {
    history.push(`/admin/accounts/${id}`);
  };

  // const handleCreate = () => {
  //   history.push('/admin/accounts/create');
  // };

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" component="h3" className={classes.title}>
              Trang danh sách tài khoản
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {/* <Button variant="contained" size="small" style={{ color: green[500] }} onClick={handleCreate}>
            Tạo mới tài khoản
          </Button> */}
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
                          } else if (column.id === 'status') {
                            {
                              if (value === 1) {
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    <Button
                                      style={{ marginRight: '5px' }}
                                      variant="outlined"
                                      size="small"
                                      color="inherit"
                                      disabled
                                      //onClick={() => handleSuccess(rowId)}
                                    >
                                      Đã kích hoạt
                                    </Button>
                                  </TableCell>
                                );
                              }
                              if (value === 0) {
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    <Button variant="outlined" size="small" color="inherit" disabled>
                                      Chưa kích hoạt
                                    </Button>
                                  </TableCell>
                                );
                              }
                            }
                          }
                          {
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <WarningIcon color="secondary" /> Cảnh báo!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa Tài khoản không? Sau khi xóa sẽ không thể khôi phục.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary" variant="outlined">
            Trở về
          </Button>
          <Button onClick={handleAgreeDelete} color="primary" variant="outlined">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
