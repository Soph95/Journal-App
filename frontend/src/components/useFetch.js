import { useState, useEffect } from "react";
function useFetch(url, method, userInfo, authorization) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
      });
  }, [url]);

  return { data, isPending };
}
export default useFetch;
