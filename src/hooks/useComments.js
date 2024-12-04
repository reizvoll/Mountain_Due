import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCommentAPI, deleteCommentAPI, fetchCommentsAPI, updateCommentAPI } from '../api/comment';
import useUser from './useUser';

export const useComments = (placeId) => {
    const queryClient = useQueryClient();

    const { user } = useUser();

    /* comment 목록 가져오기 */
    const { data: comments } = useQuery({
        queryKey: ['comments'],
        queryFn: () => fetchCommentsAPI(placeId)
    });

    /* comment 추가 */
    const createMutation = useMutation({
        mutationFn: createCommentAPI,
        // onSuccess: () => queryClient.invalidateQueries(['comments'])
        onMutate: async (newComment) => {
            await queryClient.cancelQueries({
                queryKey: ['comments']
            });

            const prevComments = queryClient.getQueryData(['comments']);

            queryClient.setQueryData(['comments'], (prev) => [
                {
                    content: newComment.content,
                    user_id: newComment.userId,
                    place_id: newComment.placeId,
                    user: user
                },
                ...prev
            ]);

            return { prevComments };
        },
        onError: (context) => {
            queryClient.setQueryData(['comments'], context.prevComments);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['comments']
            });
        }
    });

    /* comment 수정 */
    const updateMutation = useMutation({
        mutationFn: updateCommentAPI,
        // onSuccess: () => queryClient.invalidateQueries(['comments'])
        onMutate: async (newComment) => {
            await queryClient.cancelQueries({
                queryKey: ['comments']
            });

            const prevComments = queryClient.getQueryData(['comments']);

            queryClient.setQueryData(['comments'], (prev) => {
                prev[prev.findIndex((comment) => comment.id === newComment.commentId)].content = newComment.content;
                return prev;
            });

            return { prevComments };
        },
        onError: (context) => {
            queryClient.setQueryData(['comments'], context.prevComments);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['comments']
            });
        }
    });

    /* comment 삭제 */
    const deleteMutation = useMutation({
        mutationFn: deleteCommentAPI,
        // onSuccess: () => queryClient.invalidateQueries(['comments'])
        onMutate: async (commentId) => {
            await queryClient.cancelQueries({
                queryKey: ['comments']
            });

            const prevComments = queryClient.getQueryData(['comments']);

            queryClient.setQueryData(['comments'], (prev) => prev.filter((comment) => comment.id !== commentId));

            return { prevComments };
        },
        onError: (context) => {
            queryClient.setQueryData(['comments'], context.prevComments);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['comments']
            });
        }
    });

    return { comments, createMutation, updateMutation, deleteMutation };
};
