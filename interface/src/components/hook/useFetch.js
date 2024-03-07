// useFetch.js
import { useState, useEffect } from "react";

export default function useFetch(url, {method, headers, body} = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url , {
          method : method,
          headers: headers,
          body : body,
          });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();

        setStatus(response.status);
        console.log(response.status, "status");
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, status };
}
