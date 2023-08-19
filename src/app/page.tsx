import { client, getPosts } from "../../sanity/lib/client"
import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Banner from "../components/Banner";
import BannerBottom from "../components/BannerBottom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from 'next/image'
import { Post } from "../types/typing"
import Link from 'next/link'

import { groq } from "next-sanity";
import { urlForImage } from "../../sanity/lib/image";


const query = groq`
  *[_type=="post"]{
    _id,
      title,
      author -> {
        name,
        image
      },
      mainImage,
      "slug": slug.current
  }`

export default async function Home() {
  const posts = await client.fetch(query);
  return (
    <div>
       <Head>
        <title>My Blog | Journey in Tech</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        {/* ============ Header Start here ============ */}
        <Header />
        {/* ============ Header End here ============== */}
        {/* ============ Banner Start here ============ */}
        <Banner />
        {/* ============ Banner End here ============== */}
        <div className="max-w-7xl mx-auto h-60 relative">
          <BannerBottom />
        </div>
        {/* ============ Banner-Bottom End here ======= */}
        {/* ============ Post Part Start here ========= */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6">
          {posts.map((post: Post) => (
            <Link key={post._id} href={`/posts/${post.slug}`}>
              <div className="border-[1px] border-secondaryColor border-opacity-40 h-[450px] group">
                <div className="h-3/5 w-full overflow-hidden">
                  <Image width={380} height={350} src={urlForImage(post.mainImage).url()} alt="blog-main-Image" className="w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"/>
                </div>
                <div className="h-2/5 w-full flex flex-col justify-center">
                  <div className="flex justify-between items-center px-4 py-1 border-b-[1px] border-b-gray-500">
                    <p>{post.title}</p>
                    <img className="w-12 h-12 rounded-full object-cover" src={urlForImage(post.author.image).url()} alt="jespsonsaintpierre" />
                  </div>
                    <p className="py-2 px-4 text-base">
                    </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  )

}