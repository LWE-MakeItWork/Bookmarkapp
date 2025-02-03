import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

type Params = {
  id: string;
};

export const GET = async (req: Request, { params }: { params: Params }) => {
  try {
    const { id } = await params;
    const query = await prisma.bookmark.findUnique({
      where: { id },
    });
    if (!query) {
      return NextResponse.json(
        { error: "Bookmark not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(query);
  } catch (error) {
    console.error("Error fetching bookmark data", error);
    return NextResponse.json(
      { error: "Failed to fetch bookmark data" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: Request, { params }: { params: Params }) => {
  try {
    const data = await req.json();
    const { id } = await params;

    const updatedBookmark = await prisma.bookmark.update({
      where: { id },
      data: data,
    });
    return NextResponse.json(updatedBookmark);
  } catch (error) {
    console.error("Error updating bookmark data", error);
    return NextResponse.json(
      {
        error: "Failed to update bookmark data",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (req: Request, { params }: { params: Params }) => {
  try {
    const { id } = await params;
    const deletedBookmark = await prisma.bookmark.delete({
      where: { id },
    });
    return NextResponse.json(deletedBookmark);
  } catch (error) {
    console.error("Error deleting bookmark data", error);
    return NextResponse.json(
      { error: "Failed to delete bookmark data" },
      { status: 500 }
    );
  }
};
