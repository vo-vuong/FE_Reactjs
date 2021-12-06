import { Box, Grid, makeStyles } from '@material-ui/core';
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
      <Box>
        <Grid container></Grid>
      </Box>
    </React.Fragment>
  );
}

export default HomeAdminPage;
