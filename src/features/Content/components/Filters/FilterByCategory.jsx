import { Box, Typography, makeStyles, Link } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import categoryContentApi from 'api/categoryContentApi';
import { NavLink } from 'react-router-dom';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

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
        const list = await categoryContentApi.getAll();
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
      if (category === 'all') {
        onChange();
      } else {
        onChange(category.id);
      }
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DANH MỤC BÀI VIẾT</Typography>

      <ul className={classes.menu}>
        <li onClick={() => handleCategoryClick('all')}>
          <Typography variant="body2">Tất cả danh mục</Typography>
        </li>
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
