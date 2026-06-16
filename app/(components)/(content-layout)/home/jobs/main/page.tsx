import HeroSection from "../jobportal/home/HeroSection";
import PopularJobsSection from "../jobportal/home/PopularJob";
import FeaturedJob from "../jobportal/home/FeaturedJob";
import WhyChooseUs from "../jobportal/home/WhyChooseUs";
import LearnMore from "../jobportal/home/LearnMore";
import CounterSection from "../jobportal/home/CounterSection";
import TopRecruiters from "../jobportal/home/TopRecruiters";
import PricingPlan from "../jobportal/home/PricingPlan";
import Pricing from "../pricing/page";
import JobLoc from "../jobportal/home/JobLoc";
import ClientSaid from "../jobportal/home/ClientSaid";
import NewsItem from "../jobportal/home/NewsItem";
import TopNav from "../jobportal/home/TopNav";

export default function page() {
  return (
    <div>
      {/* <TopNav /> */}
      <HeroSection />
      <PopularJobsSection />
      <FeaturedJob />
      <WhyChooseUs />
      <LearnMore />
      <CounterSection />
      <TopRecruiters />
      <Pricing />
      {/* <PricingPlan /> */}
      <JobLoc />
      <ClientSaid />
      <NewsItem />
    </div>
  );
}
