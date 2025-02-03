"use client";
import BookmarkCard from "../components/shared/BookmarkCard";
//import { BookmarkCardData } from "../components/shared/BookmarkCardData";
import { Card } from "../types/interfaces";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBookmark = async (): Promise<Card[]> => {
  const { data } = await axios.get("/api/create");
  return data;
};
const Savedpage = () => {
  const { isLoading, data, isError, error } = useQuery<Card[], Error>({
    queryKey: ["create-data"],
    queryFn: fetchBookmark,
  });

  if (isLoading) {
    return <h2>Loading.....</h2>;
  }

  if (isError) {
    return <h2>{error.message || "Something went wrong"}</h2>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {data?.map((item) => (
        <div key={item?.id}>
          <BookmarkCard
            title={item?.title}
            url={item?.url}
            description={item?.description}
            image={item?.image}
            id={item?.id}
          />
        </div>
      ))}
    </div>
  );
};
export default Savedpage;
