import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {},
}));

function InfoPage() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box>
      <Container className = "container">
        <Grid spacing={1}>
          <div className="about-us">
            <h2 className="title-infor">Giới thiệu</h2>
            <p className="product-content">16Musical là TRUNG TÂM BÁN NHẠC CỤ ÂM NHẠC với đầy đủ, đa dạng các thương hiệu:</p>
            <span className="title-product">Đàn Piano</span>
            <p className="product-content">Chúng tôi có Yamaha (Nhật Bản), Roland(Nhật Bản), Kurtzman (Anh Quốc), Dynatone (Hàn Quốc), Casio (Nhật Bản).</p>
            <span className="title-product">Đàn Guitar</span>
            <p className="product-content">Chúng tôi có Martin (Mỹ), Taylor (Mỹ), Cordoba (Tây Ban Nha), Epiphone (Mỹ), Ibanez (Nhật Bản), Cort (Hàn Quốc), Takamine, Yamaha (Nhật Bản)...</p>
            <span className="title-product">Phụ kiện</span>
            <p className="product-content">Đa dạng các thương hiệu đến từ Mỹ, Nhật như D'Addario, Elixir, Keyser, Gibson, Ernie Ball, Hosa, Musedo, Ibanez, Martin....<br />
              Tất cả sản phẩm tại 16Musical đều MỚI 100%, CHÍNH HÃNG, ĐẦY ĐỦ GIẤY TỜ.<br />
              16Musical cam kết:
            </p>
            <div className="inform">
              <span className="title-commit">- SẢM PHẨM CHÍNH HÃNG </span>
              <p>(fake hoàn 300% tiền trong bất cứ thời điểm nào)</p>
            </div>
            <div className="inform">
              <span className="title-commit">- GIÁ TỐT NHẤT </span>
              <p>(hãy gọi ngay 0977816666 để có mức giá "hủy diệt".)</p>
            </div>
            <div className="container-img">
              <img className="product-img" src="//bizweb.dktcdn.net/100/305/189/files/3-khai-truong-mai-nguyen-music.jpg?v=1534417077950" alt="Piano với các thương hiệu Yamaha, Roland, Kurtzman, Dynatone, Casio... mới nguyên hộp, đầy đủ các model, lựa chọn đa dạng" />
              <i className="title-img">Piano với các thương hiệu Yamaha, Roland, Kurtzman, Dynatone, Casio... mới nguyên hộp, đầy đủ các model, lựa chọn đa dạng</i>
              <img className="product-img" src="//bizweb.dktcdn.net/100/305/189/files/7-khai-truong-mai-nguyen-music.jpg?v=1534417562870" alt="" />
              <img className="product-img" src="//bizweb.dktcdn.net/100/305/189/files/dan-piano-dien-kurtzman-mai-nguyen-music.jpg?v=1534417757033" alt="Đàn Piano Điện Kurtzman đến từ Anh Quốc, giá từ 12 - 25 triệu, đảm bảo hơn hẳn các thương hiệu hiện có trong nước" />
              <i className="title-img">Đàn Piano Điện Kurtzman đến từ Anh Quốc, giá từ 12 - 25 triệu, đảm bảo hơn hẳn các thương hiệu hiện có trong nước</i>
              <img className="product-img" src="//bizweb.dktcdn.net/100/305/189/files/6-khai-truong-mai-nguyen-music.jpg?v=1534417590298" alt="Đàn Piano Điện Dynatone đến từ Hàn Quốc với giá từ 10 - 18 triệu có chất lượng vượt trội trong tầm giá" />
              <i className="title-img">Đàn Piano Điện Dynatone đến từ Hàn Quốc với giá từ 10 - 18 triệu có chất lượng vượt trội trong tầm giá</i>
              <img className="product-img" src="//bizweb.dktcdn.net/100/305/189/files/dan-piano-dien-yamaha-mai-nguyen-music.jpg?v=1534417918957" alt="Đàn Piano Điện Yamaha mới nguyên hộp, cam kết mức giá không đâu rẻ hơn" />
              <i className="title-img">Đàn Piano Điện Yamaha mới nguyên hộp, cam kết mức giá không đâu rẻ hơn</i>
              <img className="product-img" src="//bizweb.dktcdn.net/100/305/189/files/dan-guitar-mai-nguyen-music.jpg?v=1534418106929" alt="Đàn Guitar Epiphone, Yamaha, Martin... chính hãng, nhập ngoại, hoàn 300% tiền nếu đàn fake" />
              <img className="product-img" src="//bizweb.dktcdn.net/100/305/189/files/1-khai-truong-mai-nguyen-music.jpg?v=1534418187141" alt="Đàn Guitar Epiphone, Yamaha, Martin... chính hãng, nhập ngoại, hoàn 300% tiền nếu đàn fake" />
              <i className="title-img">Đàn Guitar Epiphone, Yamaha, Martin... chính hãng, nhập ngoại, hoàn 300% tiền nếu đàn fake</i>
              <img className="product-img" src="//bizweb.dktcdn.net/100/305/189/files/5-khai-truong-mai-nguyen-music.jpg?v=1534418211801" alt="Và rất nhiều các dòng đàn khác như Organ, Ukulele, phụ kiện chất lượng, chính hãng khác." />
              <i className="title-img">Và rất nhiều các dòng đàn khác như Organ, Ukulele, phụ kiện chất lượng, chính hãng khác.</i>
            </div>
            <p className="product-content">Hãy gọi ngay cho chúng tôi: <span>0977816666</span> để mua nhạc cụ với mức giá tốt nhất trong dịp khuyến mãi này<br />
              Hình thức áp dụng:<br />
              Giảm trực tiếp tiền mặt cho tất cả các đơn hàng mua tại Đại học Duy Tân,Quận Hải Châu,Thành phố Đà Nẵng (cả online và offline).<br />
              Mọi thông tin xin liên hệ hotline: <span>0977816666</span>
            </p>
          </div>
        </Grid>
      </Container>
    </Box>
  );
}

export default InfoPage;
