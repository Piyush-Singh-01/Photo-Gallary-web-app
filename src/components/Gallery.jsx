import { useMemo } from "react";

function Gallery({ photos, search, dispatch, favourites }) {

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4">

      {filteredPhotos.map((photo) => {

        const isFav = favourites.find((item) => item.id === photo.id);

        return (
          <div
            key={photo.id}
            className="border p-2 rounded shadow hover:scale-105 transition duration-300"
          >
            <div className="relative">

              <img
                src={photo.download_url}
                alt={photo.author}
                className="w-full h-60 object-cover rounded"
              />

              <button
                onClick={() =>
                  dispatch({ type: "TOGGLE_FAV", payload: photo })
                }
                className="absolute top-2 right-2 text-2xl cursor-pointer"
              >
                {isFav ? "❤️" : "🤍"}
              </button>

            </div>

            <h1 className="mt-2 text-sm font-semibold">{photo.author}</h1>

          </div>
        );
      })}
    </div>
  );
}

export default Gallery;