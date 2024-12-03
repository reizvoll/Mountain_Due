import { supabase } from './supabaseClient';

/* comment 목록 가져오기 */
export const fetchCommentsAPI = async (placeId) => {
    const response = await supabase.from('comments').select('*, user:user_id(*)').eq('place_id', placeId).order('created_at', { ascending: false });
    return response.data;
};

/* comment 추가 */
export const createCommentAPI = async (data) => {
    const { userId, placeId, content } = data;

    await supabase.from('comments').insert({
        content,
        user_id: userId,
        place_id: placeId
    });
};
