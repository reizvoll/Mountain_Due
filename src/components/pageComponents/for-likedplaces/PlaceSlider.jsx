import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PlaceSlider = ({ likedPlaces = [] }) => {

  const settings = {
    dots: true, // 하단 네비게이션 점 표시
    infinite: false, // 무한 스크롤 비활성화
    speed: 500, // 슬라이드 속도
    slidesToShow: 4, // 한 번에 보여질 카드 개수
    slidesToScroll: 4, // 한 번에 스크롤될 카드 개수
    responsive: [
      {
        breakpoint: 1024, // 화면 너비 1024px 이하
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, // 화면 너비 600px 이하
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // 화면 너비 480px 이하
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container bg-gray-100 py-8">
      <div className="max-w-[1200px] mx-auto p-6 bg-white shadow-lg rounded-lg">
        <Slider {...settings}>
          {likedPlaces.map((place) => (
            <div key={place.id} className="p-4">
              <div className="w-[250px] h-[350px] border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col">
                <div className="w-full h-40 bg-gray-300 flex justify-center items-center">
                  <img
                    src={'/img/mountain_due.png'}
                    alt={place.place_name}
                    className="w-40 h-40 object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col items-start">
                  <h2 className="text-lg mt-2 font-semibold text-gray-700">
                    {place.place_name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {place.road_address_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PlaceSlider;
