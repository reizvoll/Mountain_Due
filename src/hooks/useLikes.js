import { useQuery } from '@tanstack/react-query';
import { fetchLikesAPI } from '../api/like';

export const useLikes = ({ userId, placeId }) => {
    /* like 정보 가져오기 */
    const { data: likes } = useQuery({
        queryKey: ['likes'],
        queryFn: () => fetchLikesAPI({ userId, placeId })
    });

    return { likes };
};
