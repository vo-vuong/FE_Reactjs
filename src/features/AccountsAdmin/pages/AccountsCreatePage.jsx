import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import categoryContentApi from 'api/categoryContentApi';
import contentApi from 'api/contentApi';
import { useSnackbar } from 'notistack';
import { React, useEffect, useState } from 'react';
import ContentForm from '../components/ContentForm';


AccountsCreatePage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1, marginLeft: '30px', marginTop: '40px', marginRight: '30px' },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
  title: {
    width: '100%',
  },
}));

function AccountsCreatePage(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [categoryList, setCategoryList] = useState([]);

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

  const handleContentFormSubmit = async (values) => {
    try {
      const result = await contentApi.addAdmin(values);

      enqueueSnackbar(result.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" component="h3" className={classes.title}>
              Tạo mới bài viết
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ContentForm categoryList={categoryList} onSubmit={handleContentFormSubmit} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AccountsCreatePage;
