import { Card, ChevronIcon, Inline, Text, useThemeClassName } from "junoblocks";
import { useControlExpandableContent } from "@/sections/FAQ";
import { useEffect } from "react";

export const HeroCard = ({
  subtitle,
  title,
  subtitleSecondary,
  body,
}: {
  subtitle: string;
  title: string;
  subtitleSecondary: string;
  body: string;
}) => {
  const themeClass = useThemeClassName();

  const { expanded, toggleExpand, bindInnerContent, bindContent } =
    useControlExpandableContent();

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && expanded) {
      // @ts-ignore
      window.gtag("event", "toggle_hero_card", title);
    }
  }, [expanded, title]);

  const bodyReactNode = (
    <Text
      variant="body"
      color="secondary"
      css={{ paddingTop: "$4" }}
      {...bindInnerContent}
    >
      {body}
    </Text>
  );

  return (
    <Card
      className={themeClass}
      variant="primary"
      css={{ padding: "$8 $8 $8" }}
      onClick={toggleExpand}
    >
      <Inline justifyContent="space-between">
        <Text variant="caption" kind="symbol">
          {subtitle}
        </Text>
        <ChevronIcon
          color="secondary"
          css={{ transition: "transform .15s ease-out" }}
          rotation={expanded ? "90deg" : "-90deg"}
        />
      </Inline>
      <Text variant="header" css={{ paddingTop: "$4" }}>
        {title}
      </Text>
      <Text variant="caption" css={{ paddingTop: "$4" }}>
        {subtitleSecondary}
      </Text>
      <div {...bindContent}>{bodyReactNode}</div>
    </Card>
  );
};
