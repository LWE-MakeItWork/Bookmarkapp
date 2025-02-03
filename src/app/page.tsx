"use client";
import axios from "axios";
import BookmarkCard from "./components/shared/BookmarkCard";
//import { BookmarkCardData } from "./components/shared/BookmarkCardData";
import { Card } from "./types/interfaces";
import { useQuery } from "@tanstack/react-query";

const fetchBookmark = async (): Promise<Card[]> => {
  const { data } = await axios.get("/api/create");
  return data;
};
export default function Home() {
  const { isLoading, data, isError, error } = useQuery<Card[], Error>({
    queryKey: ["create-data"],
    queryFn: fetchBookmark,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message || "Something went wrong"}</h2>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[600px]">
        <div className="flex flex-col items-center justify-center gap-3">
          {data?.map((item: Card, index: number) => (
            <div key={index}>
              <BookmarkCard
                title={item?.title}
                image={item?.image}
                url={item?.url}
                description={item?.description}
                id={item?.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
