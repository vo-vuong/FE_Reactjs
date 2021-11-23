import { Avatar, Button, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  // return ra object nen co dau ngoac o ngoai
  root: {
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
}));

function RegisterForm(props) {
  const classes = useStyles();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object({
    // .test('Vui lòng nhập trên hai từ', 'Vui lòng nhập trên hai từ', (value) => {
    //   return value.split(' ').length >= 4;
    // }), // Tra ve true la valid tra ve false invalid.
    // username: yup.string().required('Nhap username').min(5, )
    fullName: yup
      .string()
      .required('Vui lòng nhập full name.')
      .min(8, 'Vui lòng nhập full name lớn hơn 8 kí tự.')
      .max(32, 'Vui lòng nhập full name nhỏ hơn 32 kí tự.'),
    username: yup
      .string()
      .required('Vui lòng nhập username')
      .min(5, 'Vui lòng nhập username lớn hơn 5 kí tự.')
      .max(32, 'Vui lòng nhập username nhỏ hơn 32 kí tự.'),
    email: yup.string().required('Vui lòng nhập email.').email('Vui lòng nhập email hợp lệ.'),
    phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
    password: yup
      .string()
      .required('Vui lòng nhập password.')
      .min(5, 'Vui lòng nhập password lớn hơn 5 kí tự.')
      .max(20, 'Vui lòng nhập password nhỏ hơn 20 kí tự.'),
    retypePassword: yup
      .string()
      .required('Vui lòng nhập retype password')
      .oneOf([yup.ref('password')], 'Password không khớp.'),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }

    form.reset();
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <Typography className={classes.title} component="h1" variant="h5">
        Sign up
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="username" label="username" form={form} />
        <InputField name="email" label="Email" form={form} />
        <InputField name="phone" label="phone" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />

        <Button type="submit" fullWidth className={classes.submit} variant="contained" color="primary">
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
