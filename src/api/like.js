import { supabase } from './supabaseClient';

/* like 정보 가져오기 */
export const fetchLikesAPI = async ({ userId, placeId }) => {
    const response = await supabase.from('likes').select('*').eq('place_id', placeId);
    const isLiked = response.data.find((item) => item.user_id === userId);
    return { count: response.data.length, isLiked: !!isLiked };
};
