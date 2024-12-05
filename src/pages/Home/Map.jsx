import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/pageComponents/for-map/Pagination";
import { GiConsoleController } from "react-icons/gi";
import showAlert from "../../util/showAlert";
import Swal from "sweetalert2";

const Map = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapList, setMapList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const ps = new kakao.maps.services.Places();

  // 마커 이미지 설정
  const markerImage = new kakao.maps.MarkerImage(
    "/img/marker.png",
    new kakao.maps.Size(56, 56),
    { offset: new kakao.maps.Point(27, 69) }
  );

  useEffect(() => {
    if (mapRef.current) {
      const defaultPosition = { lat: 37.5665, lng: 126.978 };

      const initializeMap = (lat, lng) => {
        const options = { center: new kakao.maps.LatLng(lat, lng), level: 6 };
        const kakaoMap = new kakao.maps.Map(mapRef.current, options);
        // 오른쪽 컨트롤러
        const mapTypeControl = new kakao.maps.MapTypeControl();
        kakaoMap.addControl(
          mapTypeControl,
          kakao.maps.ControlPosition.TOPRIGHT
        );
        const zoomControl = new kakao.maps.ZoomControl();
        kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        setMap(kakaoMap);
        searchNearbyPlaces(lat, lng, kakaoMap);
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude: userLat, longitude: userLng } = position.coords;
            initializeMap(userLat, userLng);
          },
          () => {
            initializeMap(defaultPosition.lat, defaultPosition.lng);
          }
        );
      } else {
        initializeMap(defaultPosition.lat, defaultPosition.lng);
      }
    }
  }, [trigger]);

  const searchNearbyPlaces = (lat, lng, kakaoMap) => {
    const radius = 5000; // 5km 반경
    const location = new kakao.maps.LatLng(lat, lng);

    ps.keywordSearch(
      "클라이밍",
      (data, status, pagination) =>
        placeSearchCB(data, status, kakaoMap, pagination),
      {
        location,
        radius,
        count: 15,
      }
    );
  };

  const placeSearchCB = (data, status, kakaoMap, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data, kakaoMap);
      if (pagination) {
        setPagination(pagination);
      } else {
        console.log("Pagination data is undefined.");
      }
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 없습니다.");
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  const displayPlaces = (places, kakaoMap) => {
    const bounds = new kakao.maps.LatLngBounds();
    const newMarkers = [];
    setMapList(places);
    places.forEach((place) => {
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));
      const existingMarker = markers.find((marker) =>
        marker.getPosition().equals(new kakao.maps.LatLng(place.y, place.x))
      );
      if (existingMarker) {
        // 이미 존재하는 마커는 이동만 시킴
        existingMarker.setMap(kakaoMap);
      } else {
        const kakaoMarker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(place.y, place.x),
          map: kakaoMap,
          image: markerImage,
        });

        kakao.maps.event.addListener(kakaoMarker, "click", () => {
          // confirm 알림창
          Swal.fire({
            title: `${place.place_name}`,
            text: `${place.place_name} 리뷰를 확인하러 가시겠습니까?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니오",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/${place.id}/${place.place_name}`);
            }
          });
        });

        newMarkers.push(kakaoMarker);
      }
    });

    setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]); // 마커 상태 업데이트
    kakaoMap.setBounds(bounds);
  };
  const removeMarkers = () => {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    setMarkers([]); // 마커 배열 초기화
  };

  const cities = ["서울", "인천", "대전", "대구", "광주", "부산"];
  const handleCityClick = (city) => {
    setSelectedPage(1);
    setSelected(city);
    removeMarkers(); // 기존 마커 제거
    ps.keywordSearch(`${city} 클라이밍`, (data, status, pagination) =>
      placeSearchCB(data, status, map, pagination)
    );
  };

  const choosePlace = (place) => {
    setSelected(place);
    if (!map) return; // 지도 객체가 없으면 함수 종료
    // 기존 마커 제거
    removeMarkers();

    // 선택된 장소의 위치 설정
    const selectedPosition = new kakao.maps.LatLng(place.y, place.x);

    // 새 마커 생성
    const kakaoMarker = new kakao.maps.Marker({
      position: selectedPosition,
      map, // 현재 지도 객체에 추가
      image: markerImage,
    });
    kakao.maps.event.addListener(kakaoMarker, "click", () => {
      // const result = window.confirm(`${place.place_name}로 이동하시겠습니까?`);
      Swal.fire({
        title: `${place.place_name}`,
        text: `${place.place_name} 리뷰를 확인하러 가시겠습니까?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니오",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/${place.id}/${place.place_name}`);
        }
      });
    });

    // 지도 중심 이동 및 확대 레벨 조정
    map.setCenter(selectedPosition);
    map.setLevel(5);

    setMarkers([kakaoMarker]);
  };

  return (
    <>
      <div className="flex justify-between items-end w-[1200px] m-auto mt-[50px]">
        <h2 className="text-[#333] w-full">
          주변 클라이밍장&nbsp;&nbsp;&nbsp;
          <span className="text-[#666]">도심 속 클라이밍장을 찾아보세요</span>
        </h2>
        <div className={"flex gap-x-6 w-full"}>
          {cities.map((city) => (
            <button
              className={`w-[76px] h-8 bg-[#FFB200] text-white rounded-3xl transition-colors duration-300 hover:bg-[#FF8D03] ${
                selected === city ? "bg-[#FF8D03]" : "bg-[#FFB200] "
              }`}
              key={city}
              value={city}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center inline-block pt-[30px] h-[600px] mb-[50px]">
        <div className="z-10 bg-white overflow-y-auto h-full w-[320px] border-r border-[#ddd]">
          <h3 className="flex justify-between text-xl px-1 border-b border-[#eee] pb-[25px]">
            검색 결과
            <button
              className="text-sm font-normal w-[110px] h-8 bg-[#FFB200] text-white rounded-3xl transition-colors duration-300 hover:bg-[#FF8D03]"
              onClick={() => setTrigger((prev) => !prev)}
            >
              현재 위치로 이동
            </button>
          </h3>
          <ul>
            {mapList.map((place, index) => (
              <li
                key={index}
                className={`mb-0 border-b border-[#eee] px-2 py-2 flex flex-col cursor-pointer transition-colors duration-300 ${
                  selected === place ? "bg-blue-100" : "hover:bg-blue-100"
                }`}
                onClick={() => choosePlace(place)}
              >
                <div className="w-full">
                  <span className="mr-3 text-blue-500 text-lg">{index}</span>
                  {place.place_name}
                </div>
                <div className="text-sm pt-1">{place.address_name}</div>
              </li>
            ))}
          </ul>
          {/* 페이지네이션 */}
          <Pagination
            pagination={pagination}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            removeMarkers={removeMarkers}
          ></Pagination>
        </div>

        <div ref={mapRef} className="w-[870px] h-full overflow-hidden"></div>
      </div>
    </>
  );
};

export default Map;