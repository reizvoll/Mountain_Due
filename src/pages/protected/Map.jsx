import { useEffect, useRef, useState } from "react";

const { kakao } = window;

const Map = () => {
  // 구글 API_KEY , ENGINE_ID
  const GOOGLE_API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY;
  const SEARCH_ENGINE_ID = import.meta.env.VITE_APP_SEARCH_ENGINE_ID;

  // 기본 map DOM 접근
  const mapRef = useRef(null);
  // form DOM 접근
  const formRef = useRef(null);
  // 기본 map 세팅
  const [map, setMap] = useState(null);
  // value 값
  const [value, setValue] = useState("");
  // 마커
  const [markers, setMarkers] = useState([]);
  // info 마커스
  const [info, setInfo] = useState("");
  // 장소 리스트
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    if (mapRef.current) {
      const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
      const kakaoMap = new kakao.maps.Map(mapRef.current, options);

      setMap(kakaoMap);
    }
  }, []);

  const searchPlaces = (e) => {
    e.preventDefault();
    // libraries services
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(value, placeSearchCB);
  };

  // 콜백 함수 검색 결과 처리해주는 부분
  const placeSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data);

      // 페이지 번호를 표출합니다
      //   displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };

  // 검색 목록과 마커를 표출합니다.
  // 좌표를 통해 검색을 해야될 것 같다.
  const displayPlaces = async (places) => {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    const bounds = new kakao.maps.LatLngBounds();
    let markers = [];
    for (var i = 0; i < places.length; i++) {
      getListItem(i, places);
      // @ts-ignore
      // markers 는 자체 생성한 객체이다.
      // 따라서 places를 활용해서 places의 다른 데이터를
      // 넣는 것 또한 가능 한 것이다.
      markers.push({
        position: {
          lat: places[i].y,
          lng: places[i].x,
        },
        content: places[i].place_name,
      });
      // @ts-ignore
      bounds.extend(new kakao.maps.LatLng(places[i].y, places[i].x));
    }

    setMarkers(markers);

    // 마커 맵에 표시하는 함수
    displayMarkerOnMap(markers, map, places);

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  };

  const getListItem = (index, places) => {
    setPlaces(places);
  };
  const displayMarkerOnMap = (markers, map, places) => {
    // markers map state 값 받아와서 forEach로 사용
    markers.forEach((marker) => {
      const kakaoMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(
          marker.position.lat,
          marker.position.lng
        ),
        map: map, // 마커를 표시할 지도 객체
      });
      kakao.maps.event.addListener(kakaoMarker, "click", () => {
        const infoWindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${marker.content}</div>`,
        });
        infoWindow.open(map, kakaoMarker);
      });
    });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "inline-block",
        marginLeft: "5px",
        marginRight: "5px",
      }}
    >
      <div ref={mapRef} style={{ width: "99%", height: "500px" }}></div>
      <form ref={formRef} onSubmit={searchPlaces}>
        <input
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type="text"
          value={value}
          id="keyword"
          size="15"
        />
        <button type="submit">검색하기</button>
      </form>
      <div>
        <ul>
          {places.map((place, index) => {
            return <li key={index}>{place.place_name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Map;
