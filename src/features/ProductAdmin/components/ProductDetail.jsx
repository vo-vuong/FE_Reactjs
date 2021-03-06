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
import axios from 'axios';

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

function ProductDetail(props) {
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
    const file = e.target.files[0] || props.product.images[0].url;
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
      .required('Vui l??ng nh???p T??n s???n ph???m.')
      .min(3, 'Vui l??ng nh???p T??n s???n ph???m l???n h??n 3 k?? t???.')
      .max(255, 'Vui l??ng nh???p T??n s???n ph???m nh??? h??n 255 k?? t???.'),
    categoryId: yup.number().required().typeError('Vui l??ng ch???n danh m???c s???n ph???m.'),
    shortdescription: yup
      .string()
      .required('Vui l??ng nh???p M?? t??? ng???n.')
      .min(10, 'Vui l??ng nh???p M?? t??? ng???n l???n h??n 10 k?? t???.')
      .max(255, 'Vui l??ng nh???p M?? t??? ng???n nh??? h??n 255 k?? t???.'),
    detail: yup
      .string()
      .required('Vui l??ng nh???p M?? t??? chi ti???t.')
      .min(20, 'Vui l??ng nh???p M?? t??? chi ti???t l???n h??n 20 k?? t???.'),
    price: yup.number().required('Vui l??ng nh???p gi??.').min(0, 'T???i thi???u l?? 0.').typeError('Vui l??ng nh???p s???.'),
    quantity: yup
      .number()
      .required('Vui l??ng nh???p s??? l?????ng s???n ph???m.')
      .min(0, 'T???i thi???u l?? 0.')
      .max(1000, 'T???i ??a l?? 1000 s???n ph???m.')
      .typeError('Vui l??ng nh???p s???.'),
    warranty: yup
      .number()
      .required('Vui l??ng nh???p B???o h??nh s???n ph???m.')
      .min(0, 'T???i thi???u l?? 0.')
      .max(100, 'T???i ??a l?? 100 th??ng b???o h??nh s???n ph???m.')
      .typeError('Vui l??ng nh???p s???.'),
    originId: yup.number().required().typeError('Vui l??ng ch???n danh m???c xu???t x???.'),
    code: yup
      .string()
      .required('Vui l??ng nh???p Code.')
      .min(3, 'Vui l??ng nh???p Code l???n h??n 3 k?? t???.')
      .max(255, 'Vui l??ng nh???p Code nh??? h??n 255 k?? t???.'),
  });
  // console.log(props.product);

  const form = useForm({
    defaultValues: {
      // id: props.product.id || '',
      name: props.product.name || '',
      shortdescription: props.product.shortdescription || '',
      detail: props.product.detail || '',
      price: props.product.price || '0',
      originId: props.product.originId || '1',
      quantity: props.product.quantity || '0',
      code: props.product.code || '',
      categoryId: props.product.categoryId || '1',
      warranty: props.product.warranty || '0',
      url: props.product.images[0].url || '',
    },

    resolver: yupResolver(schema),
  });

  const handleBack = () => {
    history.push('/admin/product');
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
          id: props.product.id,
          url: [url],
        };
        await onSubmit(object2);
      } else {
        const object2 = {
          ...values,
          id: props.product.id,
          url: [props.product.images[0].url],
        };
        await onSubmit(object2);
      }
    }

    // history.push('/admin/product');
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="name" label="T??n s???n ph???m*" size="small" form={form} />
      <ReactHookFormSelect
        id="outlined-select-product-native"
        name="categoryId"
        size="small"
        fullWidth
        label="Danh m???c s???n ph???m"
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
      <InputField name="shortdescription" label="M?? t??? ng???n*" size="small" form={form} />
      <MultilineField name="detail" label="M?? t??? chi ti???t*" multiline rows={4} form={form} />
      <InputNumberField name="price" label="Gi??*" size="small" form={form} />
      <InputNumberField name="quantity" label="S??? l?????ng*" size="small" form={form} />
      <InputNumberField name="warranty" label="B???o h??nh*" size="small" form={form} />
      <ReactHookFormSelect
        id="outlined-select-currency-native"
        name="originId"
        fullWidth
        label="Danh m???c xu???t x???"
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
        src={previewSource || props.product.images[0].url}
        className={classes.avatar}
        alt="Ch???n file ???nh "
        style={{ height: '130px' }}
      />
      <input type="file" name="url" onChange={handleFileInputChange} accept="image/png, image/jpeg" />

      <Box className={classes.boxButton}>
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          C???p nh???t
        </Button>
        <Button variant="contained" color="inherit" onClick={handleBack} className={classes.button}>
          Tr??? v???
        </Button>
      </Box>
    </form>
  );
}

export default ProductDetail;
