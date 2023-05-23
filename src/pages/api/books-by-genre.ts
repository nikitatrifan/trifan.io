// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import defaultTitles from "../../assets/book-titles.json";
import { returnAwaitedResults } from "@/pages/api/search-books";
import { shuffle } from "fast-shuffle";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const requestBody = req.body && JSON.parse(req.body);
    const category = requestBody?.category?.toLowerCase();
    const limit = Number(requestBody?.limit ?? 0);

    if (!category) {
      const categories = await fetchCategories();
      res.status(200).json(prepareDataResponse(categories, limit));
    }

    const books = await fetchBooksByCategory(category);
    res.status(200).json(prepareDataResponse(books, limit));
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e?.message || "Oops, we've messed up.",
    });
  }
}
