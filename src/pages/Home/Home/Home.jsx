import About from "../About/About";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";

const Home = () => {
    return (
        <div className='space-y-5 lg:space-y-12 '>
            <Banner></Banner>
            <div className=' ' >
                <About></About>
            </div>
            <Services></Services>
        </div>
    );
};

export default Home;