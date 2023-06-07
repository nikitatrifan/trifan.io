import type { NextApiRequest, NextApiResponse } from "next";
import defaultTitles from "@/assets/book-titles.json";
import { returnAwaitedResults } from "../search-books/route";
import { shuffle } from "fast-shuffle";
import { NextResponse } from "next/server";

const bookTitles = shuffle(defaultTitles);

const categories = [
  "physics",
  "philosophy",
  "history",
  "trigonometry",
  "mathematics",
  "mystery",
  "novels",
  "fiction",
] as const;

type CategorizedBook = [(typeof categories)[number], Array<string>];
type BookRegistry = Array<CategorizedBook>;

const pickUniqueTitles = (
  books: BookRegistry,
  length: number
): Array<string> => {
  const normalizedBooks = books.map(([, list]) => list).flat();

  function pickUniqueTitle(): string {
    const titlePick = bookTitles.find((bookTitle) => {
      const bookRegistered = Boolean(
        normalizedBooks.find((registeredBookTitle) => {
          return registeredBookTitle === bookTitle;
        })
      );

      return !bookRegistered;
    }) as string;

    normalizedBooks.push(titlePick);

    return titlePick;
  }

  return new Array(length).fill(null).map(pickUniqueTitle);
};

const booksByCategory = categories.reduce((books, category, index) => {
  const length = Math.ceil(bookTitles.length / categories.length);

  books.push([category, pickUniqueTitles(books, length)]);

  return books;
}, [] as BookRegistry);

async function fetchCategories() {
  return new Promise<Array<string>>((resolve) =>
    returnAwaitedResults(categories as unknown as string[], resolve)
  );
}

async function fetchBooksByCategory(category: (typeof categories)[number]) {
  const result = booksByCategory.find(([cat]) => cat === category);
  const books = result?.[1];

  return new Promise<typeof books>((resolve) =>
    returnAwaitedResults(books, resolve)
  );
}

type Data =
  | {
      success: true;
      result: Array<string> | undefined;
      totalCount: number;
    }
  | {
      success: false;
      message: string;
    };

function prepareDataResponse(data: Array<string> | undefined, limit?: number) {
  const totalCount = data?.length ?? 0;
  let result = data ?? [];

  if (typeof limit !== "undefined" && limit > 0) {
    result = data?.slice(0, limit) ?? [];
  }

  return { success: true, result, totalCount } as const;
}

export async function POST(req: Request, res: Response) {
  try {
    const requestBody = await req.clone().json();
    const category = requestBody?.category?.toLowerCase();
    const limit = Number(requestBody?.limit ?? 0);

    const books = await fetchBooksByCategory(category);
    return NextResponse.json(prepareDataResponse(books, limit));
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message || "Oops, we've messed up.",
    });
  }
}

export async function GET() {
  try {
    const categories = await fetchCategories();
    return NextResponse.json(prepareDataResponse(categories));
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      message: e?.message || "Oops, we've messed up.",
    });
  }
}
