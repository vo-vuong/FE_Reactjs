import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 auto',
  },
}));
ListPage.propTypes = {};

function ListPage(props) {
  const classes = useStyles();

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>Left column </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>Right column </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
// Box cai ngoai cung Phan tich layout tu ngoai vao trong. tu trai sang phai
// trong Box co container de trong hai ben
// trong bosstrap co row column thi trong marial co grid
// Gird o ngoai la row, hai cai o trong column

export default ListPage;
