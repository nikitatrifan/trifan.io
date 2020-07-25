import React, { useMemo } from "react";
import { createUseStyles, Styles } from "react-jss";
import classNames from "classnames";

// offset has a support of the following format:
// {offsetType}{offsetDirection}-{offsetValue};
// where offset type is either p or m
// and the direction is t, r, b, l
// EXAMPLE: "mb-1 mt-1 pt-2 pb-2";
// returns a className that sets styles accordingly.
export function useSpacing(offset: string): string {
  const [margin, padding] = useMemo((): [OffsetType, OffsetType] => {
    let m: OffsetType = {};
    let p: OffsetType = {};

    offset
      .split(" ")
      .filter(Boolean)
      .forEach((offsetConstructor: string) => {
        const [offsetData, offsetValue] = offsetConstructor.split("-");
        const [offsetType, offsetDirection] = offsetData.split("") as [
          "m" | "p",
          typeof OFFSET_DIRECTIONS[number]
        ];

        if (
          !OFFSET_DIRECTIONS.includes(offsetDirection) ||
          (offsetType !== "m" && offsetType !== "p")
        ) {
          console.error("Provided offset doesn't match the API format", {
            offsetType,
            offsetDirection,
            offsetValue,
          });
          return;
        }

        const value = parseInt(offsetValue, 10);
        const direction = getOffsetDirection(offsetDirection);
        if (offsetType === "m") {
          m[direction] = value;
        } else if (offsetType === "p") {
          p[direction] = value;
        }
      });

    return [m, p];
  }, [offset]);

  const { spacing } = useStyles({ margin, padding });

  return spacing;
}

const OFFSET_DIRECTIONS = ["t", "r", "l", "b"];
function getOffsetDirection(
  direction: typeof OFFSET_DIRECTIONS[number]
): "top" | "right" | "bottom" | "left" {
  switch (direction) {
    case "t":
      return "top";
    case "r":
      return "right";
    case "l":
      return "left";
    case "b":
    default:
      return "bottom";
  }
}

type OffsetType = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

const OFFSET_MULTIPLIER = 8;
function multiplyOffsets({ top, right, bottom, left }: OffsetType): OffsetType {
  let newOffsets: OffsetType = {};

  if (typeof top === "number") {
    newOffsets.top = top * OFFSET_MULTIPLIER;
  }
  if (typeof right === "number") {
    newOffsets.right = right * OFFSET_MULTIPLIER;
  }
  if (typeof left === "number") {
    newOffsets.left = left * OFFSET_MULTIPLIER;
  }
  if (typeof bottom === "number") {
    newOffsets.bottom = bottom * OFFSET_MULTIPLIER;
  }

  return newOffsets;
}

type PaddingMarginOffsetType = { margin: OffsetType; padding: OffsetType };

function parseOffsetsToStyles(
  offsets: OffsetType,
  type: "padding" | "margin"
): Styles {
  let styles: Styles = {};

  for (const [name, value] of Object.entries(offsets)) {
    if (typeof value !== "undefined" && typeof name !== "undefined") {
      // @ts-ignore
      styles[`${type}-${name}`] = value;
    }
  }

  return styles;
}

const useStyles = createUseStyles({
  spacing({ margin, padding }: PaddingMarginOffsetType): Styles {
    const multipliedMargin = margin && multiplyOffsets(margin);
    const multipliedPadding = padding && multiplyOffsets(padding);

    const parsedMargin = multipliedMargin
      ? parseOffsetsToStyles(multipliedMargin, "margin")
      : {};
    const parsedPadding = multipliedPadding
      ? parseOffsetsToStyles(multipliedPadding, "padding")
      : {};

    return {
      ...parsedMargin,
      ...parsedPadding,
    };
  },
});

export function Spacing({
  className: cl,
  spacing,
  children,
}: {
  className?: string;
  spacing: string;
  children?: React.ReactChildren;
}) {
  const className = classNames(useSpacing(spacing), cl);
  return <div className={className}>{children}</div>;
}
