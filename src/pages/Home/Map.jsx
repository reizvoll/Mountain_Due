import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const { kakao } = window;

const Map = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const ps = new kakao.maps.services.Places();
  // 마커 이미지 변경하는 변수
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
        // initializeMap에 포함시켜서 함께 업데이트 시키기
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
      (data, status) => placeSearchCB(data, status, kakaoMap),
      {
        location,
        radius,
        count: 15,
      }
    );
  };

  // 장소기반 검색
  const placeSearchCB = (data, status, kakaoMap) => {
    // status.ok 이면 마커 생성
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data, kakaoMap);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 없습니다.");
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  const displayPlaces = (places, kakaoMap) => {
    const bounds = new kakao.maps.LatLngBounds();
    const newMarkers = places.map((place) => {
      bounds.extend(new kakao.maps.LatLng(place.y, place.x));
      return {
        id: place.id,
        position: {
          lat: place.y,
          lng: place.x,
        },
        content: place.place_name,
      };
    });

    setMarkers(newMarkers);
    setPlaces(places);

    // 초기 검색 후에만 지도의 범위를 설정
    kakaoMap.setBounds(bounds);
  };

  const displayMarkerOnMap = (markers, kakaoMap) => {
    // 기존 마커 제거
    markers.forEach((marker) => {
      const kakaoMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(
          marker.position.lat,
          marker.position.lng
        ),
        map: kakaoMap,
        image: markerImage,
      });

      kakao.maps.event.addListener(kakaoMarker, "click", () => {
        const result = window.confirm(`${marker.content}로 이동하시겠습니까?`);
        if (result) {
          navigate(`/${marker.id}/${marker.content}`);
        }
      });
    });
  };

  // markers, map이 바뀌면 map이 존재할 때 마커를 지워주는 역할
  useEffect(() => {
    if (map) {
      displayMarkerOnMap(markers, map);
    }
  }, [markers, map]);

  return (
    <div style={{ width: "100%", display: "inline-block" }}>
      <div ref={mapRef} style={{ width: "99%", height: "500px" }}></div>

      {/* 리스트 확인 <ul>
        {places.map((place, index) => (
          <li key={index}>{place.place_name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Map;
