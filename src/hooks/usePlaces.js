import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPlaceAPI, fetchPlaceAPI } from '../api/place';

export const usePlaces = (placeId) => {
    const queryClient = useQueryClient();

    /* place 상세 정보 가져오기 */
    const { data: place } = useQuery({
        queryKey: ['place'],
        queryFn: () => fetchPlaceAPI(placeId)
    });

    /* place 추가 */
    const createMutation = useMutation({
        mutationFn: createPlaceAPI,
        onSuccess: () => queryClient.invalidateQueries(['place']),
        onError: (e) => console.log('create error => ', e)
    });

    return { place, createMutation };
};
