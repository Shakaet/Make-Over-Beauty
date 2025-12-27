import Image from "next/image";
import Banner from "./component/Banner";
import LowerBanner from "./component/LowerBanner";
import ReadMore from "./component/ReadMore";
import PureSimple from "./component/PureSimple";
import TredingProduct from "./component/TredingProduct";
import Top from "./component/Top";
import ProductCategory from "./component/ProductCategory";
import MarqueLogo from "./component/MarqueLogo";
import WhatsPeopleSay from "./component/WhatsPeopleSay";
import WhyChooseUs from "./component/WhyChooseUs";
import BrandStrip from "./component/BrandStrip";
import ExploreByCategory from "./component/ExploreByCategory";
import LiveVideos from "./component/LiveVideos";
import HappyCustomers from "./component/HappyCustomers";
import InstagramVideoSlider from "./component/InstagramVideoSlider";


const ANNOUNCEMENTS = [
  "10% off",
  "10% off",
  "10% off",
  "10% off",
  "10% off",
  "10% off",
  "10% off",
]
export default function Home() {
  return (
    <div className="home-bg bg-fixed bg-cover bg-center bg-no-repeat">
      <Banner></Banner>
      <ExploreByCategory />
      <BrandStrip />
      <ProductCategory></ProductCategory>
      <PureSimple></PureSimple>
      <WhyChooseUs />
      <HappyCustomers />
      <LiveVideos />
      <Top props={ANNOUNCEMENTS}></Top>
      <InstagramVideoSlider />
      <ReadMore></ReadMore>
      {/* <TredingProduct></TredingProduct> */}
      {/* <ImportedProduct></ImportedProduct>
      <Testimonial title={`TESTIMONIAL`} des={`Our Clients Reviews`}></Testimonial>
      <MarqueLogo></MarqueLogo>
      <WhatsPeopleSay></WhatsPeopleSay>
      <NewsUpdates></NewsUpdates>
      <LowerBanner></LowerBanner> */}
      {/* <TagUs></TagUs> */}
    </div>
  );
}
