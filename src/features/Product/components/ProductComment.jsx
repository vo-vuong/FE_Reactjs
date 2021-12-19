import { Box, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import MultilineField from 'components/form-controls/MultilineField';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { formatDateTime } from 'utils/date';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

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

  const schema = yup.object({
    message: yup
      .string()
      .required('Vui lòng nhập Bình luận.')
      .min(5, 'Vui lòng nhập Bình luận lớn hơn 3 kí tự.')
      .max(255, 'Vui lòng nhập Bình luận nhỏ hơn 100 kí tự.'),
  });

  const form = useForm({
    defaultValues: {
      message: '',
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  // console.log(props.commentList);
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
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <MultilineField name="message" label="Bình luận về sản phẩm..." multiline rows={2} form={form} />
          <Button size="small" type="submit" variant="outlined" color="primary" className={classes.button}>
            Thêm
          </Button>
        </form>
      </Box>
    </Paper>
  );
}

export default ProductComment;
