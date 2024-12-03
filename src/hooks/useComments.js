import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCommentAPI, fetchCommentsAPI } from '../api/comment';

export const useComments = (placeId) => {
    const queryClient = useQueryClient();

    /* comment 목록 가져오기 */
    const { data: comments } = useQuery({
        queryKey: ['comments'],
        queryFn: () => fetchCommentsAPI(placeId)
    });

    /* comment 추가 */
    const createMutation = useMutation({
        mutationFn: createCommentAPI,
        onSuccess: () => queryClient.invalidateQueries(['comments'])
    });

    return { comments, createMutation };
};
