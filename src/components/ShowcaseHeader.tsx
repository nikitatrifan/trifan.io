import { Text, useMedia } from "junoblocks";
import { ReactNode } from "react";

export const ShowcaseHeader = ({
  subtitle,
  title,
  body,
}: {
  subtitle: ReactNode;
  title: ReactNode;
  body: ReactNode;
}) => {
  const mobile = useMedia("sm");
  return (
    <>
      <Text
        variant="body"
        color="tertiary"
        align="left"
        css={{ padding: "$12 0 $18" }}
      >
        {subtitle}
      </Text>
      <Text kind="symbol" variant={mobile ? "title" : "header"} align="left">
        {title}
      </Text>
      <Text align="left" css={{ padding: "$12 0 $18", maxWidth: "512px" }}>
        {body}
      </Text>
    </>
  );
};
