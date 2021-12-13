import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import InputField from 'components/form-controls/InputField';
import InputNumberField from 'components/form-controls/InputNumberField';
import MultilineField from 'components/form-controls/MultilineField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

SimpleForm.propTypes = {
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

function SimpleForm(props) {
  const classes = useStyles();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object({
    name: yup
      .string()
      .required('Vui lòng nhập Tên sản phẩm.')
      .min(3, 'Vui lòng nhập Tên sản phẩm lớn hơn 3 kí tự.')
      .max(255, 'Vui lòng nhập Tên sản phẩm nhỏ hơn 255 kí tự.'),
    shortdescription: yup
      .string()
      .required('Vui lòng nhập Mô tả ngắn')
      .min(20, 'Vui lòng nhập Mô tả ngắn lớn hơn 20 kí tự.')
      .max(255, 'Vui lòng nhập Mô tả ngắn nhỏ hơn 255 kí tự.'),
    detail: yup
      .string()
      .required('Vui lòng nhập Mô tả chi tiết')
      .min(20, 'Vui lòng nhập Mô tả chi tiết lớn hơn 20 kí tự.'),
    price: yup.number().required('Vui lòng nhập giá.').min(0, 'Tối thiểu là 0.').typeError('Vui lòng nhập số.'),
    quantity: yup
      .number()
      .required('Vui lòng nhập số lượng sản phẩm.')
      .min(0, 'Tối thiểu là 0.')
      .max(1000, 'Tối đa là 1000 sản phẩm.')
      .typeError('Vui lòng nhập số.'),
    warranty: yup
      .number()
      .required('Vui lòng nhập Bảo hành sản phẩm.')
      .min(0, 'Tối thiểu là 0.')
      .max(100, 'Tối đa là 100 tháng bảo hành sản phẩm.')
      .typeError('Vui lòng nhập số.'),
    code: yup
      .string()
      .required('Vui lòng nhập Code.')
      .min(3, 'Vui lòng nhập Code lớn hơn 3 kí tự.')
      .max(255, 'Vui lòng nhập Code nhỏ hơn 255 kí tự.'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      shortdescription: '',
      detail: '',
      price: '',
      quantity: '',
      warranty: '',
      code: '',
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
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="name" label="Tên sản phẩm*" size="small" form={form} />
        <InputField name="shortdescription" label="Mô tả ngắn*" form={form} />
        <MultilineField name="detail" label="Mô tả chi tiết*" multiline rows={4} form={form} />
        <InputNumberField name="price" label="Giá*" size="small" form={form} />
        <InputNumberField name="quantity" label="Số lượng*" size="small" form={form} />
        <InputNumberField name="warranty" label="Bảo hành*" size="small" form={form} />
        <InputField name="code" label="Code*" size="small" form={form} />

        <Box className={classes.boxButton}>
          <Button disabled={isSubmitting} type="submit" fullWidth variant="contained" color="inherit">
            Đăng kí
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default SimpleForm;
