import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

export type RequestItemStatus =
  | "created"
  | "requested"
  | "cancelled"
  | "fulfilled";

export type RequestSequenceItem = {
  createdAt: ReturnType<typeof dayjs>;
  initiatedAt?: ReturnType<typeof dayjs>;
  finishedAt?: ReturnType<typeof dayjs>;
  status: RequestItemStatus;
};

export type RequestsSequenceArray = Array<[string, RequestSequenceItem]>;

const REQUEST_ARRAY_LIMIT = [100, 200];

export const useRegisterRequests = () => {
  const [requestsMap] = useState<RequestsSequenceArray>(
    [] as RequestsSequenceArray
  );
  const [requests, setRequests] = useState<RequestsSequenceArray>(
    [] as RequestsSequenceArray
  );

  function checkForRequestsLimit() {
    const [resetLength, capLength] = REQUEST_ARRAY_LIMIT;
    if (requestsMap.length > capLength) {
      requestsMap.splice(requestsMap.length - resetLength, requestsMap.length);
    }
  }

  const updateRequest = (
    query: string,
    value: Partial<RequestSequenceItem>
  ) => {
    checkForRequestsLimit();

    if (query) {
      const requestIndex = (
        (requestsMap as any).findLastIndex as typeof requests.findIndex
      )(([queryInRequest]) => queryInRequest === query);

      const request = requestsMap[requestIndex];
      request[1] = Object.assign(
        {} as RequestSequenceItem,
        request?.[1] || {},
        value
      );
    }
  };

  const getRequestsSlice = () => {
    return requestsMap.slice(0).reverse();
  };

  const createRequest = (label: string) => {
    requestsMap.push([
      label,
      {
        createdAt: dayjs(),
        status: "created",
      },
    ]);
  };

  const createdRequestKickedOff = (label: string) => {
    setRequests(() => {
      updateRequest(label, {
        initiatedAt: dayjs(),
        status: "requested",
      });
      return getRequestsSlice();
    });
  };

  const registerRequestCancellation = (label: string) => {
    setRequests(() => {
      updateRequest(label, {
        finishedAt: dayjs(),
        status: "cancelled",
      });
      return getRequestsSlice();
    });
  };

  const registerRequestFulfilment = (label: string) => {
    setRequests(() => {
      updateRequest(label, {
        finishedAt: dayjs(),
        status: "fulfilled",
      });
      return getRequestsSlice();
    });
  };

  const clearRequestsHistory = () => {};

  return [
    requests,
    {
      createRequest,
      createdRequestKickedOff,
      registerRequestFulfilment,
      registerRequestCancellation,
      clearRequestsHistory,
    },
  ] as const;
};
