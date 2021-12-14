import { Box, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Content from './Content';

ContentList.propTypes = {
  data: PropTypes.array,
};

ContentList.defaultProps = {
  data: [],
};

function ContentList({ data }) {
  console.log(data);

  return (
    <Box>
      <Grid container>
        {data.map((content) => (
          <Grid item key={content.id} xs={12} sm={6} md={6} lg={6}>
            <Content content={content} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ContentList;
