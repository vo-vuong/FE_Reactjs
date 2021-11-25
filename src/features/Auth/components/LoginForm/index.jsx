import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  // return ra object nen co dau ngoac o ngoai
  root: {
    position: 'relative',
    paddingTop: theme.spacing(3),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main, //theme.palette lay bang mau trong theme material
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

function LoginForm(props) {
  const classes = useStyles();

  const schema = yup.object({
    username: yup
      .string()
      .required('Vui lòng nhập Tên đăng nhập')
      .min(5, 'Vui lòng nhập Tên đăng nhập lớn hơn 5 kí tự.')
      .max(32, 'Vui lòng nhập Tên đăng nhập nhỏ hơn 32 kí tự.'),
    password: yup
      .string()
      .required('Vui lòng nhập Mật khẩu.')
      .min(5, 'Vui lòng nhập Mật khẩu lớn hơn 5 kí tự.')
      .max(20, 'Vui lòng nhập Mật khẩu nhỏ hơn 20 kí tự.'),
  });

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }

    // form.reset();  Bo vi khi loi thi khong reset form  ma khi thanh cong thi dong form roi
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <Typography className={classes.title} component="h1" variant="h5">
        Đăng nhập
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="username" label="Tên đăng nhập*" form={form} />
        <PasswordField name="password" label="Mật khẩu*" form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          fullWidth
          className={classes.submit}
          variant="contained"
          color="primary"
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
