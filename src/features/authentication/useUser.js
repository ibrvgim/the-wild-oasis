import { useQuery } from "@tanstack/react-query";
import { getCurrentUer } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUer,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
