async function EntryList() {
  const userId = localStorage.getItem("userId");
  const response = await fetch(`/users/${userId}/entries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
  const data = await response.json();
  console.log(data);
  return <div></div>;
}
export default EntryList;
