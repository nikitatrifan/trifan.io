import React, { memo } from "react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import { useSpacing } from "./Spacing";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  spacing?: string;
  className?: string;
}

function Container({ className: cl, spacing = "", ...restProps }: IProps) {
  const className = classNames(useStyles().wrapper, useSpacing(spacing), cl);
  return <div className={className} {...restProps} />;
}

const useStyles = createUseStyles({
  wrapper: {
    width: "90%",
    maxWidth: "1256px",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default memo(Container);
