import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_CONFIG, STATUS_MESSAGES } from "@/lib/config";

// @ref: This custom hook is used to fetch SpaceX launches with pagination, inspiration is taken from <https://medium.com/@sankalpa115/custom-hooks-to-fetch-data-in-react-18df60f05eff>.

/**
 * Utility function to create a delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after specified delay
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches data with retry mechanism for handling server errors
 * @param {string} url - API endpoint URL
 * @param {Object} options - Request options
 * @param {number} retries - Number of retry attempts remaining
 * @returns {Promise<Object>} API response data
 * @throws {Error} When all retry attempts fail
 */
const fetchWithRetry = async (
  url,
  options,
  retries = API_CONFIG.RETRY_ATTEMPTS
) => {
  try {
    // Add cache busting query parameter
    const timestamp = new Date().getTime();

    const response = await axios.post(`${url}?t=${timestamp}`, options);
    return response.data;
  } catch (error) {
    // Only retry on server errors (5xx) and if retries remain
    if (retries > 0 && error.response?.status >= 500) {
      await sleep(API_CONFIG.RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

/**
 * Custom hook for fetching SpaceX launches with pagination
 * @param {Object} params - Hook parameters
 * @param {number} params.page - Current page number (default: 1)
 * @param {number} params.limit - Items per page (default: from API_CONFIG)
 * @returns {Object} Object containing:
 *   - launches: Array of launch data
 *   - meta: Pagination metadata
 *   - loading: Loading state
 *   - error: Error state
 *   - retry: Function to retry failed request
 */
export const useLaunches = ({ page = 1, limit = API_CONFIG.DEFAULT_LIMIT }) => {
  // State for storing paginated launch data and metadata
  const [state, setState] = useState({
    docs: [],
    meta: {
      page: page,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    },
  });

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches launch data from the API
   * Handles loading states and error handling
   */
  const fetchLaunches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchWithRetry("/api/launches", {
        options: {
          ...API_CONFIG.QUERY_OPTIONS,
          limit,
          page,
        },
      });

      // Update state with fetched data
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
      // Handle API errors with fallback error message
      const errorMessage = err?.response?.data?.message || err.message;
      setError(errorMessage || STATUS_MESSAGES.ERROR);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  // Fetch data when page or limit changes
  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches]);

  // Retry function for manual retries
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
