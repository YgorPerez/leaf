import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery([
    "users.verify-otp",
    {
      hash,
    },
  ]);

  if (isLoading) {
    return <p>Verificando...</p>;
  }

  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

  return <p>Redirecionando...</p>;
}

function LoginForm() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  function onSubmit(values: CreateUserInput) {
    mutate({ ...values, redirect: router.asPath });
  }

  const hash = router.asPath.split("#token=")[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}

        {success && <p>Cheque o seu email</p>}
        <h1>Login</h1>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="maria.silva@exemplo.com"
          {...register("email")}
        />
        <button>Login</button>
      </form>

      <Link href="/register">Registrar</Link>
    </>
  );
}

export default LoginForm;
