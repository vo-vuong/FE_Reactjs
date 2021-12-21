import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

RegisterForm.propTypes = {
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

function RegisterForm(props) {
  const classes = useStyles();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object({
    fullname: yup
      .string()
      .required('Vui lòng nhập Họ và tên.')
      .min(8, 'Vui lòng nhập Họ và tên lớn hơn 8 kí tự.')
      .max(32, 'Vui lòng nhập Họ và tên nhỏ hơn 32 kí tự.'),
    username: yup
      .string()
      .required('Vui lòng nhập Tên đăng nhập')
      .min(5, 'Vui lòng nhập Tên đăng nhập lớn hơn 5 kí tự.')
      .max(32, 'Vui lòng nhập Tên đăng nhập nhỏ hơn 32 kí tự.'),
    email: yup.string().required('Vui lòng nhập email.').email('Vui lòng nhập Email hợp lệ.'),
    phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
    address: yup
      .string()
      .required('Vui lòng nhập Địa chỉ')
      .min(8, 'Vui lòng nhập Địa chỉ lớn hơn 8 kí tự.')
      .max(255, 'Vui lòng nhập Địa chỉ nhỏ hơn 255 kí tự.'),
    password: yup
      .string()
      .required('Vui lòng nhập Mật khẩu.')
      .min(5, 'Vui lòng nhập Mật khẩu lớn hơn 5 kí tự.')
      .max(20, 'Vui lòng nhập Mật khẩu nhỏ hơn 20 kí tự.'),
    retypePassword: yup
      .string()
      .required('Vui lòng nhập Xác nhận mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp.'),
  });

  const form = useForm({
    defaultValues: {
      fullname: '',
      username: '',
      email: '',
      phone: '',
      address: '',
      sex: '1',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    console.log(values);
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
        Đăng kí
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullname" label="Họ và tên*" size="small" form={form} />
        <InputField name="username" label="Tên đăng nhập*" size="small" form={form} />
        <InputField name="email" label="Email*" size="small" form={form} />
        <InputField name="phone" label="Số điện thoại*" size="small" form={form} />
        <InputField name="address" label="Địa chỉ" size="small" form={form} />
        <FormControl component="fieldset">
          <FormLabel component="legend">Giới tính</FormLabel>
          <Controller
            rules={{ required: true }}
            control={form.control}
            name="sex"
            as={
              <RadioGroup row defaultValue="1">
                <FormControlLabel value="1" control={<Radio />} label="Nam" />
                <FormControlLabel value="0" control={<Radio />} label="Nữ" />
                <FormControlLabel value="2" control={<Radio />} label="Không xác định" />
              </RadioGroup>
            }
          />
        </FormControl>
        <PasswordField name="password" label="Mật khẩu*" form={form} />
        <PasswordField name="retypePassword" label="Xác nhận mật khẩu*" form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          fullWidth
          className={classes.submit}
          variant="contained"
          color="inherit"
        >
          Đăng kí
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
