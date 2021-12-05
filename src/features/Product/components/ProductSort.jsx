import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onchange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const handleSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <Tabs
      value={currentSort}
      TabIndicatorProps={{ style: { background: 'black' } }}
      onChange={handleSortChange}
      aria-label="disabled tabs example"
    >
      <Tab label="Giá từ thấp tới cao" value="gia-thap-den-cao"></Tab>
      <Tab label="Giá từ cao xuống thấp" value="gia-cao-den-thap"></Tab>
      <Tab label="Theo tên sản phẩm A -> Z" value="a-z"></Tab>
      <Tab label="Theo tên sản phẩm Z - > A" value="z-a"></Tab>
    </Tabs>
  );
}

export default ProductSort;
