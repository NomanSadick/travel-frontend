"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useAddPackageMutation } from "@/features/packages/packageApi";

const AddPackagePage = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      location: "",
      description: "",
      price: "", // ✅ Added price here
      highlights: [{ title: "", description: "" }],
      itinerary: [{ day: "", title: "", description: "" }],
      inclusions: [{ value: "" }],
      exclusions: [{ value: "" }],
    },
  });

  const [addPackage, { isLoading }] = useAddPackageMutation();

  const { fields: highlightFields, append: appendHighlight, remove: removeHighlight } = useFieldArray({ control, name: "highlights" });
  const { fields: itineraryFields, append: appendItinerary, remove: removeItinerary } = useFieldArray({ control, name: "itinerary" });
  const { fields: inclusionFields, append: appendInclusion, remove: removeInclusion } = useFieldArray({ control, name: "inclusions" });
  const { fields: exclusionFields, append: appendExclusion, remove: removeExclusion } = useFieldArray({ control, name: "exclusions" });

  const onSubmit = async (data: any) => {
    const uniqueInclusions = Array.from(
      new Map(data.inclusions.map((item: any) => [item.value.trim(), item])).values()
    ).filter((item) => item.value.trim());

    const uniqueExclusions = Array.from(
      new Map(data.exclusions.map((item: any) => [item.value.trim(), item])).values()
    ).filter((item) => item.value.trim());

    const finalData = {
      ...data,
      price: parseFloat(data.price), // ✅ Convert price to number
      inclusions: uniqueInclusions,
      exclusions: uniqueExclusions,
    };

    try {
      await addPackage(finalData).unwrap();
      alert("Package saved successfully!");
      reset();
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Package</h1>
      <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="text" placeholder="Package Title" {...register("title", { required: true })} className="border px-3 py-2 w-full" />
        <input type="text" placeholder="Location" {...register("location", { required: true })} className="border px-3 py-2 w-full" />
        <textarea placeholder="Package Description" {...register("description", { required: true })} className="border px-2 py-1 w-full" />

        {/* ✅ Price Field */}
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          {...register("price", { required: true })}
          className="border px-3 py-2 w-full"
        />

        {/* Highlights */}
        <h2 className="text-lg font-semibold mt-4">Highlights</h2>
        {highlightFields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-2 mb-4">
            <input placeholder="Highlight Title" {...register(`highlights.${index}.title`)} className="border px-2 py-1" />
            <textarea placeholder="Highlight Description" {...register(`highlights.${index}.description`)} className="border px-2 py-1" />
            <button type="button" onClick={() => removeHighlight(index)} className="text-red-500">✖ Remove Highlight</button>
          </div>
        ))}
        <button type="button" onClick={() => appendHighlight({ title: "", description: "" })} className="bg-blue-500 text-white px-3 py-1 rounded">+ Add Highlight</button>

        {/* Inclusions */}
        <h2 className="text-lg font-semibold mt-4">Inclusions</h2>
        {inclusionFields.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2 mb-2">
            <input placeholder="Inclusion" {...register(`inclusions.${index}.value`)} className="border px-2 py-1 w-full" />
            <button type="button" onClick={() => removeInclusion(index)} className="text-red-500">✖</button>
          </div>
        ))}
        <button type="button" onClick={() => appendInclusion({ value: "" })} className="bg-blue-500 text-white px-3 py-1 rounded">+ Add Inclusion</button>

        {/* Exclusions */}
        <h2 className="text-lg font-semibold mt-4">Exclusions</h2>
        {exclusionFields.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2 mb-2">
            <input placeholder="Exclusion" {...register(`exclusions.${index}.value`)} className="border px-2 py-1 w-full" />
            <button type="button" onClick={() => removeExclusion(index)} className="text-red-500">✖</button>
          </div>
        ))}
        <button type="button" onClick={() => appendExclusion({ value: "" })} className="bg-blue-500 text-white px-3 py-1 rounded">+ Add Exclusion</button>

        {/* Itinerary */}
        <h2 className="text-lg font-semibold mt-4">Itinerary</h2>
        {itineraryFields.map((item, index) => (
          <div key={item.id} className="flex flex-col gap-2 mb-4">
            <input placeholder="Day" {...register(`itinerary.${index}.day`)} className="border px-2 py-1" />
            <input placeholder="Itinerary Title" {...register(`itinerary.${index}.title`)} className="border px-2 py-1" />
            <textarea placeholder="Itinerary Description" {...register(`itinerary.${index}.description`)} className="border px-2 py-1" />
            <button type="button" onClick={() => removeItinerary(index)} className="text-red-500">✖ Remove Itinerary</button>
          </div>
        ))}
        <button type="button" onClick={() => appendItinerary({ day: "", title: "", description: "" })} className="bg-blue-500 text-white px-3 py-1 rounded">+ Add Itinerary Item</button>

        <button type="submit" disabled={isLoading} className="bg-green-600 text-white px-4 py-2 rounded">
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddPackagePage;
