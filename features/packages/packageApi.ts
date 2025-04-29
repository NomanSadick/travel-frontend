// features/packages/packageApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the package type
export interface IPackage {
  _id?: string;
  title: string;
  category: string;
  price: number;
  duration: string;
  featured: boolean;
  // Add other fields as needed
}

// Create the API
export const packageApi = createApi({
  reducerPath: "packageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),   //http://192.168.68.128:5000/api/
  tagTypes: ["Packages"], // Optional: useful for cache invalidation
  endpoints: (builder) => ({
    // GET /packages?query=params
    getPackages: builder.query<IPackage[], Record<string, any>>({
      query: (params) => ({
        url: "packages",
        params,
      }),
      providesTags: ["Packages"], // Optional
    }),

    // GET /packages/:id
    getPackage: builder.query<IPackage, string>({
      query: (id) => `packages/${id}`,
    }),

    // POST /packages
    addPackage: builder.mutation<IPackage, Partial<IPackage>>({
      query: (newPackage) => ({
        url: "packages",
        method: "POST",
        body: newPackage,
      }),
      invalidatesTags: ["Packages"], // Optional
    }),
  }),
});

// Hooks
export const {
  useGetPackagesQuery,
  useGetPackageQuery,
  useAddPackageMutation,
} = packageApi;
