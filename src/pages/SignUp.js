import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { checkIfUsernameTaken, createUser } from "../lib/firebase";
import { removeWhiteSpace } from "../lib/removeWhitespace";

export default function SignUp({ user }) {
  const [username, setUsername] = useState(() =>
    removeWhiteSpace(user?.displayName)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: { username } });

  async function onSubmit(data) {
    const u = `@${removeWhiteSpace(data.username)}`;
    await createUser({ user, username: u });
    window.location.replace('/')
  }

  return (
    <div className="w-full flex flex-col items-center">
      <header className="mt-20 mb-8 text-center">
        <h1 className="font-bold text-xl">Sign Up</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="w-80">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Create username</label>
          <div className="w-full bg-gray-200 py-2 px-4 flex items-center justify-between">
            <input data-testid="input-username"
              className="bg-transparent w-full outline-none"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Must be at least 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Must be less than 20 characters",
                },
                validate: (value) => checkIfUsernameTaken(value),
              })}
              type="text"
            />
            {errors.username ? (
              <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
            ) : null}
          </div>
        </div>
        <p data-testid="error-message" className="mt-1 text-red-400">{errors.username?.message}</p>
        <button data-testid="submit-button" className="bg-red-400 hover:brightness-95 transition-all duration-150 ease-out w-full py-2 mt-4 text-white font-semibold text-lg disabled:bg-gray-300">
          Sign Up
        </button>
      </form>
    </div>
  );
}
