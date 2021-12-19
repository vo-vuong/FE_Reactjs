import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function InfoPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box>
      <Container className={classes.root}>
        <Grid container spacing={1}>
          Làm ở đây
        </Grid>
      </Container>
    </Box>
  );
}

export default InfoPage;
