import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function RegisterPage() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/login");
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Registrar</h1>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="maria.silva@exemplo.com"
          {...register("email")}
        />
        <br />
        label htmlFor="name">nome:</label>
        <input type="text" placeholder="João" {...register("name")} />
        <button type="submit">Registrar</button>
      </form>

      <Link href="/login">Login</Link>
    </>
  );
}

export default RegisterPage;
