import { supabase } from './supabaseClient';

/* place 상세 정보 가져오기 */
export const fetchPlaceAPI = async (placeId) => {
    const response = await supabase.from('places').select('*').eq('id', placeId);
    return response.data;
};

/* place 추가 */
export const createPlaceAPI = async (data) => {
    const { id, place_name, road_address_name, x, y } = data;

    await supabase.from('places').insert({
        id,
        place_name,
        road_address_name,
        longitude: x,
        latitude: y
    });
};
