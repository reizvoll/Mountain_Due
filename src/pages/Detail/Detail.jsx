import Comments from '../../components/pageComponents/for-detail/Comments';
import Information from '../../components/pageComponents/for-detail/Information';
import Hero from '../../components/pageComponents/ui/Hero';
import Footer from '../../components/pageComponents/ui/Footer';

const Detail = () => {
    return (
        <div>
        <Hero />
        <div className="w-[1200px] flex flex-col gap-4 mx-auto p-10">
            <h3 className="text-2xl font-bold">상세 정보</h3>
            <Information />
            <Comments />
        </div>
        <Footer />
        </div>
    );
};

export default Detail;
