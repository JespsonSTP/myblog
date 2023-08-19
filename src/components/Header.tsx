import Image from "next/image";
import Link from "next/link";
import logoDark from "../../public/images/logoDark.png";

const Header = () => {
  return (
    <div className="w-full h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <div>
            <h1><span className="font-bold text-xl md:text-3xl">JSP</span></h1>
          </div>
        </Link>
        <div>
          <ul className="hidden lg:inline-flex gap-8 uppercase text-sm font-semibold">
            <li className="headerLi">Home</li>
            <li className="headerLi">Posts</li>
            <li className="headerLi">Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;