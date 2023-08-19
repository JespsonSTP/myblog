import { client } from "../../../../sanity/lib/client"
import { PortableText } from "@portabletext/react"
import Header from "@/components/Header"
import { getPost } from "../../../../sanity/lib/client"
import Footer from "@/components/Footer"
import { groq } from "next-sanity";
import { urlForImage } from "../../../../sanity/lib/image";


const query = groq`*[_type == "post" && slug.current == $slug][0]{
    _id,
      publishedAt,
      title,
      author ->{
        name,
        image
      },
      mainImage,
      slug,
      body
  }`
type Props = {
    params:{post: string}
}

export default async function Post({ params }: Props) {
    
    const slug = params.post
    const post = await client.fetch(query,{
        slug: slug
    });
    //console.log(post)
    //setTimeout(() => 10)
    //const post = await getPost(slug)
    //console.log(post)
    return(
        <div>
            <Header />
            <img />
            <div>
                <article>
                    <h1>{post?.title}</h1>
                    <div>
                        <img src={post?.author?.image} alt="the-authors-image" />
                        <p>Blog post by <span>{post?.author?.name}</span> - Published at {new Date(post?.publishedAt).toLocaleDateString()}</p>
                    </div>
                    <div className="mt-10">
                        <PortableText  
                            value={post?.body}
                        />
                    </div>
                </article>
            </div>
            <Footer />
        </div>
    )
}