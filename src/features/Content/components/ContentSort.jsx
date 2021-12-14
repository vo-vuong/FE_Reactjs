import { Tab, Tabs } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

ContentSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onchange: PropTypes.func,
};

function ContentSort({ currentSort, onChange }) {
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
      <Tab label="Ngày đăng mới nhất" value="moi-cu"></Tab>
      <Tab label="Ngày đăng cũ nhất" value="cu-moi"></Tab>
    </Tabs>
  );
}

export default ContentSort;
