// features/packages/packageApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the structure for TimedItem
export interface TimedItem {
  value: string;
  time: string;
}

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

// Define the package type
export interface IPackage {
  _id?: string;
  title: string;
  category: string;
  price: number;
  duration: string;
  featured: boolean;
  image: string;
  description: string;
  days: number;
  nights: number;
  location: string;
  highlights: {
    title: string;
    description: string;
  }[];
  itinerary: ItineraryItem[];
  inclusions: TimedItem[];  // Updated to TimedItem[]
  exclusions: TimedItem[];  // Updated to TimedItem[]
}

// Create the API
export const packageApi = createApi({
  reducerPath: "packageApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://travel-backend-hcyy.onrender.com/api/" }),
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

// Hooks for using the API
export const {
  useGetPackagesQuery,
  useGetPackageQuery,
  useAddPackageMutation,
} = packageApi;
