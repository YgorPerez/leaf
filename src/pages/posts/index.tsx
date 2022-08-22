import Link from "next/link";
import { trpc } from "../../utils/trpc";

function PostListingPage() {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);

  interface Post {
    id: string;
    title: string;
    body?: string;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data?.map((post: Post) => {
        return (
          <article key={post.id}>
            <p>{post.title}</p>
            <Link href={`/posts/${post.id}`}>Read post</Link>
          </article>
        );
      })}
    </div>
  );
}

export default PostListingPage;
