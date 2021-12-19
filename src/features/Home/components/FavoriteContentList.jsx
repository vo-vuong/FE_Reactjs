import { makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import ContentList from 'features/Content/components/ContentList';
import PropTypes from 'prop-types';
import React from 'react';

FavoriteContentList.propTypes = {
  title: PropTypes.string.isRequired,
  contentList: PropTypes.array.isRequired,
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

function FavoriteContentList({ title, contentList }) {
  const classes = useStyles();

  return (
    <div>
      <Paper square className={classes.root}>
        <Tabs value={0} className={classes.tabsHome} TabIndicatorProps={{ style: { background: 'none' } }}>
          <Tab label={title} className={classes.tabHomeChildren} />
        </Tabs>
        <ContentList data={contentList} />
      </Paper>
    </div>
  );
}

export default FavoriteContentList;
