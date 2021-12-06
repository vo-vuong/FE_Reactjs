import { Box, Grid, makeStyles } from '@material-ui/core';
import HeaderAdmin from 'components/HeaderAdmin';
import MenuAdmin from 'components/MenuAdmin';
import React from 'react';

HomeAdminPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  menu: {
    backgroundColor: theme.palette.grey[200],
    width: 230,
  },
}));

function HomeAdminPage(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <HeaderAdmin />
      <MenuAdmin></MenuAdmin>
      <Box>
        <Grid container></Grid>
      </Box>
    </React.Fragment>
  );
}

export default HomeAdminPage;
