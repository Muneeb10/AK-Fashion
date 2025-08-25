import HeroSection from '../Components/HeroSection.jsx'
import Why_Choose_Us from '../Components/Why_Choose_Us.jsx'
import TestimonialSlider from '../Components/Testimonial.jsx'
import WhyUs from '../Components/Why_Us.jsx'
import ProductShowcase from '../Components/ProductShowcase.jsx'
import Benefits from '../Components/Benefits.jsx'
import HowToUse from '../Components/HowToUse.jsx'
import SimpleImageDisplay from '../Components/SimpleImageDisplay.jsx'
import FAQSection from '../Components/FAQSection.jsx'
import UrduHeadline from '../Components/UrduHeadline.jsx'

const Home = () => {
  return (
   <>
   <UrduHeadline />
   <HeroSection />
   <WhyUs />
   <ProductShowcase />
   <Benefits />
   <HowToUse />
   <SimpleImageDisplay />
   <TestimonialSlider />
   <FAQSection />
   </>
  );
};

export default Home;
