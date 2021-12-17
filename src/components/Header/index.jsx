import { Badge, Box, Container, InputBase, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import AlbumIcon from '@material-ui/icons/Album';
import SearchIcon from '@material-ui/icons/Search';
import ForgotPass from 'features/Auth/components/ForgotPass';
import Login from 'features/Auth/components/Login';
import { logout } from 'features/Auth/userSlice';
import { cartItemsCountSelector } from 'features/Cart/selectors';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Register from '../../features/Auth/components/Register';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: theme.palette.grey[900],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOTPASS: 'forgotpass',
};

export default function Header() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const history = useHistory();
  const isLoggedIn = !!loggedInUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setMode(MODE.LOGIN);
      setOpen(false);
    }
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUserInfoPage = () => {
    history.push('/user-info');
    setAnchorEl(null);
  };

  const handleChangePassClick = () => {
    history.push('/changepassword');
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    setAnchorEl(null);
    history.push('/');
  };

  const handleCartClick = () => {
    history.push('/cart');
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Container>
          <Toolbar>
            <AlbumIcon />
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to="/">
                16Musical
              </Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Tìm kiếm..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {!isLoggedIn && (
              <Button color="inherit" onClick={handleClickOpen}>
                Đăng nhập
              </Button>
            )}

            {isLoggedIn && (
              <>
                <IconButton color="inherit" onClick={handleCartClick}>
                  <Badge badgeContent={cartItemsCount} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <Typography>{loggedInUser.fullname}</Typography>
              </>
            )}

            {isLoggedIn && (
              <IconButton color="inherit" onClick={handleUserClick}>
                <AccountCircle />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleUserInfoPage}>Tài khoản của tôi</MenuItem>
        <MenuItem onClick={handleChangePassClick}>Thay đổi mật khẩu</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                  Bạn đã có tài khoản? Đăng nhập ở đây.
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                  Bạn chưa có tài khoản? Đăng kí ở đây.
                </Button>
              </Box>
              <Box textAlign="center">
                <Button color="primary" onClick={() => setMode(MODE.FORGOTPASS)}>
                  Quên mật khẩu?
                </Button>
              </Box>
            </>
          )}

          {mode === MODE.FORGOTPASS && (
            <>
              <ForgotPass closeDialog={handleClose} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
