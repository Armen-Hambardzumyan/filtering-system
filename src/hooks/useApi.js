import axios from "axios";
import {useCallback, useEffect, useState} from "react";

const useApi = (config, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios(config);
      setData(response.data);
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [config])

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error}
}

export default useApi;