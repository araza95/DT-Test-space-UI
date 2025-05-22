import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://api.spacexdata.com/v5/launches/query";

const queryOptions = {
  select: "id name date_utc success upcoming details failures links",

  sort: "date_utc",
};

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
          options: { ...queryOptions, limit, page },
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
