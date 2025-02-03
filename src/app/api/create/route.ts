import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";
import ogs from "open-graph-scraper";
import { JSDOM } from "jsdom";

export const GET = async () => {
  try {
    const creates = await prisma.bookmark.findMany();
    return NextResponse.json(creates);
  } catch (error) {
    console.error("Error fetching creates data", error);
    return NextResponse.json(
      { error: "Failed to fetch create data" },
      { status: 500 }
    );
  }
};

async function fetchOGImage(url: string): Promise<string | null> {
  try {
    const options = { url };
    const { result } = await ogs(options);
    if (result.ogImage?.url) {
      return result.ogImage.url;
    }
  } catch (err) {
    console.error("Failed to fetch open graph image", err);
  }
  return null;
}

async function fetchFallbackImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const dom = new JSDOM(html);
    const imgElement = dom.window.document.querySelector("img");

    if (imgElement?.src) {
      const imageUrl = new URL(imgElement.src, url);
      return imageUrl.href;
    }
  } catch (err) {
    console.error("Failed to fetch fallback image:", err);
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    let imageUrl = await fetchOGImage(data.url);
    if (!imageUrl) {
      imageUrl = await fetchFallbackImage(data.url);
    }

    const bookmarkData = {
      ...data,
      image: imageUrl || null,
    };

    const res = await prisma.bookmark.create({
      data: bookmarkData,
    });
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    console.error("Error creating create", error);
    return NextResponse.json(
      { error: "Failed to create Bookmark" },
      { status: 500 }
    );
  }
}
