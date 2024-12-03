import { useParams } from 'react-router-dom';
import useUser from '../../../hooks/useUser';
import { useLikes } from '../../../hooks/useLikes';

const Likes = () => {
    const { id: spotId } = useParams();
    const { user } = useUser();
    const { likes } = useLikes({ userId: user.id, placeId: spotId });

    return (
        <p className="text-2xl text-black font-bold cursor-pointer">
            <span className="text-2xl text-red-500 font-bold">{likes?.isLiked ? '♥' : '♡'}</span> {likes?.count}
        </p>
    );
};

export default Likes;
