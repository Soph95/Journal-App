import EntryList from "./EntryList";
import useFetch from "./useFetch";

function Entries() {
  const userId = localStorage.getItem("userId");
  const { data, isPending } = useFetch(`/users/${userId}/entries`, "GET");

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {data && <EntryList data={data} />}
    </div>
  );
}

export default Entries;
