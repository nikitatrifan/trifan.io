import { useQuery } from "react-query";

export const useQuerySeats = () =>
  useQuery<{ taken: number; total: number }>("seats", () =>
    fetch("/api/seats").then((res) => res.json())
  );
