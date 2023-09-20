import { Metadata } from "next";
import Link from "next/link";

async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to fetch posts!")
  }

  return response.json();
}

export const metadata: Metadata = {
  title: "Blog page"
}

export default async function Blog() {
  const posts = await getData()

  return (
    <div>
      Blog page

      {
        !!posts?.length && (
          <ul>
            {
              posts.map(({ userId, id, title }) => (
                <li key={id} style={{border: "1px solid red"}}>
                  <Link href={`/blog/${id}`}>
                    {userId}:
                    {title}
                  </Link>
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  )
}