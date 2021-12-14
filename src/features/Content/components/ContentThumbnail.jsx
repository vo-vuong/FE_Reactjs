import { Box } from '@material-ui/core';
import { STATIC_IMAGE } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';

ContentThumbnail.propTypes = {
  content: PropTypes.object,
};

function ContentThumbnail({ content }) {
  const thumbnailUrl = content.url ? content?.url : STATIC_IMAGE; // dang nho

  return (
    <Box>
      <img src={thumbnailUrl} alt={content.name} width="100%" />
    </Box>
  );
}

export default ContentThumbnail;
