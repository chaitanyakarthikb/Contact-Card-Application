import {  useState } from "react";

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState([]);

  const getService = async (apiURL: string, token: string | null) => {
    setLoading(true);
    try {
      let apiResponse = await fetch(apiURL, {
        method: "GET", // or POST, PUT, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (apiResponse.ok) {
        let jsonData = await apiResponse.json();
        setData(jsonData);
      } else {
        throw Error(`${apiResponse.status} : ${apiResponse.statusText}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    getService,
  };
};

export default useFetch;
