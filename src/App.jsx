import { useCallback, useReducer, useState, useEffect } from "react";
import Gallery from "./components/Gallery";
import useFetchPhotos from "./hooks/useFetchPhoto";
import { favouriteReducer } from "./reducers/favouriteReducer";
import { CiSearch } from "react-icons/ci";

function App() {

  const { photos, loading, error } = useFetchPhotos();

  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(
    favouriteReducer,
    JSON.parse(localStorage.getItem("favourites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  if (loading) 
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500"></div>
      </div>
    )
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>

      <div className="p-4 relative">
        <input
          type="text"
          placeholder="Search author..."
          value={search}
          onChange={handleSearch}
          className="border p-2 w-full rounded"
        />
        <span className="absolute top-6 right-10 text-2xl"><CiSearch /></span>
      </div>

      <Gallery
        photos={photos}
        search={search}
        dispatch={dispatch}
        favourites={favourites}
      />

    </div>
  );
}

export default App;