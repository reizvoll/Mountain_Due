import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const { kakao } = window;

const Detail = () => {
    const { id: spotId, name: spotName } = useParams();

    const mapRef = useRef(null);

    const [spotData, setSpotData] = useState();

    useEffect(() => {
        const mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심 좌표
            level: 3 // 지도의 확대 레벨
        };

        const map = new kakao.maps.Map(mapRef.current, mapOption); // 지도
        const ps = new kakao.maps.services.Places(); // 검색 객체
        const bounds = new kakao.maps.LatLngBounds(); // 범위 설정 객체

        // 키워드(spotName)를 이용해서 검색 수행
        ps.keywordSearch(spotName, (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const matchData = data.find((item) => item.id === spotId);

                setSpotData(matchData);

                // 지도에 마커 표시
                new kakao.maps.Marker({ map, position: new kakao.maps.LatLng(matchData.y, matchData.x) });

                // 검색 결과를 기준으로 지도 범위를 재설정하기 위해서 LatLngBounds 객체에 좌표 추가
                bounds.extend(new kakao.maps.LatLng(matchData.y, matchData.x));

                // 검색 결과를 기준으로 지도 범위 재설정
                map.setBounds(bounds);
            }
        });
    }, [spotId, spotName]);

    return (
        <div>
            <h3>상세 페이지</h3>

            <div>
                <div>
                    <p>{spotData?.place_name}</p>
                    <p>{spotData?.category_name}</p>
                    <p>{spotData?.road_address_name}</p>
                    <p>(지번) {spotData?.address_name}</p>
                    <p>{spotData?.phone}</p>
                </div>
                <div ref={mapRef} style={{ width: '500px', height: '400px' }}></div>
            </div>
        </div>
    );
};

export default Detail;
