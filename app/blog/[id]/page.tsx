import { Metadata } from "next";

async function getDataById(id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch post!")
  }

  return response.json();
}

type Post = {
  params: {
    id: string
  }
}

export async function generateMetadata(
  {
    params: {
      id,
    },
  }: Post,
): Promise<Metadata> {
  const post = await getDataById(id)

  return {
    title: post.title || id,
  }
}

export default async function Post(
  {
    params: {
      id,
    },
  }: Post
) {
  const post = await getDataById(id)

  return (
    <div>
      {
        !!post?.title && (
          <h1>{post.title}</h1>
        )
      }
      {
        !!post?.body && (
          <p>{post.body}</p>
        )
      }
    </div>
  )
}
