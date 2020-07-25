import React, { memo, useMemo } from "react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import { useSpacing } from "./Spacing";

interface IProps {
  className?: string;
  type?: "heading" | "paragraph";
  size?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  weight?: "lighter" | "bold" | "normal" | "mono";
  spacing?: string;
}

function Text({
  type,
  size = type === "heading" ? 2 : 1,
  className,
  children,
  weight = "normal",
  spacing = "",
}: IProps) {
  const classes = useStyles({ weight });
  const spacingClassName = useSpacing(spacing);
  const [TextTag, tagClass] = useMemo(
    (): [string, string] => [
      type === "heading" ? `h${size}` : "p",
      classNames(
        classes.wrapper,
        // @ts-ignore
        classes[`${type}__${size}` as string],
        spacingClassName,
        className
      ),
    ],
    [type, size, className, spacingClassName, classes]
  );

  // @ts-ignore
  return <TextTag className={tagClass}>{children}</TextTag>;
}

const useStyles = createUseStyles({
  wrapper: {
    fontWeight: (props: IProps) => props.weight,
    fontFamily: "Sk-Modernist, Arial, sans-serif",
  },
  heading__1: {
    fontSize: "80px",
    lineHeight: "96px",
    letterSpacing: "0.89px",
  },
  heading__2: {
    fontSize: "48px",
    lineHeight: "64px",
    letterSpacing: "0.6px",
  },
  heading__3: {
    fontSize: "32px",
    lineHeight: "28px",
    letterSpacing: "0.5px",
  },
  heading__4: {
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "0.4px",
  },
  paragraph__1: {
    fontSize: "18px",
    lineHeight: "24px",
    letterSpacing: "0.25px",
  },
});

export default memo(Text);
