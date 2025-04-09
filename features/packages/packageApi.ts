import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const packageApi = createApi({
    reducerPath: "packageApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) => ({
        getPackages: builder.query({
            query: (params) => ({
                url: 'packages',
                params,
            })
        }),
    }),
})

export const { useGetPackagesQuery } = packageApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const packageApi = createApi({
//   reducerPath: 'packageApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
//   endpoints: (builder) => ({
//     getPackages: builder.query({
//       query: () => 'packages',
//     }),
//     createPackage: builder.mutation({
//       query: (newPackage) => ({
//         url: 'packages',
//         method: 'POST',
//         body: newPackage,
//       }),
//     }),
//   }),
// });

// export const { useGetPackagesQuery, useCreatePackageMutation } = packageApi;