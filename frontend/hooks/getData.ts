"use client";

import useSWR from "swr";
import axios from "@/lib/axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const shouldFetch = typeof window !== "undefined";

// SWR configuration
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 5000,
  shouldRetryOnError: false,
};

export const getData = () => {
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? "/api/user" : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    },
  );

  return {
    data: data,
    error,
    isLoading,
    mutate,
  };
};
