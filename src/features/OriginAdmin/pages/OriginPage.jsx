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
import WarningIcon from '@material-ui/icons/Warning';
import originApi from 'api/originApi';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { formatDateTime } from 'utils/date';
import FormCategory from '../components/FormCategory';
import FormCategoryUpdate from '../components/FormCategoryUpdate';

OriginPage.propTypes = {};

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

function OriginPage(props) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [category, setCategory] = useState({});
  const [editCategoryId, setEditCategorytId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [idOrigin, setIdOrigin] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await originApi.getAll();
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
        const result = await originApi.removeAdmin(idOrigin);
        enqueueSnackbar(result.message, { variant: 'success' });
        const newCategoryList = [...categoryList];
        const index = categoryList.findIndex((row) => row.id === idOrigin);
        newCategoryList.splice(index, 1);
        setCategoryList(newCategoryList);
        setIdOrigin();
        setOpen(false);
      } catch (error) {
        enqueueSnackbar('Kh??ng th??? x??a xu???t x???.', { variant: 'error' });
      }
    })();
  };

  const handleDelete = (id) => {
    setIdOrigin(id);
    setOpen(true);
  };

  const handleCreateCategory = async (values) => {
    try {
      const { message, object } = await originApi.addAdmin(values);
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
      const { message, object } = await originApi.updateAdmin(values);
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
              Trang xu???t x???
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {editCategoryId ? (
            <React.Fragment>
              <FormCategoryUpdate category={category} onSubmit={handleUpdateCategory} />
              <Button variant="contained" size="small" style={{ color: green[500] }} onClick={() => handleReset()}>
                H???y c???p nh???t
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
                  <StyledTableCell align="right">ID</StyledTableCell>
                  <StyledTableCell align="right">T??n danh m???c</StyledTableCell>
                  <StyledTableCell align="right">Code</StyledTableCell>
                  <StyledTableCell align="right">???????c t???o b???i</StyledTableCell>
                  <StyledTableCell align="right">Ng??y t???o</StyledTableCell>
                  <StyledTableCell align="right">T??y ch???n</StyledTableCell>
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
                    <StyledTableCell align="right">
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
          <WarningIcon color="secondary" /> C???nh b??o!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            B???n c?? ch???c ch???n mu???n x??a Xu???t x??? kh??ng? Sau khi x??a s??? kh??ng th??? kh??i ph???c.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary" variant="outlined">
            Tr??? v???
          </Button>
          <Button onClick={handleAgreeDelete} color="primary" variant="outlined">
            ?????ng ??
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default OriginPage;
