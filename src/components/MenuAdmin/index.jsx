import { ListItemIcon, makeStyles, MenuItem, MenuList, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShopTwoIcon from '@material-ui/icons/ShopTwo';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import PublicIcon from '@material-ui/icons/Public';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

MenuAdmin.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    // width: '300px',
    height: '100vh',
    paddingTop: '50px',

    '& a': {
      color: theme.palette.grey[700],
      textDecoration: 'underline',
      textDecoration: 'none',
    },

    '& a.active': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.grey[700],
    },
  },
}));

function MenuAdmin(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();

  return (
    <Paper className={classes.root}>
      <MenuList>
        <NavLink exact to={`${url}`}>
          <MenuItem>
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Trang chủ</Typography>
          </MenuItem>
        </NavLink>

        <NavLink to={`${url}/product-category`}>
          <MenuItem>
            <ListItemIcon>
              <ListAltIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Danh mục sản phẩm</Typography>
          </MenuItem>
        </NavLink>

        <NavLink to={`${url}/product`}>
          <MenuItem>
            <ListItemIcon>
              <ShopTwoIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Sản phẩm</Typography>
          </MenuItem>
        </NavLink>

        <NavLink to={`${url}/contents-category`}>
          <MenuItem>
            <ListItemIcon>
              <ListAltIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Danh mục bài viết</Typography>
          </MenuItem>
        </NavLink>

        <NavLink to={`${url}/contents`}>
          <MenuItem>
            <ListItemIcon>
              <LibraryBooksIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Bài viết</Typography>
          </MenuItem>
        </NavLink>

        <NavLink to={`${url}/origins`}>
          <MenuItem>
            <ListItemIcon>
              <PublicIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Xuất xứ</Typography>
          </MenuItem>
        </NavLink>

        <NavLink to={`${url}/carts`}>
          <MenuItem>
            <ListItemIcon>
              <TrendingUpIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Quản lý đơn đặt hàng</Typography>
          </MenuItem>
        </NavLink>

        <NavLink to={`${url}/accounts`}>
          <MenuItem>
            <ListItemIcon>
              <SupervisorAccountIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Tài khoản</Typography>
          </MenuItem>
        </NavLink>
      </MenuList>
    </Paper>
  );
}

export default MenuAdmin;
