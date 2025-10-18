import Image from "next/image";
import Banner from "./component/Banner";
import LowerBanner from "./component/LowerBanner";
import ReadMore from "./component/ReadMore";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <LowerBanner></LowerBanner>
      <ReadMore></ReadMore>
    </div>
  );
}
