import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import { React } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

FormCategory.propTypes = {
  category: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
    paddingBottom: '20px',
    display: 'flex',
  },
}));

function FormCategory(category) {
  const classes = useStyles();

  const schema = yup.object({
    name: yup
      .string()
      .required('Vui lòng nhập Tên danh mục sản phẩm.')
      .min(5, 'Vui lòng nhập Tên danh mục sản phẩm lớn hơn 5 kí tự.')
      .max(255, 'Vui lòng nhập Tên danh mục sản phẩm nhỏ hơn 255 kí tự.'),
    code: yup
      .string()
      .required('Vui lòng nhập Mã định danh.')
      .min(5, 'Vui lòng nhập Mã định danh lớn hơn 5 kí tự.')
      .max(255, 'Vui lòng nhập Mã định danh nhỏ hơn 255 kí tự.'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      code: '',
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = category;
    if (onSubmit) {
      await onSubmit(values);
    }

    form.reset();
  };

  return (
    <form className={classes.root} onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="name" label="Tên danh mục*" form={form} />
      <InputField name="code" label="Mã định danh*" form={form} />

      <Button size="large" type="submit" fullWidth className={classes.submit} variant="contained" color="inherit">
        Tạo mới danh mục
      </Button>
    </form>
  );
}

export default FormCategory;
