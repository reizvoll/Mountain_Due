import { useParams } from 'react-router-dom';
import useUser from '../../../hooks/useUser';
import { useLikes } from '../../../hooks/useLikes';

const Likes = () => {
    const { id: spotId } = useParams();
    const { user } = useUser();
    const { likes, createMutation, deleteMutation } = useLikes({ userId: user.id, placeId: spotId });

    /* 좋아요 추가 및 삭제 */
    const handleToggle = () => {
        likes.isLiked ? deleteMutation.mutate({ userId: user.id, placeId: spotId }) : createMutation.mutate({ userId: user.id, placeId: spotId });
    };

    return (
        <p className="text-2xl text-black font-bold cursor-pointer" onClick={handleToggle}>
            <span className="text-2xl text-red-500 font-bold">{likes?.isLiked ? '♥' : '♡'}</span> {likes?.count}
        </p>
    );
};

export default Likes;
