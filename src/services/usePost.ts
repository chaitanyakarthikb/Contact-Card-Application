import { useState } from 'react'

const usePost = () => {
    const [data,setData] = useState(null);
    const [error,setError] = useState<string|null>(null);
    const [loading,setLoading] = useState<boolean>(false);

    const postService = async (url:string, token:string|null, payload:any)=>{
        try {
            setLoading(true);
            let apiResponse = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify(payload)
            }) 
            if(apiResponse.ok){
                let parsedData = await apiResponse.json();
                setData(parsedData);
            }
          
        } catch (err:any) {
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }
  return {
    data,
    loading,
    error,
    postService
  }
}

export default usePost
