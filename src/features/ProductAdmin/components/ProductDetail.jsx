import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, makeStyles, MenuItem } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import originApi from 'api/originApi';
import InputField from 'components/form-controls/InputField';
import InputNumberField from 'components/form-controls/InputNumberField';
import MultilineField from 'components/form-controls/MultilineField';
import ReactHookFormSelect from 'components/form-controls/SelectField';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

ProductDetail.propTypes = {
  product: PropTypes.object,
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

function ProductDetail({ product }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [categoryList, setCategoryList] = useState([]);
  const [categoryOriginList, setCategoryOriginList] = useState([]);
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
    const file = e.target.files[0] || product.images[0].url;
    previewFile(file);
    setSelectedFile(file);
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const list = await originApi.getAll();
        setCategoryOriginList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    })();
  }, []);

  const schema = yup.object({
    name: yup
      .string()
      .required('Vui lòng nhập Tên sản phẩm.')
      .min(3, 'Vui lòng nhập Tên sản phẩm lớn hơn 3 kí tự.')
      .max(255, 'Vui lòng nhập Tên sản phẩm nhỏ hơn 255 kí tự.'),
    categoryId: yup.number().required().typeError('Vui lòng chọn danh mục sản phẩm.'),
    shortdescription: yup
      .string()
      .required('Vui lòng nhập Mô tả ngắn.')
      .min(10, 'Vui lòng nhập Mô tả ngắn lớn hơn 10 kí tự.')
      .max(255, 'Vui lòng nhập Mô tả ngắn nhỏ hơn 255 kí tự.'),
    detail: yup
      .string()
      .required('Vui lòng nhập Mô tả chi tiết.')
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
    originId: yup.number().required().typeError('Vui lòng chọn danh mục xuất xứ.'),
    code: yup
      .string()
      .required('Vui lòng nhập Code.')
      .min(3, 'Vui lòng nhập Code lớn hơn 3 kí tự.')
      .max(255, 'Vui lòng nhập Code nhỏ hơn 255 kí tự.'),
  });
  console.log(product);
  console.log(product.images[0].url);
  const form = useForm({
    defaultValues: {
      id: product.id || '',
      name: product.name || '',
      shortdescription: product.shortdescription || '',
      detail: product.detail || '',
      price: product.price || '1',
      originId: product.originId || '1',
      quantity: product.quantity || '1',
      code: product.code || '',
      categoryId: product.categoryId || '1',
      warranty: product.warranty || '1',
      url: product.images[0].url || '',
    },

    resolver: yupResolver(schema),
  });

  const handleBack = () => {
    history.push('/admin/product');
  };

  const handleSubmit = () => {};
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="name" label="Tên sản phẩm*" size="small" form={form} />
      <ReactHookFormSelect
        id="outlined-select-product-native"
        name="categoryId"
        size="small"
        fullWidth
        label="Danh mục sản phẩm"
        control={form.control}
        error={!!form.errors.categoryId}
        variant="outlined"
        margin="normal"
      >
        {categoryList.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </ReactHookFormSelect>
      <InputField name="shortdescription" label="Mô tả ngắn*" size="small" form={form} />
      <MultilineField name="detail" label="Mô tả chi tiết*" multiline rows={4} form={form} />
      <InputNumberField name="price" label="Giá*" size="small" form={form} />
      <InputNumberField name="quantity" label="Số lượng*" size="small" form={form} />
      <InputNumberField name="warranty" label="Bảo hành*" size="small" form={form} />
      <ReactHookFormSelect
        id="outlined-select-currency-native"
        name="originId"
        fullWidth
        label="Danh mục xuất xứ"
        size="small"
        control={form.control}
        error={!!form.errors.originId}
        variant="outlined"
        margin="normal"
      >
        {categoryOriginList.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </ReactHookFormSelect>
      <InputField name="code" label="Code*" size="small" form={form} />
      <img
        src={previewSource || product.images[0].url}
        className={classes.avatar}
        alt="Chọn file ảnh "
        style={{ height: '130px' }}
      />
      <input
        type="file"
        name="url"
        onChange={handleFileInputChange}
        className={classes.avatar}
        accept="image/png, image/jpeg"
      />

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

export default ProductDetail;
