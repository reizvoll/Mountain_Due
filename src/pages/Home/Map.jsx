import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


const Map = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapList, setMapList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const ps = new kakao.maps.services.Places();

  // 마커 이미지 설정
  const markerImage = new kakao.maps.MarkerImage(
    "/img/mountain_due.png",
    new kakao.maps.Size(64, 69),
    { offset: new kakao.maps.Point(27, 69) }
  );

  useEffect(() => {
    if (mapRef.current) {
      const defaultPosition = { lat: 37.5665, lng: 126.978 };

      const initializeMap = (lat, lng) => {
        const options = { center: new kakao.maps.LatLng(lat, lng), level: 6 };
        const kakaoMap = new kakao.maps.Map(mapRef.current, options);

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
  }, []);

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
          const result = window.confirm(
            `${place.place_name}로 이동하시겠습니까?`
          );
          if (result) {
            navigate(`/${place.id}/${place.place_name}`);
          }
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
  const handleCityClick = (e) => {
    removeMarkers(); // 기존 마커 제거
    const city = e.target.value;
    ps.keywordSearch(`${city} 클라이밍`, (data, status) =>
      placeSearchCB(data, status, map)
    );
  };

  const displayPagination = (page) => {
    if (pagination && pagination.gotoPage) {
      pagination.gotoPage(page);
    }
  };

  return (
    <>
      <div className={"flex justify-between items-end"}>
        <h2 className={"text-black w-full"}>
          주변 클라이밍장<span>도심 속 클라이밍장을 찾아보세요</span>
        </h2>
        <div className={"flex gap-4"}>
          {cities.map((city) => (
            <button
              className={"w-20 h-6 bg-[#FFB200] text-white rounded-3xl"}
              key={city}
              value={city}
              onClick={handleCityClick}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
      <div style={{ width: "100%", display: "inline-block" }}>
        <div ref={mapRef} style={{ width: "99%", height: "500px" }}></div>
      </div>
      <div className="flex">
        <div
          style={{
            width: "30%",
            padding: "10px",
            borderRight: "1px solid #ddd",
          }}
        >
          <h3>검색 결과</h3>
          <ul>
            {mapList.map((place, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <p>{index}</p>
                <strong>{place.place_name}</strong>
                <br />
                <span>{place.address_name}</span>
              </li>
            ))}
          </ul>
          {/* 페이지네이션 */}
          {pagination && (
            <div style={{ marginTop: "20px" }}>
              {Array.from({ length: pagination.last }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    displayPagination(i + 1);
                  }}
                  style={{ margin: "0 5px" }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Map;
