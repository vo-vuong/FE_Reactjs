import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import LoginAdmin from './components/LoginAdmin';

Auth.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    marginLeft: '40%',
    marginRight: '40%',
    width: '20%',
    minWidth: '300px',
    marginTop: '150px',
  },
  header: {
    backgroundColor: theme.palette.grey[900],
  },
}));

function Auth(props) {
  const classes = useStyles();
  const match = useRouteMatch();
  return (
    <Box className={classes.root}>
      <Switch>
        <Route path={match.url} exact component={LoginAdmin} />
      </Switch>
    </Box>
  );
}

export default Auth;
