"use client";
import { Card } from "@/app/types/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { RiChatDeleteFill } from "react-icons/ri";
import { TbBookmarkEdit } from "react-icons/tb";

const BookmarkCard = ({ title, image, url, description, id }: Card) => {
  const queryClient = useQueryClient();

  const deleteBookmark = async () => {
    try {
      const res = await axios.delete(`/api/update/${id}`);
      console.log("Bookmark deleted:", res.data);
      queryClient.invalidateQueries({ queryKey: ["create-data"] });
    } catch (err) {
      console.error("Error deleting Bookmark:", err);
    }
  };
  return (
    <div className="card-container">
      <div className="relative w-[70px] h-full">
        <Image
          src={image || "/pic1.jpg"}
          className="rounded-l-md"
          alt={title}
          fill
        />
      </div>
      <div className="w-[400px] py-2 flex justify-between">
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-semibold ">{title}</h3>
          <a href={url} className="text-blue-600 text-sm font-normal">
            {url}
          </a>
          <p className="card-text"> {description}</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Link href={`/update/${id}`}>
            <TbBookmarkEdit className="text-gray-950" size={23} />
          </Link>
          <RiChatDeleteFill
            className="text-red-700 cursor-pointer"
            size={23}
            onClick={deleteBookmark}
          />
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
