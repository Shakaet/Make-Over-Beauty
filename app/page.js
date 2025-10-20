import Image from "next/image";
import Banner from "./component/Banner";
import LowerBanner from "./component/LowerBanner";
import ReadMore from "./component/ReadMore";
import PureSimple from "./component/PureSimple";
import TredingProduct from "./component/TredingProduct";
import Top from "./component/Top";
// import ImportedProduct from "./component/ImportedProduct";
// import Testimonial from "./component/Testimonial";
// import ProductCategory from "./component/ProductCategory";


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
      <LowerBanner></LowerBanner>
      <ReadMore></ReadMore>
      <PureSimple></PureSimple>
      <TredingProduct></TredingProduct>
      <Top props={ANNOUNCEMENTS}></Top>
      {/* <ImportedProduct></ImportedProduct>
      <Testimonial></Testimonial>
      <ProductCategory></ProductCategory> */}
    </div>
  );
}
