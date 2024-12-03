import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiSolidComment } from 'react-icons/bi';
import Btn from '../../components/pageComponents/ui/Btn';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { LuPencilLine } from 'react-icons/lu';

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
        <div className="w-[1200px] flex flex-col gap-4 mx-auto p-10 ">
            <h3 className="text-3xl text-[#535353] font-bold">상세 페이지</h3>

            {/* 상세 정보 */}
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
                    <p className="text-2xl text-black font-bold">
                        <span className="text-2xl text-red-500 font-bold">♥</span> 5
                    </p>
                    <div ref={mapRef} className="w-[480px] h-[320px]" />
                </div>
            </div>

            {/* 리뷰 */}
            <div className="flex flex-col gap-8 pt-10">
                <div className="flex items-end gap-2">
                    <BiSolidComment className=" text-2xl text-black" />
                    <span>1</span>
                </div>
                <div className="flex items-center gap-2">
                    <textarea className="w-full border border-gray-500 rounded-xl resize-none p-2" placeholder="리뷰를 입력해 주세요."></textarea>
                    <Btn onClick={() => {}}>작성하기</Btn>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gray-300 rounded-full" />
                            <p className="text-lg">닉네임</p>
                        </div>
                        <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4">
                            <p className="text-lg">댓글 내용</p>
                            <div className="flex gap-4">
                                <LuPencilLine className="text-lg text-black" />
                                <RiDeleteBin6Line className="text-lg text-black" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
