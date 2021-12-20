import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import categoryContentApi from 'api/categoryContentApi';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { formatDateTime } from 'utils/date';
import FormCategory from '../components/FormCategory';
import FormCategoryUpdate from '../components/FormCategoryUpdate';

ContentCategoryPage.propTypes = {};

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
  forminput: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
    marginBottom: '20px',
  },
}));

function ContentCategoryPage(props) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [category, setCategory] = useState({});
  const [editCategoryId, setEditCategorytId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [idCategory, setIdCategory] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryContentApi.getAll();
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
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    })();
  }, []);

  const handleAgreeDelete = () => {
    (async () => {
      try {
        const result = await categoryContentApi.removeAdmin(idCategory);
        enqueueSnackbar(result.message, { variant: 'success' });
        const newCategoryList = [...categoryList];
        const index = categoryList.findIndex((row) => row.id === idCategory);
        newCategoryList.splice(index, 1);
        setCategoryList(newCategoryList);
        setIdCategory();
        setOpen(false);
      } catch (error) {
        enqueueSnackbar('Không thể xóa danh mục bài viết.', { variant: 'error' });
      }
    })();
  };

  const handleDelete = (id) => {
    setIdCategory(id);
    setOpen(true);
  };

  const handleCreateCategory = async (values) => {
    try {
      const { message, object } = await categoryContentApi.addAdmin(values);
      enqueueSnackbar(message, { variant: 'success' });
      const newCategory = {
        id: object.id,
        name: object.name,
        code: object.code,
        createdBy: object.createdBy,
        createdDate: object.createdDate,
      };
      const newCategorys = [...categoryList, newCategory];

      setCategoryList(newCategorys);
      setEditCategorytId(null);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleUpdate = (item) => {
    setEditCategorytId(item.id);
    setCategory(item);
  };

  const handleUpdateCategory = async (values) => {
    try {
      const { message, object } = await categoryContentApi.updateAdmin(values);
      enqueueSnackbar(message, { variant: 'success' });
      const editCategory = {
        id: object.id,
        name: object.name,
        code: object.code,
        createdBy: object.createdBy,
        createdDate: object.createdDate,
      };
      const newCategorys = [...categoryList];
      const index = categoryList.findIndex((category) => category.id === object.id);
      newCategorys[index] = editCategory;

      setCategoryList(newCategorys);
      setEditCategorytId(null);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleReset = () => {
    setEditCategorytId(null);
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" component="h3" className={classes.title}>
              Trang danh mục bài viết
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {editCategoryId ? (
            <React.Fragment>
              <FormCategoryUpdate category={category} onSubmit={handleUpdateCategory} />
              <Button variant="contained" size="small" style={{ color: green[500] }} onClick={() => handleReset()}>
                Hủy cập nhật
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FormCategory onSubmit={handleCreateCategory} />
            </React.Fragment>
          )}
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Tên danh mục</StyledTableCell>
                  <StyledTableCell align="center">Code</StyledTableCell>
                  <StyledTableCell align="center">Được tạo bởi</StyledTableCell>
                  <StyledTableCell align="center">Ngày tạo</StyledTableCell>
                  <StyledTableCell align="center">Tùy chọn</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryList.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell align="center" scope="row">
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">{item.name}</StyledTableCell>
                    <StyledTableCell align="center">{item.code}</StyledTableCell>
                    <StyledTableCell align="center">{item.createdBy}</StyledTableCell>
                    <StyledTableCell align="center">{formatDateTime(item.createdDate)}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => handleUpdate(item)}
                        variant="outlined"
                        size="small"
                        color="primary"
                        style={{ marginRight: '5px' }}
                      >
                        update
                      </Button>
                      <Button variant="outlined" size="small" color="secondary" onClick={() => handleDelete(item.id)}>
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Cảnh báo!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa danh mục không? Sau khi xóa sẽ không thể khôi phục.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Trở về
          </Button>
          <Button onClick={handleAgreeDelete} color="primary">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ContentCategoryPage;
