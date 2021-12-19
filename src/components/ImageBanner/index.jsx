import { Grid, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import { React } from 'react';
import PropTypes from 'prop-types';

ImageBanner.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  linkText: PropTypes.string,
  style: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  mainFeaturedPost: {
    // width: '100%',
    // height: '50vh',
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    backgroundImage:
      'url(https://images.pexels.com/photos/290660/pexels-photo-290660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)',
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

function ImageBanner({ title, description, linkText, link, style }) {
  const classes = useStyles();

  return (
    <Paper className={classes.mainFeaturedPost} style={style}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} alt="test" src="https://source.unsplash.com/random" />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {description}
            </Typography>
            <Link variant="subtitle1" href={link}>
              {linkText}
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ImageBanner;
