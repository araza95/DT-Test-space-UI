export const API_CONFIG = {
  BASE_URL: "https://api.spacexdata.com/v5/launches/query",
  DEFAULT_LIMIT: 10,
  QUERY_OPTIONS: {
    select: "id name date_utc success upcoming details failures links",
    sort: "date_utc",
  },
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

export const APP_CONFIG = {
  ITEMS_PER_PAGE: 10,
  IMAGE_FALLBACK: "/Image-not-found.png",
  DATE_FORMAT: "MMMM d, yyyy",
};

export const STATUS_MESSAGES = {
  LOADING: "Loading launches...",
  ERROR: "Error loading launches. Please try again.",
  NO_LAUNCHES: "No launches found.",
  RETRY: "Retry",
};
