import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

ContentInfo.propTypes = {
  content: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: theme.spacing(2), borderBottom: `1px solid ${theme.palette.grey[200]}`, margin: '0 20px' },
  name: { fontSize: '20px' },
  shortdescription: { color: '#333' },
}));

function ContentInfo({ content = {} }) {
  const classes = useStyles();
  const { name, shortdescription } = content;

  return (
    <Box className={classes.root}>
      <Typography className={classes.name}> {name}</Typography>
      <Typography className={classes.shortdescription}>{shortdescription}</Typography>
    </Box>
  );
}

export default ContentInfo;
