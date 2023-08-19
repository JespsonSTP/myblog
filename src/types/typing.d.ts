import { PortableTextBlock } from "sanity";

export type Post = {
    _id: string;
    publishedAt: string;
    title: string
    author: {
        name: string;
        image: string;
    };
    //comments: Comment[];
    //description: string;
    mainImage: {
        asset:{
            url: string;
        };
    };
    slug: string;
    body: PortableTextBlock[];
}