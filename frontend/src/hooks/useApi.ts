import { useAuth } from "@clerk/react";
import api from "@/lib/api";
import type { AxiosRequestConfig } from "axios";

export function useApi() {
  const { getToken } = useAuth();

  const getAuthConfig = async (
    config: AxiosRequestConfig = {},
  ): Promise<AxiosRequestConfig> => {
    const token = await getToken();

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const authenticatedApi = {
    get: async (url: string, config: AxiosRequestConfig = {}) => {
      return api.get(url, await getAuthConfig(config));
    },

    post: async (
      url: string,
      data?: unknown,
      config: AxiosRequestConfig = {},
    ) => {
      return api.post(url, data, await getAuthConfig(config));
    },

    put: async (
      url: string,
      data?: unknown,
      config: AxiosRequestConfig = {},
    ) => {
      return api.put(url, data, await getAuthConfig(config));
    },

    patch: async (
      url: string,
      data?: unknown,
      config: AxiosRequestConfig = {},
    ) => {
      return api.patch(url, data, await getAuthConfig(config));
    },

    delete: async (url: string, config: AxiosRequestConfig = {}) => {
      return api.delete(url, await getAuthConfig(config));
    },
  };

  return authenticatedApi;
}
