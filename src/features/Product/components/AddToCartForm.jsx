import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Vui lòng nhập số lượng.')
      .min(1, 'Vui lòng nhập ít nhất 1 đơn vị.')
      .typeError('Vui lòng nhập số.'),
  });
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Số lượng" form={form} />

      <Button type="submit" variant="contained" color="primary" style={{ width: '180px' }} size="small">
        Thêm vào giỏ hàng
      </Button>
    </form>
  );
}

export default AddToCartForm;
