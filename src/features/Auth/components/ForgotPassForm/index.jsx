import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

ForgotPassForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(3),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: '0 auto',
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },

  submit: {
    margin: theme.spacing(2, 0, 2, 0),
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function ForgotPassForm(props) {
  const classes = useStyles();

  const schema = yup.object({
    email: yup.string().required('Vui lòng nhập email.').email('Vui lòng nhập Email hợp lệ.'),
  });

  const form = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <Typography className={classes.title} component="h1" variant="h5">
        Quên mật khẩu?
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="email" label="Email*" size="small" form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          fullWidth
          className={classes.submit}
          variant="contained"
          color="inherit"
        >
          Gửi lại mật khẩu
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassForm;
