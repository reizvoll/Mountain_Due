import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Likes from './Likes';
import { usePlaces } from '../../../hooks/usePlaces';

const { kakao } = window;

const Information = () => {
    const { id: spotId, name: spotName } = useParams();
    const { place, createMutation } = usePlaces(spotId);

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

                // DB에 데이터가 존재하지 않으면 추가
                if (!place) {
                    createMutation.mutate(matchData);
                }
            }
        });
    }, [spotId, spotName]);

    return (
        <div className="flex justify-between border border-gray-500 rounded-2xl p-10">
            <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                    <h3 className="text-3xl text-[#2D2D2D] font-bold">{spotData?.place_name}</h3>
                    <p className="text-xl text-[#848484] font-bold">{spotData?.category_name}</p>
                    <p className="text-xl text-[#848484] font-bold">{spotData?.road_address_name}</p>
                    <p className="text-xl text-[#848484] font-bold">(지번) {spotData?.address_name}</p>
                    <p className="text-xl text-[#848484] font-bold">{spotData?.phone}</p>
                </div>
            </div>

            <div className="flex items-end gap-8">
                <Likes />
                <div ref={mapRef} className="w-[480px] h-[320px]" />
            </div>
        </div>
    );
};

export default Information;
