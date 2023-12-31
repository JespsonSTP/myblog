'use client'
import { client } from "../../sanity/lib/client"
import Image from "next/image";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import bannerImgOne from "../../public/images/bannerImgOne.jpg";
import { urlForImage } from "../../sanity/lib/image";
import { Post } from "../types/typing"
import { groq } from "next-sanity";
import Link from 'next/link'

const query = groq`
*[_type=="post"] | order(_createdAt desc) [1...5]{
  _id,
    title,
    mainImage,
    "slug": slug.current
}`


function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="w-44 h-8 absolute bottom-32 z-30 right-10 border-[1px] border-gray-900 px-2 hover:border-gray-800 bg-black/50 hover:bg-black shadow-btnShadow overflow-hidden"
      onClick={onClick}
    >
      <div className="w-full h-full text-gray-300 text-sm uppercase relative flex items-center justify-end cursor-pointer group  ">
        <span className="absolute -translate-x-28 translate-y-0 group-hover:-translate-y-7 transition-transform duration-500">
          next
        </span>
        <span className="absolute -translate-x-28 translate-y-7 group-hover:translate-y-0 transition-transform duration-500">
          next
        </span>
        <span className="text-lg">
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="w-44 h-8 absolute bottom-32 z-30 left-10 border-[1px] border-gray-900 px-2 hover:border-gray-800 bg-black/50 hover:bg-black shadow-btnShadow overflow-hidden"
      onClick={onClick}
    >
      <div className="w-full h-full text-gray-300 text-sm uppercase relative flex items-center justify-between cursor-pointer group  ">
        <span className="text-lg">
          <FaChevronLeft />
        </span>
        <span className="absolute translate-x-24 translate-y-0 group-hover:-translate-y-7 transition-transform duration-500">
          previous
        </span>
        <span className="absolute translate-x-24 translate-y-7 group-hover:translate-y-0 transition-transform duration-500">
          previous
        </span>
      </div>
    </div>
  );
}

export default async function Banner() {
  const posts = await client.fetch(query);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="w-full h-auto md:h-[600px] relative">
      <Slider {...settings}>
      {posts.map((post: Post) => (
        <Link key={post._id} href={`/posts/${post.slug}`}>
        <div>
        <Image
          className="w-full h-auto md:h-[600px] object-cover"
          width={450} height={450}
          src={urlForImage(post.mainImage).url()!}
          loading={"eager"}
          alt="BlogListImages"
        />
        </div>
      </Link>
      ))}
      </Slider>
    </div>
  );
};

