import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import MultilineField from 'components/form-controls/MultilineField';
import { STATIC_IMAGE_AVATAR } from 'constants/index';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatDateTime } from 'utils/date';
import * as yup from 'yup';

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
  boxCommentReplly: { display: 'flex', alignItems: 'center', padding: theme.spacing(0, 0, 0, 4) },
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
  const [commentSubmit, setCommentSubmit] = useState('Thêm');
  const [commentRepllyId, setCommentRepllyId] = useState();

  const schema = yup.object({
    message: yup
      .string()
      .required('Vui lòng nhập Bình luận.')
      .min(3, 'Vui lòng nhập Bình luận lớn hơn 3 kí tự.')
      .max(100, 'Vui lòng nhập Bình luận nhỏ hơn 100 kí tự.'),
  });

  const form = useForm({
    defaultValues: {
      message: '',
    },

    resolver: yupResolver(schema),
  });

  const handleReplly = (item) => {
    setCommentRepllyId(item.id);
    setCommentSubmit('Trả lời ' + item.user.fullname);
    // console.log(item);
  };

  const handleSubmit = async (values) => {
    const { onSubmit } = props;

    if (onSubmit) {
      if (commentRepllyId) {
        await onSubmit({ ...values, commentId: commentRepllyId });
      } else {
        console.log(props.productId);
        await onSubmit({ ...values, productId: props.productId });
      }
    }
    setCommentSubmit('Thêm');
    setCommentRepllyId();
    form.reset();
  };

  // console.log(props.commentList);
  return (
    <Paper elevation={0} style={{ padding: '15px' }}>
      <Typography component="h3" variant="h6" color="inherit" className={classes.title}>
        Bình luận sản phẩm:
      </Typography>
      <Box>
        {props.commentList.map((item) => (
          <div key={item.id}>
            <Box className={classes.boxComment}>
              <img src={item.user.url || STATIC_IMAGE_AVATAR} className={classes.userImage} />
              <Box className={classes.boxRight}>
                <Box className={classes.boxInfo}>
                  <Typography className={classes.username}>{item.user.fullname}</Typography>
                  <span className={classes.timer}>{formatDateTime(item.createdDate)}</span>
                </Box>

                <span>{item.message}</span>
                <Typography className={classes.replly} onClick={() => handleReplly(item)}>
                  Trả lời
                </Typography>
              </Box>
            </Box>
            {item.commentReply.map((itemReplly) => (
              <Box key={itemReplly.id} className={classes.boxCommentReplly}>
                <img src={itemReplly.user.url || STATIC_IMAGE_AVATAR} className={classes.userImage} />
                <Box className={classes.boxRight}>
                  <Box className={classes.boxInfo}>
                    <Typography className={classes.username}>{itemReplly.user.fullname}</Typography>
                    <span className={classes.timer}>{formatDateTime(itemReplly.createdDate)}</span>
                  </Box>

                  <span>{itemReplly.message}</span>
                  <Typography className={classes.replly} onClick={() => handleReplly(item)}>
                    Trả lời
                  </Typography>
                </Box>
              </Box>
            ))}
          </div>
        ))}
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <MultilineField name="message" label="Bình luận về sản phẩm..." multiline rows={2} form={form} />
          <Button size="small" type="submit" variant="outlined" color="primary" className={classes.button}>
            {commentSubmit}
          </Button>
        </form>
      </Box>
    </Paper>
  );
}

export default ProductComment;
