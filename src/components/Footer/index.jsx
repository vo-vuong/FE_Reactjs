import { Box, Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[900],
    color: '#fff',
    padding: '30px 0',
  },
  containerFooter: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
  },
  title: {},
  item: {
    marginLeft: '70px',
  },
}));

export default function Footer() {
  const classes = useStyles();

  const contentAbout = { email: 'musical16@gmail.com', phoneNumber: '0977816666' };
  const contentService = { email: 'musical16@gmail.com', phoneNumber: '0977816666' };
  const contentInfo = { address: 'Đại học Duy Tân,Quận Hải Châu,Thành phố Đà Nẵng', phoneNumber: '0977816666' };

  function FormCustom({ title, content }) {
    return (
      <div className={classes.item}>
        <Grid item className={classes.paper}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        </Grid>
        {Object.keys(content).map(function (key) {
          return (
            <Grid item className={classes.paper}>
              {content[key]}
            </Grid>
          );
        })}
      </div>
    );
  }

  return (
    <Box className={classes.root}>
      <Container className={classes.containerFooter}>
        <Grid container spacing={1}>
          <Grid item xs={4} spacing={3}>
            <FormCustom title="Về chúng tôi" content={contentAbout} />
          </Grid>
          <Grid item xs={4} spacing={3}>
            <FormCustom title="Dịch vụ" content={contentService} />
          </Grid>
          <Grid item xs={4} spacing={3}>
            <FormCustom title="Liên hệ" content={contentInfo} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
