import Comments from '../../components/pageComponents/for-detail/Comments';
import Information from '../../components/pageComponents/for-detail/Information';

const Detail = () => {
    return (
        <div className="w-[1200px] flex flex-col gap-4 mx-auto p-10">
            <h3 className="text-2xl font-bold">상세 정보</h3>
            <Information />
            <Comments />
        </div>
    );
};

export default Detail;
