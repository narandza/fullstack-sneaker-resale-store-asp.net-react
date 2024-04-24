import { useEffect, useState } from "react";
import styles from "./Favorites.module.scss";
import { IFavorite } from "../../../interfaces/IFavorite";
import { deleteFavorite, getFavorites } from "../../../utils/userUtilis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getPath } from "../../../utils/apiUtilis";

function Favorites() {
  const token = localStorage.getItem("token");
  const [favorites, setFavorites] = useState<IFavorite[]>();

  const handleDeleteFromFavorites = async (id: number) => {
    try {
      const success = await deleteFavorite(id, token);
      if (success) {
        toast.success("Successfully removed from favorites.", {
          onClose: () => {
            fetchFavorites();
          },
        });
      } else {
        console.log("Failed to remove from favorites.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const favoritesData = await getFavorites(token);
      setFavorites(favoritesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  console.log(favorites);
  return (
    <div className={styles.favorites}>
      {favorites ? (
        favorites.map((item) => (
          <div className={styles.favoirtesItem} key={item.id}>
            <img
              src={item.sneakerImage && getPath(item.sneakerImage)}
              alt={`${item.brand} ${item.model}`}
              className={styles.itemImage}
            />
            <Link to={`/shop/${item.sneakerId}`}>
              {" "}
              <div className={styles.itemInfo}>
                <p>
                  {item.brand}, {item.model}
                </p>
                <p>{item.colorway}</p>
              </div>
            </Link>

            <button
              className={styles.removeButton}
              onClick={() => handleDeleteFromFavorites(item.sneakerId)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>
          Nothing to show here. Head to the shop and find your favorite sneakers
          to add them!
        </p>
      )}
    </div>
  );
}

export default Favorites;
