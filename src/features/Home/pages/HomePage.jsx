import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Link, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  mainFeaturedPost: {
    width: '100%',
    height: '50vh',
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

HomePage.propTypes = {};

function HomePage({ post }) {
  const classes = useStyles();

  return (
    <Box>
      <Container>
        <Grid container>
          <Paper className={classes.mainFeaturedPost}>
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src="https://source.unsplash.com/random" />}
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    post.title
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    post.description
                  </Typography>
                  <Link variant="subtitle1" href="#">
                    post.linkText
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
}
// Box cai ngoai cung Phan tich layout tu ngoai vao trong. tu trai sang phai
// trong Box co container de trong hai ben
// trong bosstrap co row column thi trong marial co grid
// Gird o ngoai la row, hai cai o trong column

export default HomePage;
