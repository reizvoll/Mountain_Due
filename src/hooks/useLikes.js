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
        // onSuccess: () => queryClient.invalidateQueries(['likes'])
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: ['likes']
            });

            const prevLikes = queryClient.getQueryData(['likes']);

            queryClient.setQueryData(['likes'], (prev) => ({ count: prev.count + 1, isLiked: true }));

            return { prevLikes };
        },
        onError: (context) => {
            queryClient.setQueryData(['likes'], context.prevLikes);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['likes']
            });
        }
    });

    /* like 삭제 */
    const deleteMutation = useMutation({
        mutationFn: deleteLikeAPI,
        // onSuccess: () => queryClient.invalidateQueries(['likes'])
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: ['likes']
            });

            const prevLikes = queryClient.getQueryData(['likes']);

            queryClient.setQueryData(['likes'], (prev) => ({ count: prev.count - 1, isLiked: false }));

            return { prevLikes };
        },
        onError: (context) => {
            queryClient.setQueryData(['likes'], context.prevLikes);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['likes']
            });
        }
    });

    return { likes, createMutation, deleteMutation };
};
