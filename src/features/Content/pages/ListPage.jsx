import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import ContentFilters from '../components/ContentFilters';
import ContentList from '../components/ContentList';
import ContentSkeletonList from '../components/ContentSkeletonList';
import ContentSort from '../components/ContentSort';
import contentApi from 'api/contentApi';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },

  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '20px',
    paddingBottom: '10px',
  },
}));

function ListPage() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  // Thuong phan trang se co 3 state
  const [contentList, setContentList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 1,
  });
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState(() => ({
    ...queryParams,
    page: Number.parseInt(queryParams.page) || 1, //default filters
    sort: 'moi-cu',
  }));

  useEffect(() => {
    // Sync filters to URL
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  }, [history, filters]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await contentApi.getAll({ filters }); // desturing data
        setContentList(data);
        setPagination(pagination);
        console.log(data, pagination);
      } catch (error) {
        console.log('Failed load content', error);
      }

      setLoading(false);
    })();
  }, [filters]);

  const handlePageChange = (e, page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: page,
    }));
  };

  const handleSortChange = (newSortValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort: newSortValue,
    }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ContentFilters filters={filters} onChange={handleFiltersChange} />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ContentSort currentSort={filters.sort} onChange={handleSortChange} />
              {loading ? <ContentSkeletonList /> : <ContentList data={contentList} />}

              <Box className={classes.pagination}>
                <Pagination
                  variant="outlined"
                  color="primary"
                  count={pagination.totalPage}
                  page={pagination.page}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
// Box cai ngoai cung Phan tich layout tu ngoai vao trong. tu trai sang phai
// trong Box co container de trong hai ben
// trong bosstrap co row column thi trong marial co grid
// Gird o ngoai la row, hai cai o trong column

// Can giua mot cai chi do nhu pagination, cho cai box o ngoai la flex roi cau hinh cho no.
// Tang khoang cach giua thang cha va thang con thi dung pading, khac voi 2 item

export default ListPage;
