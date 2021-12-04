import { Container, Grid, makeStyles } from '@material-ui/core';
import productApi from 'api/productApi';
import ImageBanner from 'components/ImageBanner';
import React, { useEffect, useState } from 'react';
import FavoriteProductList from '../components/FavoriteProductList';

const useStyles = makeStyles((theme) => ({}));

function HomePage() {
  const ImgBannerProductStyle = { width: '100%', height: '50vh' };
  const ImgBannerContentStyle = { width: '100%', height: '200px', marginTop: '20px' };
  const [productList, setProductList] = useState([]);

  const filters = {
    page: 1,
    sort: 'gia-thap-den-cao',
  };

  useEffect(() => {
    (async () => {
      try {
        // goi request len server thi kem try catch
        const { data } = await productApi.getAll({ filters }); // desturing data
        setProductList(data.slice(0, 8));
      } catch (error) {
        console.log('Failed load product', error);
      }

      // setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <ImageBanner
        title="Hello Xin chào!!!"
        description="HI"
        linkText="Đi đâu đó"
        link="/hi"
        style={ImgBannerProductStyle}
      />
      <Grid container>
        <FavoriteProductList title="Sản phẩm nổi bật" productList={productList} />
      </Grid>
      <ImageBanner
        title="Hello Bai viet!!!"
        description="HI"
        linkText="Đi đâu đó"
        link="/hi"
        style={ImgBannerContentStyle}
      />
    </Container>
  );
}
// Box cai ngoai cung Phan tich layout tu ngoai vao trong. tu trai sang phai
// trong Box co container de trong hai ben
// trong bosstrap co row column thi trong marial co grid
// Gird o ngoai la row, hai cai o trong column

export default HomePage;
