import { MailIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { supabase } from "@/lib/supabaseClient";
import { withTryCatch } from "@/lib/withTryCatch";

import Button from "@/components/buttons/Button";

import { useUser } from "@/contexts";

const CreateAccount = ({ passedEmail }: { passedEmail?: string }) => {
  const { setUser } = useUser();
  const router = useRouter();

  const USERS_TABLE = "users";

  const [email, setEmail] = useState<string>(passedEmail || "");
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = withTryCatch(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
  
        if (error) {
          console.log(error);
          toast.error(error.message); // Display error message as toast
          return;
        }
  
        if (data?.user) {
          const { error: insertError } = await supabase.from(USERS_TABLE).insert([
            {
              id: data.user.id,
            },
          ]);
  
          if (insertError) {
            console.log(insertError);
            toast.error("An error occurred while saving user data.");
            return;
          }
  
          // Always show the success message for the sign-up attempt
          toast.success("Please check your email for the confirmation link.");
  
          // Check if email is confirmed
          if (data.user.email_confirmed_at === null) {
            setCheckEmail(true);
            return;
          } else {
            setUser({
              id: data.user.id,
              email: data.user.email || "",
              created_at: data.user.created_at,
              free_credits_used: 0,
            });
  
            router.push("/dashboard");
          }
        }
      } catch (error: any) {
        console.log(error);
        toast.error("An unexpected error occurred.");
      } finally {
        setLoading(false); // Ensure loading is reset
      }
    }
  );
  
  

  return (
    <div className="flex w-[300px]">
      <div className="w-full max-w-md space-y-8">
        {checkEmail ? (
          <div className="flex flex-col items-center gap-y-4 text-center">
            <MailIcon className="h-14 w-14" />
            <h1>Check your email</h1>
            <p>
              Almost there! Check your inbox for a validation email and click
              the link to start exploring.
            </p>
            <p
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => router.push("/login")}
            >
              Already have an account? Log in
            </p>
          </div>
        ) : (
          <>
            <div>
              <h1 className="text-center text-3xl font-bold text-gray-900">
                Create Account
              </h1>
              <form onSubmit={handleSignup} className="mt-8 space-y-6">
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
                    isLoading={loading}
                    className="flex w-full justify-center"
                  >
                    Create Account
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
              <p>Sign up with Google</p>
              <FaGoogle />
            </Button>
          </div> */}
              </form>
            </div>
            <p
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => router.push("/login")}
            >
              Already have an account? Log in
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
