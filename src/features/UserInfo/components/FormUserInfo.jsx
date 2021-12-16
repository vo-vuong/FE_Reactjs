import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

FormUserInfo.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: '400px',
    paddingLeft: '400px',
    position: 'relative',
    paddingTop: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(1, 0, 1, 0),
    textAlign: 'center',
  },
  avatar: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    // width: '30%',
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
  form: {
    minWidth: '500px',
    position: 'relative',
  },
  avatarbody: {
    position: 'relative',
    display: 'inline',
  },
}));

function FormUserInfo(props) {
  const classes = useStyles();
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object({
    fullname: yup
      .string()
      .required('Vui lòng nhập Họ và tên.')
      .min(8, 'Vui lòng nhập Họ và tên lớn hơn 8 kí tự.')
      .max(32, 'Vui lòng nhập Họ và tên nhỏ hơn 32 kí tự.'),
    phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
    address: yup.string().max(255, 'Vui lòng nhập Địa chỉ nhỏ hơn 255 kí tự.'),
    password: yup
      .string()
      .required('Vui lòng nhập Mật khẩu.')
      .min(5, 'Vui lòng nhập Mật khẩu lớn hơn 5 kí tự.')
      .max(20, 'Vui lòng nhập Mật khẩu nhỏ hơn 20 kí tự.'),
  });

  const form = useForm({
    defaultValues: {
      url: props.userInfo.url || '',
      fullname: props.userInfo.fullname || '',
      phone: props.userInfo.phone || '',
      address: props.userInfo.address || '',
      sex: props.userInfo.sex + '' || '1',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0] || props.userInfo.url;
    previewFile(file);
    setSelectedFile(file);
  };

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    let url = '';
    if (onSubmit) {
      if (previewSource) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'hjgraqmi');

        await axios.post('https://api.cloudinary.com/v1_1/dxsewj5df/image/upload', formData).then((response) => {
          url = response.data.url;
        });

        const object2 = {
          ...values,
          url: url,
        };
        await onSubmit(object2);
      } else {
        await onSubmit(values);
      }
    }
  };

  const handleBack = () => {
    history.push('/');
  };

  const { isSubmitting } = form.formState;

  return (
    <Container className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
        <Typography className={classes.title} component="h1" variant="h5">
          Quản lý thông tin cá nhân
        </Typography>
        <div className={classes.avatarbody}>
          <img
            src={previewSource || props.userInfo.url}
            className={classes.avatar}
            alt="chosen"
            style={{ height: '130px' }}
          />
          <input
            type="file"
            name="image"
            onChange={handleFileInputChange}
            className={classes.avatar}
            accept="image/png, image/jpeg"
          />
        </div>
        <InputField name="fullname" label="Họ và tên*" size="small" form={form} />
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

export default FormUserInfo;
