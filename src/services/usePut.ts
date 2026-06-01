import  { useState } from "react";

const usePut = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  type updateContactPayload = {
    name:String,
    phone:String,
    email:String
  }

  const putService = async (apiURL: string, token: string|null,payload:updateContactPayload) => {
    try {
      setLoading(true);
      let apiResponse = await fetch(apiURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(payload)
      });
      if (apiResponse.ok) {
        let myData = await apiResponse.json();
        setData(myData);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return {
    data,
    loading,
    error,
    putService
  }
};

export default usePut;
