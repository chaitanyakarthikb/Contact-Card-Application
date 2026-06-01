import  { useState } from 'react'

const useDelete = () => {
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState<boolean>(false);
  const [error,setError] = useState<string|null>(null);

  const deleteService = async (apiURL : string, token: string|null)=>{

    try{
        setLoading(true);
        let apiResponse = await fetch(apiURL,{
            method:"DELETE",
            headers:{
                authorization:`Bearer ${token}`
            }
        })

        if(apiResponse.ok){
            let myData = await apiResponse.json();
            setData(myData);
        }

    }catch(error:any){
        setError(error.message);
    }finally{
        setLoading(false);
    }


  }

  return {
    data,
    loading,
    error,
    deleteService
  }
}

export default useDelete
