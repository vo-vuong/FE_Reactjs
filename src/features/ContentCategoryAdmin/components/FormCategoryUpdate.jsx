import { yupResolver } from '@hookform/resolvers/yup';
import { Button, makeStyles } from '@material-ui/core';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import { React } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

FormCategoryUpdate.propTypes = {
  category: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
    paddingBottom: '20px',
  },
}));

function FormCategoryUpdate(category) {
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
  // console.log(category);
  const form = useForm({
    defaultValues: {
      id: category.category.id,
      name: category.category.name,
      code: category.category.code,
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const newCategorys = {
      ...values,
      id: category.category.id,
    };
    const { onSubmit } = category;
    if (onSubmit) {
      await onSubmit(newCategorys);
    }
  };

  return (
    <form className={classes.root} onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="name" label="Tên danh mục*" size="small" form={form} />
      <InputField name="code" label="Mã định danh*" size="small" form={form} />

      <Button size="small" type="submit" fullWidth className={classes.submit} variant="contained" color="inherit">
        Cập nhật danh mục
      </Button>
    </form>
  );
}

export default FormCategoryUpdate;
