import styles from "./ProductDetailPage.module.scss";
import ProductImageCollection from "../../components/ProductImageCollection/ProductImageCollection";
import ItemGroup from "../../components/ItemGroup/ItemGroup";
import MainButton, { SizeButton } from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ISneaker, tempSneaker } from "../../interfaces/ISneaker";
import Loader from "../../components/Loader/Loader";
import ErrorFallback from "../../components/ErrorFallback/ErrorFallback";
import api from "../../api/apiService";
import { getRandomSneakers } from "../../utils/sneakerUtils";
import "reactjs-popup/dist/index.css";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { InfoModal } from "../../components/Modal/Modals";
import { toast } from "react-toastify";
import { IFavorite } from "../../interfaces/IFavorite";
import { deleteFavorite, getFavorites } from "../../utils/userUtilis";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sneaker, setSneaker] = useState<ISneaker>(tempSneaker);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [recommendation, setRecommendation] = useState<ISneaker[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/sneakers`);

        if (id) {
          const selectedSneakerId = parseInt(id);
          const selectedSneaker = response.data.items.find(
            (sneaker: any) => sneaker.id === selectedSneakerId
          );

          const otherSneakers = response.data.items.filter(
            (sneaker: any) => sneaker.id !== selectedSneakerId
          );

          if (selectedSneaker) {
            setSneaker(selectedSneaker);
            setRecommendation(getRandomSneakers(otherSneakers, 4));
          } else {
            console.error(`Sneaker with id ${id} not found.`);
          }
        } else {
          console.error("ID is undefined.");
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const [favorites, setFavorites] = useState<IFavorite[]>();
  const fetchFavorites = async () => {
    const favoritesData = await getFavorites(token);
    setFavorites(favoritesData);
  };
  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleAddToFavorite = async () => {
    if (!token) {
      setModalMessage(
        "Log in or create an account to add sneaker to favorites."
      );
      setModalOpen(true);
      return;
    }
    try {
      const response = await api.post(
        `/favorites/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Added to favorites.", {
          onClose: () => {
            fetchFavorites();
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFromFavorites = async () => {
    try {
      if (id) {
        const success = await deleteFavorite(parseInt(id), token);
        if (success) {
          toast.success("Successfully removed from favorites.", {
            onClose: () => {
              fetchFavorites();
            },
          });
        } else {
          console.log("Failed to remove from favorites.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      setModalMessage("Log in or create an account to countine.");
      setModalOpen(true);
      return;
    }

    if (selectedSize === null) {
      setModalMessage("Please select a size.");
      setModalOpen(true);
      return;
    }

    try {
      const response = await api.post(
        "/orders/orderitem",
        {
          SneakerId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Sneaker added to cart.");
      } else if (response.status === 401) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Select sneaker

  const handleSelectSneakerSize = (size: string) => {
    setSelectedSize(size);
  };

  const handleAccept = () => {
    setModalOpen(false);
  };

  const sizes = sneaker?.sizes?.map((size) => size.number) || [];

  const sneakerImagesPath = sneaker.images.map((image) => image.path);

  return (
    <section className={styles.productDetail}>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorFallback />
      ) : (
        id && (
          <>
            <ProductImageCollection images={sneakerImagesPath} />
            <div className={styles.productInfo}>
              <h1 className={styles.productHeading}>
                {sneaker?.brand.name} {sneaker?.model} {sneaker?.colorway}{" "}
              </h1>

              <div className={styles.addToFavoirtesButtonContainer}>
                {token &&
                favorites &&
                favorites.some(
                  (sneaker) => sneaker.sneakerId === parseInt(id)
                ) ? (
                  <BiSolidHeart
                    className={styles.addToFavoirtesButton}
                    color="red"
                    onClick={handleDeleteFromFavorites}
                  />
                ) : (
                  <BiHeart
                    className={styles.addToFavoirtesButton}
                    onClick={handleAddToFavorite}
                  />
                )}
              </div>

              <p className={styles.productPrice}>${sneaker?.price}.00 USD</p>
              <div className={styles.productSizes}>
                {loading ? (
                  <p>Loading sizes...</p>
                ) : (
                  sizes
                    .map((size) => parseFloat(size))
                    .sort((a, b) => a - b)
                    .map((sortedSize, index) => (
                      <SizeButton
                        key={index}
                        size={sortedSize.toString()}
                        isSelected={sortedSize.toString() === selectedSize}
                        onSelect={(size) => handleSelectSneakerSize(size)}
                      />
                    ))
                )}
              </div>

              <div className={styles.productAddToCart}>
                <MainButton text="add to cart" onClick={handleAddToCart} />
              </div>
              <div className={styles.productDescription}>
                <p>{sneaker?.description}</p>
              </div>
            </div>
            <div className={styles.productRecomendation}>
              <ItemGroup
                heading="similar products"
                type="product"
                items={recommendation}
              />
            </div>
          </>
        )
      )}
      <InfoModal
        heading={modalMessage}
        onAccept={handleAccept}
        isOpen={modalOpen}
      />
    </section>
  );
}

export default ProductDetail;
