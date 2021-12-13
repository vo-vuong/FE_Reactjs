import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import { React } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

ProductDetail.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, marginLeft: '30px', marginTop: '40px', marginRight: '30px' },

  title: {
    width: '100%',
  },
}));

function ProductDetail({ product }) {
  const classes = useStyles();

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
  console.log(product);
  const form = useForm({
    defaultValues: {
      name: product.name,
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
  const handleSubmit = () => {};
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <input value={product.name}></input>
      <InputField name="name" label="Tên sản phẩm*" form={form} />
      <InputField name="shortdescription" label="Mô tả ngắn*" form={form} />
      <InputField name="detail" label="Mô tả chi tiết*" form={form} />
      <InputField name="price" label="Giá*" form={form} />
      <InputField name="originId" label="Xuất xứ*" form={form} />
      <InputField name="quantity" label="Số lượng*" form={form} />
      <InputField name="code" label="Code*" form={form} />
      <InputField name="status" label="Trạng thái*" form={form} />
      <InputField name="categoryId" label="Danh mục sản phẩm*" form={form} />
      <InputField name="warranty" label="Bảo hành*" form={form} />

      <Button type="submit" fullWidth className={classes.submit} variant="contained" color="inherit">
        Cập nhật
      </Button>
    </form>
  );
}

export default ProductDetail;
