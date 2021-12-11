import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, makeStyles } from '@material-ui/core';
import InputField from 'components/form-controls/InputField';
import InputNumberField from 'components/form-controls/InputNumberField';
import MultilineField from 'components/form-controls/MultilineField';
import PropTypes from 'prop-types';
import { React } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

ProductForm.propTypes = {
  onSubmit: PropTypes.func,
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
}));

function ProductForm(props) {
  const classes = useStyles();
  const history = useHistory();

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
    price: yup.number().required().positive().integer(),
    originId: yup.number().required().positive().integer(),
    quantity: yup.number().required().positive().integer(),
    code: yup
      .string()
      .required('Vui lòng nhập Code.')
      .min(5, 'Vui lòng nhập Code lớn hơn 5 kí tự.')
      .max(255, 'Vui lòng nhập Code nhỏ hơn 255 kí tự.'),
    status: yup.number().required().positive().integer(),
    categoryId: yup.number().required('Vui lòng nhập Danh mục sản phẩm.').positive().integer(),
    warranty: yup.number().required('Vui lòng nhập Bảo hành sản phẩm.').positive().integer(),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      shortdescription: '',
      detail: '',
      price: '',
      originId: '',
      quantity: '',
      code: '',
      status: '',
      categoryId: '',
      warranty: '',
    },

    resolver: yupResolver(schema),
  });

  const handleBack = () => {
    history.push('/admin/product');
  };

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }

    // form.reset();  Bo vi khi loi thi khong reset form  ma khi thanh cong thi dong form roi
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="name" label="Tên sản phẩm*" size="small" form={form} />
      <InputField name="shortdescription" label="Mô tả ngắn*" size="small" form={form} />
      <MultilineField name="detail" label="Mô tả chi tiết*" multiline rows={4} form={form} />
      <InputNumberField name="price" label="Giá*" size="small" form={form} />
      <InputField name="originId" label="Xuất xứ*" form={form} />
      <InputNumberField name="quantity" label="Số lượng*" size="small" form={form} />
      <InputField name="code" label="Code*" form={form} />
      <InputField name="status" label="Trạng thái*" form={form} />
      <InputField name="categoryId" label="Danh mục sản phẩm*" form={form} />
      <InputNumberField name="warranty" label="Bảo hành*" size="small" form={form} />

      <Box className={classes.boxButton}>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>
          Tạo mới
        </Button>
        <Button variant="contained" color="inherit" onClick={handleBack} className={classes.button}>
          Trở về
        </Button>
      </Box>
    </form>
  );
}

export default ProductForm;
