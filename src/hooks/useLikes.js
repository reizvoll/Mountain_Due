import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createLikeAPI, deleteLikeAPI, fetchLikesAPI } from '../api/like';

export const useLikes = ({ userId, placeId }) => {
    const queryClient = useQueryClient();

    /* like 정보 가져오기 */
    const { data: likes } = useQuery({
        queryKey: ['likes'],
        queryFn: () => fetchLikesAPI({ userId, placeId })
    });

    /* like 추가 */
    const createMutation = useMutation({
        mutationFn: createLikeAPI,
        onSuccess: () => queryClient.invalidateQueries(['likes'])
    });

    /* like 삭제 */
    const deleteMutation = useMutation({
        mutationFn: deleteLikeAPI,
        onSuccess: () => queryClient.invalidateQueries(['likes'])
    });

    return { likes, createMutation, deleteMutation };
};
