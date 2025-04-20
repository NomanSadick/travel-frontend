import { packageApi } from '@/features/packages/packageApi';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    [packageApi.reducerPath]: packageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(packageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// "use client";
// import { useForm, useFieldArray } from "react-hook-form";

// const AddPackagePage = () => {
//   const { register, handleSubmit, control } = useForm({
//     defaultValues: {
//       title: "",
//       location: "",
//       highlights: [{ title: "", description: "" }],
//       itinerary: [{ day: "", title: "", description: "" }],
//       inclusions: ["", ""], // Set default inclusion fields (2 default fields here)
//       exclusions: ["", ""], // Set default exclusion fields (2 default fields here)
//     },
//   });

//   const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({
//     control,
//     name: "highlights",
//   });

//   const { fields: itineraryFields, append: appendItinerary, remove: removeItinerary } = useFieldArray({
//     control,
//     name: "itinerary",
//   });

//   const { fields: inclusionFields, append: appendInclusion, remove: removeInclusion } = useFieldArray({
//     control,
//     name: "inclusions",
//   });

//   const { fields: exclusionFields, append: appendExclusion, remove: removeExclusion } = useFieldArray({
//     control,
//     name: "exclusions",
//   });

//   const onSubmit = (data: any) => {
//     console.log("Submitted Data:", data);
//     // You can call your POST API here
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Add New Package</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Package Title */}
//         <input
//           type="text"
//           placeholder="Package Title"
//           {...register("title")}
//           className="border px-3 py-2 w-full"
//         />

//         {/* Package Location */}
//         <input
//           type="text"
//           placeholder="Location"
//           {...register("location")}
//           className="border px-3 py-2 w-full"
//         />

//         <h2 className="text-lg font-semibold mt-4">Highlights</h2>
//         {/* Highlights Fields */}
//         {highlightFields.map((item, index) => (
//           <div key={item.id} className="flex flex-col gap-2 mb-4">
//             <input
//               placeholder="Highlight Title"
//               {...register(`highlights.${index}.title`)}
//               className="border px-2 py-1"
//             />
//             <textarea
//               placeholder="Highlight Description"
//               {...register(`highlights.${index}.description`)}
//               className="border px-2 py-1"
//             />
//             <button
//               type="button"
//               onClick={() => removeHighlight(index)}
//               className="text-red-500"
//             >
//               ✖ Remove Highlight
//             </button>
//           </div>
//         ))}
//         {/* Add Highlight Button */}
//         <button
//           type="button"
//           onClick={() => appendHighlight({ title: "", description: "" })}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           + Add Highlight
//         </button>

//         <h2 className="text-lg font-semibold mt-4">Inclusions</h2>
//         {/* Inclusions Fields */}
//         {inclusionFields.map((item, index) => (
//           <div key={item.id} className="flex flex-col gap-2 mb-4">
//             <input
//               placeholder="Inclusion"
//               {...register(`inclusions.${index}`)}
//               className="border px-2 py-1"
//             />
//             <button
//               type="button"
//               onClick={() => removeInclusion(index)}
//               className="text-red-500"
//             >
//               ✖ Remove Inclusion
//             </button>
//           </div>
//         ))}
//         {/* Add Inclusion Button */}
//         <button
//           type="button"
//           onClick={() => appendInclusion("")}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           + Add Inclusion
//         </button>

//         <h2 className="text-lg font-semibold mt-4">Exclusions</h2>
//         {/* Exclusions Fields */}
//         {exclusionFields.map((item, index) => (
//           <div key={item.id} className="flex flex-col gap-2 mb-4">
//             <input
//               placeholder="Exclusion"
//               {...register(`exclusions.${index}`)}
//               className="border px-2 py-1"
//             />
//             <button
//               type="button"
//               onClick={() => removeExclusion(index)}
//               className="text-red-500"
//             >
//               ✖ Remove Exclusion
//             </button>
//           </div>
//         ))}
//         {/* Add Exclusion Button */}
//         <button
//           type="button"
//           onClick={() => appendExclusion("")}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           + Add Exclusion
//         </button>

//         <h2 className="text-lg font-semibold mt-4">Itinerary</h2>
//         {/* Itinerary Fields */}
//         {itineraryFields.map((item, index) => (
//           <div key={item.id} className="flex flex-col gap-2 mb-4">
//             <input
//               placeholder="Day"
//               {...register(`itinerary.${index}.day`)}
//               className="border px-2 py-1"
//             />
//             <input
//               placeholder="Itinerary Title"
//               {...register(`itinerary.${index}.title`)}
//               className="border px-2 py-1"
//             />
//             <textarea
//               placeholder="Itinerary Description"
//               {...register(`itinerary.${index}.description`)}
//               className="border px-2 py-1"
//             />
//             <button
//               type="button"
//               onClick={() => removeItinerary(index)}
//               className="text-red-500"
//             >
//               ✖ Remove Itinerary
//             </button>
//           </div>
//         ))}
//         {/* Add Itinerary Button */}
//         <button
//           type="button"
//           onClick={() => appendItinerary({ day: "", title: "", description: "" })}
//           className="bg-blue-500 text-white px-3 py-1 rounded"
//         >
//           + Add Itinerary Item
//         </button>

//         {/* Submit Button */}
//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPackagePage;
