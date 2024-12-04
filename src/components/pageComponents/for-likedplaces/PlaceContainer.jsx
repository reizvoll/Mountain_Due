import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { fetchLikedPlaceIdsAPI } from "../../../api/like";
import { fetchPlaceAPI } from "../../../api/place";


const PlaceContainer = () => {
  const [likedPlaces, setLikedPlaces] = useState([]); // 좋아요한 장소 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const { user } = useUser(); // 현재 사용자 정보

  useEffect(() => {
    const fetchLikedPlaces = async () => {
      try {
        // 1. 좋아요한 장소 ID 가져오기
        const likedPlaceIds = await fetchLikedPlaceIdsAPI(user.id);
        console.log("Liked Place IDs:", likedPlaceIds); // 디버깅: 좋아요한 장소 ID 확인

        // 2. 각 장소의 상세 정보 가져오기
        const placesData = await Promise.all(
          likedPlaceIds.map(async (place_id) => {
            try {
              const place = await fetchPlaceAPI(place_id); // 개별 장소 정보 가져오기
              return place;
            } catch (error) {
              console.warn(`Error fetching place with ID ${place_id}:`, error); // 에러 발생 시 경고 로그
              return null; // 에러가 발생한 경우 null 반환
            }
          })
        );

        // 3. null 값을 제거하고 상태 업데이트
        setLikedPlaces(placesData.filter(Boolean)); // 유효한 데이터만 저장
      } catch (error) {
        console.error("Error fetching liked places:", error); // API 호출 실패 시 에러 로그
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    if (user?.id) {
      fetchLikedPlaces(); // 사용자 ID가 존재할 때만 데이터 가져오기 실행
    }
  }, [user?.id]); // user.id가 변경될 때마다 useEffect 실행

  // 로딩 중일 때 표시할 컴포넌트
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" />
      </div>
    );
  }

  // 좋아요한 장소가 없을 때 표시할 컴포넌트
  if (likedPlaces.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        좋아요한 장소가 없습니다.
      </div>
    );
  }

  // 좋아요한 장소 목록을 표시하는 컴포넌트
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">좋아요 한 장소</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {likedPlaces.map((place) => (
          <div
            key={place.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-xl font-bold">{place.place_name}</h2>
              <p className="text-gray-500">{place.road_address_name}</p>
              <p className="text-gray-500">{place.phone || "전화번호 없음"}</p>
            </div>
            <div className="h-40 bg-gray-200">
              {/* Replace with actual image URL if available */}
              <img
                src={`https://via.placeholder.com/400x300?text=${place.place_name}`}
                alt={place.place_name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceContainer;