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
import categoryApi from 'api/categoryApi';
import categoryContentApi from 'api/categoryContentApi';
import axios from 'axios';
import InputField from 'components/form-controls/InputField';
import MultilineField from 'components/form-controls/MultilineField';
import ReactHookFormSelect from 'components/form-controls/SelectField';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

ContentDetail.propTypes = {
  content: PropTypes.object,
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

function ContentDetail(props) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [categoryList, setCategoryList] = useState([]);
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
    const file = e.target.files[0] || props.content.url;
    previewFile(file);
    setSelectedFile(file);
  };

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryContentApi.getAll();
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

  const schema = yup.object({
    name: yup
      .string()
      .required('Vui l??ng nh???p T??n b??i vi???t.')
      .min(5, 'Vui l??ng nh???p T??n b??i vi???t l???n h??n 5 k?? t???.')
      .max(255, 'Vui l??ng nh???p T??n b??i vi???t nh??? h??n 255 k?? t???.'),
    categoryNews: yup.number().required().typeError('Vui l??ng ch???n Danh m???c b??i vi???t.'),
    shortdescription: yup
      .string()
      .required('Vui l??ng nh???p M?? t??? ng???n.')
      .min(10, 'Vui l??ng nh???p M?? t??? ng???n l???n h??n 10 k?? t???.')
      .max(255, 'Vui l??ng nh???p M?? t??? ng???n nh??? h??n 255 k?? t???.'),
    detail: yup
      .string()
      .required('Vui l??ng nh???p M?? t??? chi ti???t.')
      .min(20, 'Vui l??ng nh???p M?? t??? chi ti???t l???n h??n 20 k?? t???.'),
    code: yup
      .string()
      .required('Vui l??ng nh???p Code.')
      .min(3, 'Vui l??ng nh???p Code l???n h??n 3 k?? t???.')
      .max(255, 'Vui l??ng nh???p Code nh??? h??n 255 k?? t???.'),
  });

  const form = useForm({
    defaultValues: {
      name: props.content.name || '',
      categoryNews: props.content.categoryNews || '1',
      status: props.content.status + '' || '1',
      shortdescription: props.content.shortdescription || '',
      detail: props.content.detail || '',
      code: props.content.code || '',
      url: props.content.url || '',
    },

    resolver: yupResolver(schema),
  });

  const handleBack = () => {
    history.push('/admin/contents');
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
          id: props.content.id,
          url: url,
        };
        await onSubmit(object2);
      } else {
        const object2 = {
          ...values,
          id: props.content.id,
          url: props.content.url,
        };
        await onSubmit(object2);
      }
    }

    // history.push('/admin/contents');
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="name" label="T??n b??i vi???t*" size="small" form={form} />
      <ReactHookFormSelect
        id="outlined-select-contents-native"
        name="categoryNews"
        size="small"
        fullWidth
        label="Danh m???c b??i vi???t*"
        control={form.control}
        error={!!form.errors.categoryNews}
        variant="outlined"
        margin="normal"
      >
        {categoryList.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </ReactHookFormSelect>
      <FormControl component="fieldset">
        <FormLabel component="legend">Tr???ng th??i</FormLabel>
        <Controller
          rules={{ required: true }}
          control={form.control}
          name="status"
          as={
            <RadioGroup row>
              <FormControlLabel value="1" control={<Radio />} label="Hi???n" />
              <FormControlLabel value="0" control={<Radio />} label="???n" />
            </RadioGroup>
          }
        />
      </FormControl>
      <InputField name="shortdescription" label="M?? t??? ng???n*" size="small" form={form} />
      <MultilineField name="detail" label="M?? t??? chi ti???t*" multiline rows={4} form={form} />
      <InputField name="code" label="Code*" size="small" form={form} />
      <img
        src={previewSource || props.content.url}
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

export default ContentDetail;
