import { Box, Grid, makeStyles } from '@material-ui/core';
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
      <MenuAdmin></MenuAdmin>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={2} className={classes.menu}>
            {/* <Paper className={classes.paper}>xs=6</Paper> */}
            <Box>a</Box>
          </Grid>
          <Grid item xs={10}>
            a
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default HomeAdminPage;
