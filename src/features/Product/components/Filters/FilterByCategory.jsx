import { Box, Typography, makeStyles } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

// IMPORTANT makeStyles of @material-ui/core not @material-ui/style
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    // & dai dien cho phan tu hien tai dang tro toi
    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',

      '&:hover': { color: theme.palette.primary.dark, cursor: 'pointer' },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        // console.log({ response });
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed load category', error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC SẢN PHẨM</Typography>

      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
