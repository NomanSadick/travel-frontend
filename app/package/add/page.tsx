"use client";
import { useForm } from "react-hook-form";

const AddPackagePage = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "", // Package title
      location: "", // Location
    },
  });

  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Package Title"
          {...register("title")}
        />
        <input
          type="text"
          placeholder="Location"
          {...register("location")}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPackagePage;
