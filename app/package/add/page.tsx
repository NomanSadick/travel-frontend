"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { useAddPackageMutation } from "@/features/packages/packageApi";

const AddPackagePage = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      location: "",
      description: "",
      price: "",
      days: "",
      nights: "",
      highlights: [{ title: "", description: "" }],
      itinerary: [{ day: "", title: "", description: "" }],
      inclusions: [{ value: "" }],
      exclusions: [{ value: "" }],
    },
  });

  const [addPackage, { isLoading }] = useAddPackageMutation();

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({ control, name: "highlights" });

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({ control, name: "itinerary" });

  const {
    fields: inclusionFields,
    append: appendInclusion,
    remove: removeInclusion,
  } = useFieldArray({ control, name: "inclusions" });

  const {
    fields: exclusionFields,
    append: appendExclusion,
    remove: removeExclusion,
  } = useFieldArray({ control, name: "exclusions" });

  interface PackageFormData {
    title: string;
    location: string;
    description: string;
    price: string;
    days: string;
    nights: string;
    image: undefined;
    highlights: { title: string; description: string }[];
    itinerary: { day: string; title: string; description: string }[];
    inclusions: { value: string }[];
    exclusions: { value: string }[];
  }

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("location", data.location);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("days", data.days);
    formData.append("nights", data.nights);
    formData.append("image", data.image[0]);

    formData.append("highlights", JSON.stringify(data.highlights));
    formData.append("itinerary", JSON.stringify(data.itinerary));
    formData.append("inclusions", JSON.stringify(data.inclusions));
    formData.append("exclusions", JSON.stringify(data.exclusions));

    try {
      await addPackage(formData as any).unwrap();
      alert("Package saved successfully!");
      reset();
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-xl mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Add New Package
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            {...register("title", { required: true })}
            placeholder="Package Title"
            className={inputClass}
          />
          <input
            {...register("location", { required: true })}
            placeholder="Location"
            className={inputClass}
          />
          <input
            {...register("price", { required: true })}
            placeholder="Price"
            type="number"
            min="0"
            step="0.01"
            className={inputClass}
          />
          <input
            {...register("days", { required: true })}
            placeholder="Number of Days"
            type="number"
            min="1"
            className={inputClass}
          />
          <input
            {...register("nights", { required: true })}
            placeholder="Number of Nights"
            type="number"
            min="0"
            className={inputClass}
          />
        </div>

        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          rows={4}
          className={textareaClass}
        />
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
        />

        {/* Highlights */}
        <Section title="Highlights">
          {highlightFields.map((item, index) => (
            <div key={item.id} className={highlightBoxClass}>
              <input
                {...register(`highlights.${index}.title`)}
                placeholder="Highlight Title"
                className={inputClass}
              />
              <textarea
                {...register(`highlights.${index}.description`)}
                placeholder="Highlight Description"
                className={textareaClass}
              />
              <RemoveButton onClick={() => removeHighlight(index)} />
            </div>
          ))}
          <AddButton
            label="Add Highlight"
            onClick={() => appendHighlight({ title: "", description: "" })}
          />
        </Section>

        {/* Inclusions */}
        <Section title="Inclusions">
          {inclusionFields.map((item, index) => (
            <div key={item.id} className="flex gap-3 items-center">
              <input
                {...register(`inclusions.${index}.value`)}
                placeholder="Inclusion"
                className={`${inputClass} flex-1`}
              />
              <RemoveButton onClick={() => removeInclusion(index)} />
            </div>
          ))}
          <AddButton
            label="Add Inclusion"
            onClick={() => appendInclusion({ value: "" })}
          />
        </Section>

        {/* Exclusions */}
        <Section title="Exclusions">
          {exclusionFields.map((item, index) => (
            <div key={item.id} className="flex gap-3 items-center">
              <input
                {...register(`exclusions.${index}.value`)}
                placeholder="Exclusion"
                className={`${inputClass} flex-1`}
              />
              <RemoveButton onClick={() => removeExclusion(index)} />
            </div>
          ))}
          <AddButton
            label="Add Exclusion"
            onClick={() => appendExclusion({ value: "" })}
          />
        </Section>

        {/* Itinerary */}
        <Section title="Itinerary">
          {itineraryFields.map((item, index) => (
            <div key={item.id} className={highlightBoxClass}>
              <input
                {...register(`itinerary.${index}.day`)}
                placeholder="Day"
                className={inputClass}
              />
              <input
                {...register(`itinerary.${index}.title`)}
                placeholder="Itinerary Title"
                className={inputClass}
              />
              <textarea
                {...register(`itinerary.${index}.description`)}
                placeholder="Itinerary Description"
                className={textareaClass}
              />
              <RemoveButton onClick={() => removeItinerary(index)} />
            </div>
          ))}
          <AddButton
            label="Add Itinerary Item"
            onClick={() =>
              appendItinerary({ day: "", title: "", description: "" })
            }
          />
        </Section>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all"
        >
          {isLoading ? "Submitting..." : "Submit Package"}
        </button>
      </form>
    </div>
  );
};

// Reusable UI Components
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-3 text-gray-700">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const AddButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-1.5 rounded-md text-sm font-medium transition-all"
  >
    + {label}
  </button>
);

const RemoveButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-red-500 hover:text-red-600 text-sm font-medium"
  >
    ✖ Remove
  </button>
);

// Tailwind classes
const inputClass =
  "border border-gray-300 rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-blue-300 outline-none";
const textareaClass =
  "border border-gray-300 rounded-lg px-4 py-2 w-full text-sm resize-none focus:ring-2 focus:ring-blue-300 outline-none";
const highlightBoxClass =
  "bg-gray-50 p-4 border border-gray-200 rounded-lg space-y-3 shadow-sm";

export default AddPackagePage;
