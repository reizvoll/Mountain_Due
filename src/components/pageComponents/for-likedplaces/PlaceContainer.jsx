import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser'
import { fetchLikedPlaceIdsAPI } from '../../../api/like'
import { fetchPlaceAPI } from '../../../api/place'
import { useNavigate } from 'react-router-dom'

const PlaceContainer = () => {
  const [likedPlaces, setLikedPlaces] = useState([]) // 좋아요한 장소 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true) // 로딩 상태
  const { user } = useUser() // 현재 사용자 정보
  const nav = useNavigate();

  useEffect(() => {
    const fetchLikedPlaces = async () => {
      try {
        // 1. 좋아요한 장소 ID 가져오기
        const likedPlaceIds = await fetchLikedPlaceIdsAPI(user.id)
        // console.log("Liked Place IDs:", likedPlaceIds); // 디버깅: 좋아요한 장소 ID 확인

        // 2. 각 장소의 상세 정보 가져오기
        const placesData = await Promise.all(
          likedPlaceIds.map(async (place_id) => {
            try {
              const place = await fetchPlaceAPI(place_id) // 개별 장소 정보 가져오기
              return place
            } catch (error) {
              console.warn(`Error fetching place with ID ${place_id}:`, error) // 에러 발생 시 경고 로그
              return null // 에러가 발생한 경우 null 반환
            }
          })
        )

        // 3. null 값을 제거하고 상태 업데이트
        setLikedPlaces(placesData.flat()) // 유효한 데이터만 저장
      } catch (error) {
        console.error('Error fetching liked places:', error) // API 호출 실패 시 에러 로그
      } finally {
        setLoading(false) // 로딩 상태 해제
      }
    }

    if (user?.id) {
      fetchLikedPlaces() // 사용자 ID가 존재할 때만 데이터 가져오기 실행
    }
  }, [user?.id]) // user.id가 변경될 때마다 useEffect 실행

  // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" />
      </div>
    )
  }

  // 좋아요한 장소가 없을 때 표시할 컴포넌트
  if (likedPlaces.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        좋아요한 장소가 없습니다.
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* 제목 섹션 */}
      <div className="w-full max-w-[1200px] text-center p-10">
        <h1 className="text-2xl font-bold text-gray-800">좋아요 한 장소</h1>
      </div>

      {/* 카드 리스트 섹션 */}
      <div className="w-full max-w-[1200px] p-6 bg-white shadow-lg rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-">
          {likedPlaces.map((place) => (
            <div
              key={place.id}
              className="w-[250px] h-[350px] border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col items-center"
            >
              <div className="w-full h-40 bg-gray-300 flex justify-center items-center">
                <img
                  src={'/img/mountain_due.png'}
                  alt={place.place_name}
                  className="w-40 h-40 object-cover"
                />
              </div>
              <div className="p-5 flex flex-col items-start flex-grow">
                <h2 className="text-lg mt-4 font-semibold text-gray-700">
                  {place.place_name}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {place.road_address_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceContainer;