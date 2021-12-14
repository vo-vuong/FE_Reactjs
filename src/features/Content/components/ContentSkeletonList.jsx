import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

ContentSkeletonList.propTypes = {
  length: PropTypes.number,
};

ContentSkeletonList.defaultProps = {
  length: 12,
};

function ContentSkeletonList({ length }) {
  return (
    <Box>
      <Grid container>
        {Array.from(new Array(length)).map((x, index) => (
          <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
            <Box padding={1}>
              <Skeleton variant="rect" width="100%" height={215}></Skeleton>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  // <Grid container> Xem lai tai sao co container no lai chia ra hang ngang dc
}

export default ContentSkeletonList;
