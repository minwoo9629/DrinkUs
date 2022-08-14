import styled from 'styled-components';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Container = styled.div`
  width: 1200px;
  height: 278px;
  .slick-dots {
    .slick-active {
      button::before {
        color: #c1c1c1;
      }
    }
    button::before {
      color: #e9e9e9;
    }
  }
  margin-top: 20px;
  overflow: hidden;
`;

const ImageContainer = styled.img `
  height: 200px;
  width: 1200px;
  background-color: #EAF1FF;
`

export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 5000,
    arrow: false
  };

  return (
    <Container>
      <Slider {...settings}>
        <ImageContainer
          src={process.env.PUBLIC_URL + '/assets/banner/001.png'}
        />
        <ImageContainer
          src={process.env.PUBLIC_URL + '/assets/banner/002.png'}
        />
        <ImageContainer
          src={process.env.PUBLIC_URL + '/assets/banner/003.png'}
        />
        <ImageContainer
          src={process.env.PUBLIC_URL + '/assets/banner/004.png'}
        />
      </Slider>
    </Container>
  );
}