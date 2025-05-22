import { useState, useEffect } from "react";
import axios from "axios";

// Move API constants to a separate config file
const BASE_URL = "https://api.spacexdata.com/v5/launches/query";

// Move query options to a separate constants file
const QUERY_OPTIONS = {
  select: "id name date_utc success upcoming details failures links",
  sort: "date_utc",
};

/**
 * Custom hook for fetching SpaceX launches
 * @param {Object} params - The parameters for fetching launches
 * @param {number} params.page - The page number to fetch
 * @param {number} params.limit - The number of items per page
 * @returns {Object} The launches data, meta information, loading state and error
 */
export const useLaunches = ({ page = 1, limit = 10 }) => {
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

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(BASE_URL, {
          options: { ...QUERY_OPTIONS, limit, page },
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
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, [page, limit]);

  return {
    launches: state.docs,
    meta: state.meta,
    loading,
    error,
  };
};
