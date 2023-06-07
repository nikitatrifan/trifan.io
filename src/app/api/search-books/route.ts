// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import bookTitles from "@/assets/book-titles.json";
import { NextResponse } from "next/server";

export function returnAwaitedResults<T = any>(
  data: T,
  onComplete: (v: T) => void
) {
  const minWaitMs = 60;
  const maxWaitMs = 250;
  const randomTimeoutMs = minWaitMs + (maxWaitMs - minWaitMs) * Math.random();
  setTimeout(() => onComplete(data), randomTimeoutMs);
}

async function artificialFetchTitles() {
  return new Promise<typeof bookTitles>((resolve) =>
    returnAwaitedResults(bookTitles, resolve)
  );
}

type Data =
  | {
      success: true;
      titles: Array<string>;
      totalCount: number;
    }
  | {
      success: false;
      message: string;
    };

export async function POST(req: Request, res: Response) {
  try {
    const requestBody = await req.clone().json();
    const query = requestBody?.query?.toLowerCase();
    const limit = Number(requestBody?.limit ?? 0);

    const allTitles = await artificialFetchTitles();

    let titles: Array<string> = [];
    let totalCount = 0;

    if (query) {
      allTitles.forEach((title) => {
        const containsQuery = title.toLowerCase().includes(query);
        if (containsQuery) titles.push(title);
      });

      titles = titles.sort((a, b) => {
        if (a.toLowerCase().startsWith(query)) {
          return -1;
        }

        if (b.toLowerCase().startsWith(query)) {
          return 1;
        }

        return a.toLowerCase().indexOf(query) < b.toLowerCase().indexOf(query)
          ? -1
          : 1;
      });
    }

    totalCount = titles.length;

    if (limit > 0) {
      titles = titles.slice(0, limit);
    }

    return NextResponse.json({ success: true, titles, totalCount });
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message || "Oops, we've messed up.",
    });
  }
}
