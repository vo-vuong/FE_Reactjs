import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import categoryContentApi from 'api/categoryContentApi';
import axios from 'axios';
import InputField from 'components/form-controls/InputField';
import MultilineField from 'components/form-controls/MultilineField';
import ReactHookFormSelect from 'components/form-controls/SelectField';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

AccountDetail.propTypes = {
  content: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, marginLeft: '30px', marginTop: '40px', marginRight: '30px' },

  title: {
    width: '100%',
  },
  boxButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: '10px',
    marginLeft: '20px',
  },
  customInput: {
    marginTop: '16px',
    marginBottom: '8px',
  },
  number: {
    marginRight: '100px',
    paddingRight: '100px',
  },
}));

function AccountDetail(props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState();

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0] || props.content.url;
    previewFile(file);
    setSelectedFile(file);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object({
    password: yup
      .string()
      .required('Vui lòng nhập Mật khẩu.')
      .min(5, 'Vui lòng nhập Mật khẩu lớn hơn 5 kí tự.')
      .max(20, 'Vui lòng nhập Mật khẩu nhỏ hơn 20 kí tự.'),
    retypePassword: yup
      .string()
      .required('Vui lòng nhập Xác nhận mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp.'),
    fullname: yup
      .string()
      .required('Vui lòng nhập Họ và tên.')
      .min(8, 'Vui lòng nhập Họ và tên lớn hơn 8 kí tự.')
      .max(32, 'Vui lòng nhập Họ và tên nhỏ hơn 32 kí tự.'),
    email: yup.string().required('Vui lòng nhập email.').email('Vui lòng nhập Email hợp lệ.'),
    phone: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
    address: yup
      .string()
      .required('Vui lòng nhập Địa chỉ')
      .min(8, 'Vui lòng nhập Địa chỉ lớn hơn 8 kí tự.')
      .max(255, 'Vui lòng nhập Địa chỉ nhỏ hơn 255 kí tự.'),
  });

  const form = useForm({
    defaultValues: {
      name: props.content.name || '',
      categoryNews: props.content.categoryNews || '1',
      status: props.content.status + '' || '1',
      shortdescription: props.content.shortdescription || '',
      detail: props.content.detail || '',
      code: props.content.code || '',
      url: props.content.url || '',
    },

    resolver: yupResolver(schema),
  });

  const handleBack = () => {
    history.push('/admin/contents');
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
          id: props.content.id,
          url: url,
        };
        await onSubmit(object2);
      } else {
        const object2 = {
          ...values,
          id: props.content.id,
          url: props.content.url,
        };
        await onSubmit(object2);
      }
    }

    // history.push('/admin/contents');
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="name" label="Tên bài viết*" size="small" form={form} />
      <FormControl component="fieldset">
        <FormLabel component="legend">Trạng thái</FormLabel>
        <Controller
          rules={{ required: true }}
          control={form.control}
          name="status"
          as={
            <RadioGroup row>
              <FormControlLabel value="1" control={<Radio />} label="Hiện" />
              <FormControlLabel value="0" control={<Radio />} label="Ẩn" />
            </RadioGroup>
          }
        />
      </FormControl>
      <InputField name="shortdescription" label="Mô tả ngắn*" size="small" form={form} />
      <MultilineField name="detail" label="Mô tả chi tiết*" multiline rows={4} form={form} />
      <InputField name="code" label="Code*" size="small" form={form} />
      <img
        src={previewSource || props.content.url}
        className={classes.avatar}
        alt="Chọn file ảnh "
        style={{ height: '130px' }}
      />
      <input type="file" name="url" onChange={handleFileInputChange} accept="image/png, image/jpeg" />

      <Box className={classes.boxButton}>
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Cập nhật
        </Button>
        <Button variant="contained" color="inherit" onClick={handleBack} className={classes.button}>
          Trở về
        </Button>
      </Box>
    </form>
  );
}

export default AccountDetail;
