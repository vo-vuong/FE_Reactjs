import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { formatDateTime } from 'utils/date';

ProductComment.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  title: {
    borderBottom: 'solid 1px black',
    width: '100%',
  },
  boxComment: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  },
  userImage: {
    backgroundSize: 'content',
    width: '50px',
    height: '50px',
  },
  boxRight: { marginLeft: '10px' },
  username: {
    fontWeight: '50px',
    fontSize: '18px',
  },
  boxInfo: { display: 'flex', alignItems: 'center' },
  timer: {
    marginLeft: '20px',
    color: '#aaa',
  },
  replly: {
    fontSize: '12px',
    color: '#aaa',
    padding: '2px 4px',
  },
}));

function ProductComment(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  // const thumbnailUrl = props.product.images > 0 ? props.product.images[0]?.url : STATIC_IMAGE;

  console.log(props.commentList);
  return (
    <Paper elevation={0} style={{ padding: '15px' }}>
      <Typography component="h3" variant="h6" color="inherit" className={classes.title}>
        Bình luận sản phẩm:
      </Typography>
      <Box>
        {props.commentList.map((item) => (
          <Box key={item.id} className={classes.boxComment}>
            <img src={item.user.url} className={classes.userImage} />
            <Box className={classes.boxRight}>
              <Box className={classes.boxInfo}>
                <Typography className={classes.username}>{item.user.fullname}</Typography>
                <span className={classes.timer}>{formatDateTime(item.createdDate)}</span>
              </Box>

              <span>{item.message}</span>
              <Typography className={classes.replly}>Trả lời</Typography>
            </Box>
          </Box>
        ))}
        {/* <img src={props.commentList.user.url} /> */}
      </Box>
    </Paper>
  );
}

export default ProductComment;
