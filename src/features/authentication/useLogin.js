import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isLogining, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);

      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      console.error(error);
      toast.error("Provided email or password incorrect.");
    },
  });

  return { isLogining, login };
}

export default useLogin;
