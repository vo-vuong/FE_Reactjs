import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import DOMPurify from 'dompurify';

ContentDescription.propTypes = {
  content: PropTypes.object,
};

function ContentDescription({ content = {} }) {
  const safeDetail = DOMPurify.sanitize(content.detail);

  return (
    <Paper elevation={0} style={{ padding: '15px' }}>
      <div dangerouslySetInnerHTML={{ __html: safeDetail }} />
    </Paper>
  );
}

export default ContentDescription;
