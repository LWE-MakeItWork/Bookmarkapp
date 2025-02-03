"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";

const createformSchema = z.object({
  title: z.string().min(3, "title is required"),
  url: z.string().url({ message: "Invalid URL format" }),
  description: z.string().max(50, "Too long"),
  image: z.string().optional(),
});

type FormValues = z.infer<typeof createformSchema>;
const Createpage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(createformSchema) });

  const queryClient = useQueryClient();

  const onSubmit = async (data: FormValues) => {
    console.log("form submitted", data);

    try {
      const res = await axios.post("http://localhost:3000/api/create", data);
      console.log({ res });
      queryClient.invalidateQueries({ queryKey: ["create-data"] });
      reset();
    } catch (err) {
      console.error("Error creating Bookmark", err);
    }
  };

  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-[600px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col pb-4">
            <label
              htmlFor="title"
              className="text-white text-lg font-semibold pb-3 "
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              placeholder="Enter a title"
              className="w-full bg-white border-2 border-purple-300 text-black placeholder-gray-600 text-xl font-semibold outline-none rounded-md p-2 focus:border-purple-200 hover:bg-purple-100"
            />
            {errors.title && (
              <p className="text-red-600">{errors?.title?.message}</p>
            )}
          </div>
          <div className="flex flex-col pb-4">
            <label
              htmlFor="url"
              className="text-white text-lg font-semibold pb-3 "
            >
              Url
            </label>
            <input
              id="url"
              type="text"
              {...register("url")}
              placeholder="Enter a url"
              className="w-full bg-white border-2 border-purple-300 text-black placeholder-gray-600 text-xl font-semibold outline-none rounded-md p-2 focus:border-purple-200 hover:bg-purple-100"
            />
            {errors.url && (
              <p className="text-red-600">{errors?.url?.message}</p>
            )}
          </div>
          <div className="flex flex-col pb-4">
            <label
              htmlFor="description"
              className="text-white text-lg font-semibold pb-3 "
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="write description"
              className="w-full bg-white border-2 border-purple-300 text-black placeholder-gray-600 text-xl font-semibold outline-none rounded-md p-2 focus:border-purple-200 hover:bg-purple-100"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-600">{errors?.description?.message}</p>
            )}
          </div>
          <button className="px-4 py-2 border border-pink-800 rounded-lg bg-pink-600 text-white flex items-center justify-center gap-2 hover:bg-pink-500 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-colors duration-200">
            <span className="text-lg font-semibold">Submit</span>
          </button>
        </form>
      </div>
    </section>
  );
};
export default Createpage;
