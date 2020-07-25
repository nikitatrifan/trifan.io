import React, { memo } from "react";
import Text from "../modules/Text";
import Container from "../modules/Container";

interface IProps {}

function IndexPage(props: IProps) {
  return (
    <Container spacing="mt-1 mb-1">
      <Text type="heading" size={2} spacing="mb-1">
        Hey! I'm Nikita Trifan,
      </Text>
      <Text type="heading" size={2}>
        A lead UI Engineer working at US Mobile.
      </Text>
    </Container>
  );
}

export default memo(IndexPage);
