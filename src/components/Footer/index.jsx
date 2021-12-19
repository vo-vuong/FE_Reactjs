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
  containerCategory: {
    '& a': {
      color: '#fff',
      textDecoration: 'none',
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
  item: {
    marginLeft: '70px',
  },
}));

export default function Footer() {
  const classes = useStyles();

  const contentAbout = { email: 'Email: 16musical@gmail.com', phoneNumber: 'Số điện thoại: 0977816666' };
  const contentService = {
    'products?category=2&page=1&sort=gia-thap-den-cao': 'Piano',
    'products?category=1&page=1&sort=gia-thap-den-cao': 'Guitar',
    'products?category=3&page=1&sort=gia-thap-den-cao': 'Phụ kiện',
  };
  const contentInfo = { address: 'Địa chỉ: Đại học Duy Tân,Quận Hải Châu,Thành phố Đà Nẵng' };

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
            <Grid key={key} item className={classes.paper}>
              {content[key]}
            </Grid>
          );
        })}
      </div>
    );
  }

  function FormCustomCategory({ title, content }) {
    return (
      <div className={classes.item}>
        <Grid item className={classes.paper}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        </Grid>
        {Object.keys(content).map(function (key) {
          return (
            <Grid key={key} item className={classes.paper}>
              <a href={key}>{content[key]}</a>
            </Grid>
          );
        })}
      </div>
    );
  }

  return (
    <Box className={classes.root}>
      <Container className={classes.containerFooter}>
        <Grid container>
          <Grid item xs={4}>
            <FormCustom title="Về chúng tôi" content={contentAbout} />
          </Grid>
          <Grid item xs={4} className={classes.containerCategory}>
            <FormCustomCategory title="Danh mục" content={contentService} />
          </Grid>
          <Grid item xs={4}>
            <FormCustom title="Liên hệ" content={contentInfo} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
