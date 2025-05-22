import { useState, useEffect } from "react";

const BASE_URL = "https://api.spacexdata.com/v5/launches/query";

export const useLaunches = ({ page = 1, limit = 10 }) => {
  const [state, setState] = useState({
    docs: [],
    meta: {
      page: page,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        setLoading(true);
        const response = await fetch(BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: {},
            options: {
              page,
              limit,
              sort: { date_utc: "desc" },
              populate: ["rocket", "launchpad"],
            },
          }),
        });

        const data = await response.json();

        setState({
          docs: data.docs,
          meta: {
            page: data.page,
            totalPages: data.totalPages,
            hasNextPage: data.hasNextPage,
            hasPrevPage: data.hasPrevPage
          }
        });
      } catch (err) {
        setError(err.message);
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
    error
  };
};
