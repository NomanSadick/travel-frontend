// features/packages/packageApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const packageApi = createApi({
  reducerPath: "packageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: (params) => ({
        url: "packages",
        params,
      }),
    }),
    getPackage: builder.query({
      query: (id) => `packages/${id}`,
    }),
    addPackage: builder.mutation({
      query: (newPackage) => ({
        url: "packages",
        method: "POST",
        body: newPackage,
      }),
    }),
  }),
});

export const { useGetPackagesQuery, useGetPackageQuery, useAddPackageMutation } = packageApi;
