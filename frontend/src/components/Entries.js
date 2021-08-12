import EntryList from "./EntryList";
import useFetch from "./useFetch";
import Navbar from "./Navbar";

function Entries() {
  const userId = localStorage.getItem("userId");
  const { data, isPending } = useFetch(`/users/${userId}/entries`, "GET");

  return (
    <div className="entries-list">
      <Navbar />
      {isPending && <div>Loading...</div>}
      {data && <EntryList data={data} />}
    </div>
  );
}

export default Entries;
