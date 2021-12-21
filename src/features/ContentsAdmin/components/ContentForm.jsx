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
import axios from 'axios';
import InputField from 'components/form-controls/InputField';
import MultilineField from 'components/form-controls/MultilineField';
import ReactHookFormSelect from 'components/form-controls/SelectField';
import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

ContentForm.propTypes = {
  props: PropTypes.object,
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

function ContentForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState();

  const schema = yup.object({
    name: yup
      .string()
      .required('Vui lòng nhập Tên bài viết.')
      .min(5, 'Vui lòng nhập Tên bài viết lớn hơn 5 kí tự.')
      .max(255, 'Vui lòng nhập Tên bài viết nhỏ hơn 255 kí tự.'),
    categoryNews: yup.number().required().typeError('Vui lòng chọn Danh mục bài viết.'),
    shortdescription: yup
      .string()
      .required('Vui lòng nhập Mô tả ngắn.')
      .min(10, 'Vui lòng nhập Mô tả ngắn lớn hơn 10 kí tự.')
      .max(255, 'Vui lòng nhập Mô tả ngắn nhỏ hơn 255 kí tự.'),
    detail: yup
      .string()
      .required('Vui lòng nhập Mô tả chi tiết.')
      .min(20, 'Vui lòng nhập Mô tả chi tiết lớn hơn 20 kí tự.'),
    code: yup
      .string()
      .required('Vui lòng nhập Code.')
      .min(3, 'Vui lòng nhập Code lớn hơn 3 kí tự.')
      .max(255, 'Vui lòng nhập Code nhỏ hơn 255 kí tự.'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      categoryNews: '1',
      status: '1',
      shortdescription: '',
      detail: '',
      code: '',
      url: '',
    },

    resolver: yupResolver(schema),
  });

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleBack = () => {
    history.push('/admin/contents');
  };

  const handleSubmit = async (values) => {
    let url = '';
    const { onSubmit } = props;
    if (onSubmit) {
      if (previewSource) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', 'hjgraqmi');

        await axios.post('https://api.cloudinary.com/v1_1/dxsewj5df/image/upload', formData).then((response) => {
          url = response.data.url;
        });
      }
      const object2 = {
        ...values,
        url: url,
      };
      await onSubmit(object2);
    }
    // history.push('/admin/contents');
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="name" label="Tên bài viết*" size="small" form={form} />
      <ReactHookFormSelect
        id="outlined-select-contents-native"
        name="categoryNews"
        size="small"
        fullWidth
        label="Danh mục bài viết*"
        control={form.control}
        error={!!form.errors.categoryNews}
        variant="outlined"
        margin="normal"
      >
        {props.categoryList.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </ReactHookFormSelect>
      <FormControl component="fieldset">
        <FormLabel component="legend">Trạng thái</FormLabel>
        <Controller
          rules={{ required: true }}
          control={form.control}
          name="status"
          as={
            <RadioGroup row defaultValue="1">
              <FormControlLabel value="1" control={<Radio />} label="Hiện" />
              <FormControlLabel value="0" control={<Radio />} label="Ẩn" />
            </RadioGroup>
          }
        />
      </FormControl>
      <InputField name="shortdescription" label="Mô tả ngắn*" size="small" form={form} />
      <MultilineField name="detail" label="Mô tả chi tiết*" multiline rows={4} form={form} />
      <InputField name="code" label="Code*" size="small" form={form} />
      <input type="file" name="url" onChange={handleFileInputChange} />
      {previewSource && <img src={previewSource} alt="chosen" style={{ height: '300px' }} />}
      <Box className={classes.boxButton}>
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Tạo mới
        </Button>
        <Button variant="contained" color="inherit" onClick={handleBack} className={classes.button}>
          Trở về
        </Button>
      </Box>
    </form>
  );
}

export default ContentForm;
