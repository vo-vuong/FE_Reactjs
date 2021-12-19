import { Box, Link, makeStyles } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
    listStyleType: 'none',

    '& > li': {
      padding: theme.spacing(1, 2),
    },

    '& > li > a': {
      padding: theme.spacing(1, 2),
      color: theme.palette.grey[700],
    },

    '& > li > a.active': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      backgroundColor: theme.palette.grey[300],
    },
  },
}));

function ProductMenu(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>
          Mô tả dài
        </Link>
      </li>

      <li>
        <Link component={NavLink} to={`${url}/evaluation`} exact>
          Đánh giá
        </Link>
      </li>

      <li>
        <Link component={NavLink} to={`${url}/comment`} exact>
          Bình luận
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
