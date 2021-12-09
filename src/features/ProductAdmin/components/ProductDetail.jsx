import { Button } from '@material-ui/core';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import { React } from 'react';

ProductDetail.propTypes = {
  product: PropTypes.object,
};

function ProductDetail({ product }) {
  const handleSubmit = () => {};
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
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

      <Button
        //   disabled={isSubmitting}
        type="submit"
        fullWidth
        className={classes.submit}
        variant="contained"
        color="inherit"
      >
        Cập nhật
      </Button>
    </form>
  );
}

export default ProductDetail;
