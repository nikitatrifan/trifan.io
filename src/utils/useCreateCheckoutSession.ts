import { useQuery } from "react-query";

export const useCreateCheckoutSession = (
  options: Parameters<typeof useQuery>[2] = {}
) => {
  return useQuery(
    "@checkout-session",
    () => {
      return fetch("/api/create-checkout-session").then((res) => res.json());
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      ...(options as any),
    }
  );
};
