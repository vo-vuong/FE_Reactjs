import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function HeaderMenu() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(newValue);
  };

  return (
    <Container>
      <Paper className={classes.root}>
        <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{ style: { background: 'black' } }}>
          <Tab label="Trang chủ" value="" />
          <Tab label="Sản phẩm" value="products" />
          <Tab label="Bài viết" value="contets" />
          <Tab label="Về chúng tôi" value="info" />
        </Tabs>
      </Paper>
    </Container>
  );
}
