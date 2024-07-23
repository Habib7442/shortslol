import { useRouter } from "next/router";
import React, { useState } from "react";

import { getUser } from "@/lib/supabase/getUser";
import { supabase } from "@/lib/supabaseClient";
import { withTryCatch } from "@/lib/withTryCatch";

import Button from "@/components/buttons/Button";

import { useUser } from "@/contexts";
import toast from "react-hot-toast";

const LoginAccountForm = () => {
  const { setUser } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = withTryCatch(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setLoading(true);

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.log(error);
          throw new Error(error.message); // Throw error to be caught in catch block
        }

        // Assuming getUser is an asynchronous function
        const user = await getUser(data?.user?.id, data?.user?.email);

        console.log(user);

        setUser(user);

        // Redirect to the dashboard after a delay
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } catch (error: any) {
        console.log("Login error:", error);
        toast.error("Login failed. Please check your credentials.");
      } finally {
        setLoading(false);
      }
    }
  );

  const handleGetStartedSwitch = () => {
    router.push("/register");
  };

  return (
    <div className="flex w-[300px]">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-center text-3xl font-bold text-gray-900">Login</h1>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              variant="dark"
              className="flex w-full justify-center"
              isLoading={loading}
            >
              Login
            </Button>
          </div>
          {/* <p className='text-center text-gray-400'>or</p>
          <div>
            <Button
              type='button'
              variant='outline'
              className='mt-2 flex w-full justify-center gap-x-2'
              onClick={handleGoogleSignIn}
            >
              <p>Login with Google</p>
              <FaGoogle />
            </Button>
          </div> */}
        </form>
        <p
          className="cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => handleGetStartedSwitch()}
        >
          Don't have an account? Get started
        </p>
      </div>
    </div>
  );
};

export default LoginAccountForm;
