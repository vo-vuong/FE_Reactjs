import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

ContentInfo.propTypes = {
  content: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: theme.spacing(2), borderBottom: `1px solid ${theme.palette.grey[200]}` },
  description: {
    margin: theme.spacing(2, 0),
  },
  priceBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  price: {
    marginRight: theme.spacing(2),
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
  },
  detail: {},
  quantity: {},
}));

function ContentInfo({ content = {} }) {
  const classes = useStyles();
  const { name, shortdescription } = content;

  return (
    <Box className={classes.root}>
      <Typography> {name}</Typography>
      <Typography>{shortdescription}</Typography>
    </Box>
  );
}

export default ContentInfo;
