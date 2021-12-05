import { makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import ProductList from 'features/Product/components/ProductList';
import PropTypes from 'prop-types';
import React from 'react';

FavoriteProductList.propTypes = {
  title: PropTypes.string.isRequired,
  productList: PropTypes.array.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
  },
  tabsHome: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },
  tabHomeChildren: {},
}));

function FavoriteProductList({ title, productList }) {
  const classes = useStyles();

  return (
    <div>
      <Paper square className={classes.root}>
        <Tabs value={0} className={classes.tabsHome} TabIndicatorProps={{ style: { background: 'none' } }}>
          <Tab label={title} className={classes.tabHomeChildren} />
        </Tabs>
        <ProductList data={productList} />
      </Paper>
    </div>
  );
}

export default FavoriteProductList;
