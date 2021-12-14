import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Container, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

ChangePassForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: '500px',
    paddingLeft: '500px',
    position: 'relative',
    paddingTop: theme.spacing(4),
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
  back: {
    marginBottom: '30px',
  },
}));

function ChangePassForm(props) {
  const classes = useStyles();
  const history = useHistory();

  const schema = yup.object({
    password: yup
      .string()
      .required('Vui lòng nhập Mật khẩu cũ.')
      .min(5, 'Vui lòng nhập Mật khẩu cũ lớn hơn 5 kí tự.')
      .max(20, 'Vui lòng nhập Mật khẩu cũ nhỏ hơn 20 kí tự.'),
    newPassword: yup
      .string()
      .required('Vui lòng nhập Mật khẩu mới.')
      .min(5, 'Vui lòng nhập Mật khẩu mới lớn hơn 5 kí tự.')
      .max(20, 'Vui lòng nhập Mật khẩu mới nhỏ hơn 20 kí tự.'),
    retypePassword: yup
      .string()
      .required('Vui lòng nhập Nhập lại mật khẩu.')
      .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp.'),
  });

  const form = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleBack = () => {
    history.push('/');
  };

  const { isSubmitting } = form.formState;

  return (
    <Container className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>

      <Typography className={classes.title} component="h1" variant="h5">
        Thay đổi mật khẩu
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <PasswordField name="password" label="Mật khẩu cũ*" form={form} />
        <PasswordField name="newPassword" label="Mật khẩu mới*" form={form} />
        <PasswordField name="retypePassword" label="Nhập lại mật khẩu mới*" form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          fullWidth
          className={classes.submit}
          variant="contained"
          color="inherit"
        >
          Xác nhận
        </Button>
        <Button
          onClick={handleBack}
          className={classes.back}
          disabled={isSubmitting}
          fullWidth
          variant="contained"
          color="inherit"
        >
          Trở về
        </Button>
      </form>
    </Container>
  );
}

export default ChangePassForm;
