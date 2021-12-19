import { Box, makeStyles, Typography } from '@material-ui/core';
import { STATIC_IMAGE } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';

Content.propTypes = {
  content: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  contentImage: {
    backgroundSize: 'content',
    width: '100%',
    height: '300px',
  },
}));

function Content({ content }) {
  const classes = useStyles();
  const thumbnailUrl = content.url ? content.url : STATIC_IMAGE;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/contents/${content.id}`);
  };
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={content.name} className={classes.contentImage}></img>
      </Box>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {content.name}
        </Box>
      </Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px">
          {content.shortdescription}
        </Box>
      </Typography>
    </Box>
  );
}

export default Content;
