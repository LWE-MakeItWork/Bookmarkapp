"use client";
import { Card } from "@/app/types/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createformSchema = z.object({
  title: z.string().min(3, "title is required"),
  url: z.string().url({ message: "Invalid URL format" }),
  description: z.string().max(50, "Too long"),
  image: z.string().optional(),
});

type FormValues = z.infer<typeof createformSchema>;

const Updatepage = () => {
  const params = useParams();

  console.log(params.id);

  const fetchBookmark = async (): Promise<Card> => {
    const { data } = await axios.get(`/api/update/${params.id}`);
    return data;
  };

  const { isLoading, data, isError, error, refetch } = useQuery<Card, Error>({
    queryKey: ["create-data"],
    queryFn: fetchBookmark,
  });

  console.log(data);

  const {
    handleSubmit,
    register,
    setValue,

    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(createformSchema) });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setValue("title", data?.title);
      setValue("url", data?.url);
      setValue("description", data?.description);
      setValue("image", data?.image);
    }
  }, [data, setValue]);

  const onSubmit = async (data: FormValues) => {
    console.log("form submitted", data);

    try {
      const res = await axios.put(`/api/update/${params.id}`, data);
      console.log("Form updated:", res.data);
      queryClient.invalidateQueries({ queryKey: ["create-data"] });
      refetch();
    } catch (err) {
      console.error("Error updating Bookmark", err);
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message || "Something went wrong"}</h2>;
  }

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
          <button
            type="submit"
            className="px-4 py-2 border border-pink-800 rounded-lg bg-pink-600 text-white flex items-center justify-center gap-2 hover:bg-pink-500 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-colors duration-200"
          >
            <span className="text-lg font-semibold">Update</span>
          </button>
        </form>
      </div>
    </section>
  );
};
export default Updatepage;
