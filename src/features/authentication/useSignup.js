import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupAPI,

    onSuccess: () => {
      toast.success(
        "Account succesfully created! Please verify account from the user's email address."
      );
    },
  });

  return { isLoading, signup };
}
