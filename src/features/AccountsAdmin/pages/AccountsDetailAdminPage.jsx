import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import accountsApi from 'api/accountsApi';
import contentApi from 'api/contentApi';
import { useSnackbar } from 'notistack';
import { React, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import AccountDetail from '../components/AccountDetail';

AccountsDetailAdminPage.propTypes = {};

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

function AccountsDetailAdminPage(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [account, setAccount] = useState({});

  let isAccount = false;
  if (Object.keys(account).length !== 0) {
    isAccount = true;
  }

  const {
    params: { accountId },
  } = useRouteMatch();

  useEffect(() => {
    (async () => {
      try {
        const account = await accountsApi.get(accountId);

        setAccount(account);
      } catch (error) {
        console.log('Failed to fetch users.', error);
      }
    })();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const result = await contentApi.addAdmin(values);
      enqueueSnackbar(result.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" component="h3" className={classes.title}>
              Cập nhật Tài khoản
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {isAccount ? <AccountDetail onSubmit={handleSubmit} account={account} /> : ''}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AccountsDetailAdminPage;
