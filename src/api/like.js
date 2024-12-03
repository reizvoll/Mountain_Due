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
