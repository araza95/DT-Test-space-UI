import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_CONFIG, STATUS_MESSAGES } from "@/lib/config";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (
  url,
  options,
  retries = API_CONFIG.RETRY_ATTEMPTS
) => {
  try {
    const response = await axios.post(url, options);
    return response.data;
  } catch (error) {
    if (retries > 0 && error.response?.status >= 500) {
      await sleep(API_CONFIG.RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

/**
 * Custom hook for fetching SpaceX launches
 * @param {Object} params - The parameters for fetching launches
 * @param {number} params.page - The page number to fetch
 * @param {number} params.limit - The number of items per page
 * @returns {Object} The launches data, meta information, loading state and error
 */
export const useLaunches = ({ page = 1, limit = API_CONFIG.DEFAULT_LIMIT }) => {
  const [state, setState] = useState({
    docs: [],
    meta: {
      page: page,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLaunches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchWithRetry(API_CONFIG.BASE_URL, {
        options: {
          ...API_CONFIG.QUERY_OPTIONS,
          limit,
          page,
        },
      });

      setState({
        docs: data.docs,
        meta: {
          page: data.page,
          totalPages: data.totalPages,
          hasNextPage: data.hasNextPage,
          hasPrevPage: data.hasPrevPage,
        },
      });
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message;
      setError(errorMessage || STATUS_MESSAGES.ERROR);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  const retry = useCallback(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  return {
    launches: state.docs,
    meta: state.meta,
    loading,
    error,
    retry,
  };
};
