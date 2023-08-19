'use client'
import { client } from "../../sanity/lib/client"
import React from "react";
import { MdOutlineMonitor } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { GoComment } from "react-icons/go";
import { Post } from "../types/typing"
import Link from 'next/link'

import { groq } from "next-sanity";


const query = groq`
*[_type=="post"] | order(_createdAt desc) [1]{
  _id,
    publishedAt,
    title,
    author ->{
        name,
      },
    "slug": slug.current
}`


export default async function BannerBottom() {
  const post = await client.fetch(query);
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:gap-0 lg:flex-row justify-center items-center h-auto lg:h-60 bg-bgColor text-white py-10 px-8 -mt-20 z-50">
      <div className="w-full lg:w-[60%] flex flex-col gap-3">
        <p className="text-sm uppercase font-bodyFont font-semibold text-white/50">
          My Blog
        </p>
        <h3 className="font-bold text-xl md:text-3xl">
          {post.title}
        </h3>
        <p className="text-xs text-white/50">{post.author.name} / {new Date(post.publishedAt).toLocaleDateString()}</p>
      </div>
    </div>
  )

}