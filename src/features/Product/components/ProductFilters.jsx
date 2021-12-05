import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return; // onChange tren kia la khong required nen neu khong truyen thif khong lam gi ca

    const newFilters = {
      ...filters,
      category: newCategoryId,
      page: '1',
    };

    onChange(newFilters);
  };
  // B1: FilterByCategory bao len ProductFilters thong qua handleCategoryChange
  // B2: Tu ProductFilters goi onChange len thang cha la ListPage
  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
    </Box>
  );
}

export default ProductFilters;
