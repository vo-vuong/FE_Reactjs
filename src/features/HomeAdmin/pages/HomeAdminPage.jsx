import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
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
        <Grid container>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h4" component="h3" className={classes.title}>
                Trang chủ sẽ được cập nhật sau.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default HomeAdminPage;
