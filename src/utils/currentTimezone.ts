export const currentTimezone = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset();
  try {
    return (
      Intl?.DateTimeFormat?.().resolvedOptions?.()?.timeZone || timezoneOffset
    );
  } catch (e) {
    return timezoneOffset;
  }
};
