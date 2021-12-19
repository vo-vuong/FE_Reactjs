import { Container, Grid } from '@material-ui/core';
import contentApi from 'api/contentApi';
import productApi from 'api/productApi';
import ImageBanner from 'components/ImageBanner';
import React, { useEffect, useState } from 'react';
import FavoriteContentList from '../components/FavoriteContentList';
import FavoriteProductList from '../components/FavoriteProductList';

function HomePage() {
  const ImgBannerProductStyle = { width: '100%', height: '50vh' };
  const ImgBannerContentStyle = {
    width: '100%',
    height: '200px',
    marginTop: '20px',
    backgroundImage:
      'url(https://images.pexels.com/photos/7520779/pexels-photo-7520779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
  };
  const [productList, setProductList] = useState([]);
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const filters = {
      page: 1,
      sort: 'gia-thap-den-cao',
    };
    (async () => {
      try {
        const { data } = await productApi.getAll({ filters });
        setProductList(data.slice(0, 8));
      } catch (error) {
        console.log('Failed load product', error);
      }

      // setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const filters = {
      page: 1,
      sort: 'moi-cu',
    };
    (async () => {
      try {
        const { data } = await contentApi.getAll({ filters });
        setContentList(data.slice(0, 4));
      } catch (error) {
        console.log('Failed load content', error);
      }
    })();
  }, []);

  return (
    <Container style={{ marginBottom: '20px' }}>
      <ImageBanner
        title="Chuyên cung cấp nhạc cụ."
        description="Đặt hàng online - Thanh toán khi nhận hàng."
        // linkText="Đi đâu đó"
        // link="/hi"
        style={ImgBannerProductStyle}
      />
      <Grid container>
        <FavoriteProductList title="Sản phẩm nổi bật" productList={productList} />
      </Grid>
      <ImageBanner
        title="Thế giới của âm nhạc"
        description="Bạn chưa biết chọn loại nhạc cụ nào?"
        // linkText="Đi đâu đó"
        // link="/hi"
        style={ImgBannerContentStyle}
      />
      <Grid container>
        <FavoriteContentList title="Bài viết nổi bật" contentList={contentList} />
      </Grid>
    </Container>
  );
}
// Box cai ngoai cung Phan tich layout tu ngoai vao trong. tu trai sang phai
// trong Box co container de trong hai ben
// trong bosstrap co row column thi trong marial co grid
// Gird o ngoai la row, hai cai o trong column

export default HomePage;
