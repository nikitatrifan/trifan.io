import { Column, Spinner } from "junoblocks";
import { getViewportHeightCssValue } from "@/components/FixMobileViewportHeightBounce";

export const SectionLoader = () => {
  return (
    <Column
      css={{ height: getViewportHeightCssValue(100), width: "100%" }}
      align="center"
      justifyContent="center"
    >
      <Spinner color="primary" />
    </Column>
  );
};
