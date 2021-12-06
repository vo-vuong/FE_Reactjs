import { ListItemIcon, makeStyles, MenuItem, MenuList, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShopTwoIcon from '@material-ui/icons/ShopTwo';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React from 'react';
import { useHistory } from 'react-router';

MenuAdmin.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    width: '280px',
    height: '100vh',
    paddingTop: '50px',
  },
}));

function MenuAdmin(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleHomeClick = () => {
    history.push('/admin');
  };

  const handleListCategoryClick = () => {
    history.push('/admin/product-category');
  };

  const handleListProductClick = () => {
    history.push('/admin/product');
  };

  return (
    <Paper className={classes.root}>
      <MenuList>
        <MenuItem dense={true} onClick={handleHomeClick}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Trang chủ</Typography>
        </MenuItem>
        <MenuItem onClick={handleListCategoryClick}>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Danh mục sản phẩm</Typography>
        </MenuItem>
        <MenuItem onClick={handleListProductClick}>
          <ListItemIcon>
            <ShopTwoIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Sản phẩm</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Danh mục bài viết</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LibraryBooksIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Bài viết</Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SupervisorAccountIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Tài khoản</Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default MenuAdmin;
