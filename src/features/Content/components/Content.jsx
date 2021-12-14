import { Box, Typography } from '@material-ui/core';
import { STATIC_IMAGE } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';

Content.propTypes = {
  content: PropTypes.object,
};

function Content({ content }) {
  const thumbnailUrl = content.url ? content.url : STATIC_IMAGE;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/contents/${content.id}`);
  };
  return (
    <Box padding={1} onClick={handleClick}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={content.name} width="100%"></img>
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
