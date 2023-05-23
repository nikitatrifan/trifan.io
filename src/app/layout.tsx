import "normalize.css";
import "focus-visible";
import "@/styles/globals.scss";

import { Body } from "./body";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" translate="no">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <Body>{children}</Body>
    </html>
  );
}
