import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

function CreatePostPage() {
  const { handleSubmit, register } = useForm<CreatePostInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["posts.create-post"], {
    onSuccess: ({ id }) => {
      router.push(`/posts/${id}`);
    },
  });

  function onSubmit(values: CreatePostInput) {
    mutate(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && error.message}

      <h1>Create posts</h1>

      <label htmlFor="title">Título:</label>
      <input
        type="text"
        placeholder="Guerra nas estrelas"
        {...register("title")}
      />
      <br />
      <label htmlFor="body">Conteúdo:</label>
      <textarea placeholder="Era uma vez..." {...register("body")} />
      <br />
      <button>Criar post</button>
    </form>
  );
}

export default CreatePostPage;
