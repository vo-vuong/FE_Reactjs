import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form-controls/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function RegisterForm(props) {
  const classes = useStyles();

  const schema = yup
    .object({
      fullName: yup.string().required('Nhap fullname').min(3, 'fullName is too short'),
      // email: yup.string().required('Nhap email'),
      // password: yup.string().required('Nhap password'),
      // retypePassword: yup.string().required('Nhap retype password'),
    })
    .required();
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
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
    <div>
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <Typography component="h1" variant="h5">
        Sign up
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        {/* <InputField name="email" label="Email" form={form} />
        <InputField name="password" label="Password" form={form} />
        <InputField name="retypePassword" label="Retype Password" form={form} /> */}
      </form>
    </div>
  );
}

export default RegisterForm;
