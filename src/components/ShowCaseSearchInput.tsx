import {
  ButtonForWrapper,
  IconWrapper,
  Inline,
  Text,
  SearchIcon,
  Spinner,
  styled,
  Divider,
  RejectIcon,
  InfoIcon,
  useMedia,
} from "junoblocks";
import { ComponentPropsWithoutRef, useMemo, useRef, useState } from "react";

const StyledInput = styled("input", {
  display: "block",
  padding: "$2 0",
});

type TextInputProps = Omit<
  ComponentPropsWithoutRef<typeof StyledInput>,
  "results" | "value"
> & {
  value: string;
  loading?: boolean;
  results: Array<string>;
};

export const ShowCaseSearchInput = ({
  loading,
  value,
  results,
  onFocus,
  onBlur,
  ...props
}: TextInputProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [focused, bindInput] = useFocusedState({ onFocus, onBlur });
  const visibleNumberOfTokensInViewport = useMedia("sm") ? 4 : 8;

  return (
    <>
      <div ref={wrapperRef}>
        <ButtonForWrapper
          variant="secondary"
          state={focused ? "focused" : undefined}
          onClick={() => inputRef.current?.focus()}
          css={Object.assign(
            {
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexWrap: "wrap",
              borderTopLeftRadius: "0px",
            },
            focused ? { backgroundColor: "$colors$dark5 !important" } : {}
          )}
        >
          <Inline css={{ width: "100%", padding: "$8 0" }} gap={6}>
            <SearchIcon color="tertiary" />

            <StyledInput
              ref={inputRef}
              value={value}
              {...props}
              {...bindInput}
            />

            <IconWrapper
              icon={
                <Spinner color="primary" isLoading={loading} instant={false} />
              }
            />
          </Inline>

          <Inline css={{ padding: "0 $8" }}>
            <Divider />
          </Inline>

          <StyledDivForScrollContainer
            {...props}
            css={{
              width: "100%",
              height: `${visibleNumberOfTokensInViewport * 2.25}rem`,
              ...(props.css ? props.css : {}),
            }}
          >
            {results?.map((text) => {
              return (
                <StyledButtonForRow role="listitem" variant="ghost" key={text}>
                  <Text variant="body">
                    <HighlightedText value={text} highlight={value} />
                  </Text>
                </StyledButtonForRow>
              );
            })}
            {results?.length === 0 && !loading && (
              <Inline gap={6} css={{ padding: "$5 0" }}>
                {value ? (
                  <RejectIcon color="tertiary" />
                ) : (
                  <InfoIcon color="tertiary" />
                )}
                <Text variant="secondary">
                  {value
                    ? `No results for "${value}"`
                    : "Start typing to get results"}
                </Text>
              </Inline>
            )}
          </StyledDivForScrollContainer>
        </ButtonForWrapper>
      </div>
    </>
  );
};

export const useFocusedState = ({
  onFocus,
  onBlur,
}: {
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
} = {}) => {
  const [focused, setFocused] = useState(false);
  const bind = {
    onFocus(e: any) {
      setFocused(true);
      onFocus?.(e);
    },
    onBlur(e: any) {
      setFocused(false);
      onBlur?.(e);
    },
  };

  return [focused, bind] as const;
};

const HighlightedText = ({
  highlight,
  value,
}: {
  highlight: string;
  value: string;
}) => {
  return useMemo(() => {
    const firstSymbolIndex = value
      .toLowerCase()
      .indexOf(highlight.toLowerCase());
    const lastSymbolIndex = firstSymbolIndex + highlight.length;

    if (firstSymbolIndex < 0) {
      return <Truncate>{value}</Truncate>;
    }

    return (
      <Truncate>
        {firstSymbolIndex > 0 ? value.slice(0, firstSymbolIndex) : null}
        <TextHighlight>
          {value.slice(firstSymbolIndex, lastSymbolIndex)}
        </TextHighlight>
        {value.slice(lastSymbolIndex, value.length)}
      </Truncate>
    );
  }, [value, highlight]);
};

const Truncate = styled("span", {
  display: "inline-block",
  textOverflow: "ellipsis",
  maxWidth: "100%",
});

const TextHighlight = styled("span", {
  display: "inline-block",
  backgroundColor: "$colors$dark10",
  textOverflow: "ellipsis",
});

const StyledDivForScrollContainer = styled("div", {
  overflowY: "scroll",
});

const StyledButtonForRow = styled(ButtonForWrapper, {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "$4 $6 !important",
  userSelect: "none",
  cursor: "pointer",
  marginBottom: "$2",
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&:last-child": {
    marginBottom: 0,
  },
});
