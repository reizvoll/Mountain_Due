import { supabase } from './supabaseClient';

/* like 정보 가져오기 */
export const fetchLikesAPI = async ({ userId, placeId }) => {
    const response = await supabase.from('likes').select('*').eq('place_id', placeId);
    const isLiked = response.data.find((item) => item.user_id === userId);
    return { count: response.data.length, isLiked: !!isLiked };
};

/* like 추가 */
export const createLikeAPI = async ({ userId, placeId }) => {
    await supabase.from('likes').insert({
        user_id: userId,
        place_id: placeId
    });
};

/* like 삭제 */
export const deleteLikeAPI = async ({ userId, placeId }) => {
    await supabase.from('likes').delete().eq('user_id', userId).eq('place_id', placeId);
};

/* 좋아요한 장소 데이터 보내주는 API 추가했어용 */
export const fetchLikedPlaceIdsAPI = async (userId) => {
    // `likes` 테이블에서 해당 `userId`의 좋아요 데이터를 가져옵니다.
    const response = await supabase
        .from('likes')
        .select('place_id')
        .eq('user_id', userId);

    if (response.error) {
        throw new Error(response.error.message); // 에러 발생 시 처리
    }

    // place_id의 배열만 반환
    return response.data.map((item) => item.place_id);
};