import styles from "./HomePage.module.scss";
import MainButton from "../../components/Button/Button";
import ItemGroup from "../../components/ItemGroup/ItemGroup";
import Loader from "../../components/Loader/Loader";
import ErrorFallback from "../../components/ErrorFallback/ErrorFallback";
import api from "../../api/apiService";
import { useState, useEffect } from "react";
import { ISneaker } from "../../interfaces/ISneaker";
import { IBrand } from "../../interfaces/IBrand";
import { Link } from "react-router-dom";
import {
  extractUniqueSizes,
  getNewArrivals,
  getRandomSneakers,
} from "../../utils/sneakerUtils";

type HomePageSection = {
  title: string;
  type: "product" | "size" | "brand";
  items: object;
};

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [homePageContent, setHomePageContent] = useState<{
    sneakers: ISneaker[];
    brands: IBrand[];
  }>({
    sneakers: [],
    brands: [],
  });
  const [newArrivals, setNewArrivals] = useState<ISneaker[]>([]);
  const [recomendation, setRecommendation] = useState<ISneaker[]>([]);
  const [sizes, setSizes] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [sneakersResponse, brandsResponse] = await Promise.all([
          api.get("/sneakers"),
          api.get("/brands"),
        ]);

        setHomePageContent({
          sneakers: sneakersResponse.data.items,
          brands: brandsResponse.data.items,
        });
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setNewArrivals(getNewArrivals(homePageContent.sneakers, 4));
    setRecommendation(getRandomSneakers(homePageContent.sneakers, 8));
    setSizes(extractUniqueSizes(homePageContent.sneakers));
  }, [homePageContent.sneakers]);

  const sections: HomePageSection[] = [
    {
      title: "new arrivals",
      type: "product",
      items: newArrivals,
    },
    {
      title: "recomendation",
      type: "product",
      items: recomendation,
    },
    {
      title: "shop by your size",
      type: "size",
      items: sizes,
    },
    {
      title: "brands",
      type: "brand",
      items: homePageContent.brands,
    },
  ];

  return (
    <div className={styles.homePage}>
      <div className={styles.heroImage}>
        <div className={styles.heroButton}>
          <Link to="/shop">
            <MainButton text="shop now"></MainButton>
          </Link>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorFallback />
      ) : (
        <div className={styles.homePageContent}>
          {sections.map((section, index) => (
            <ItemGroup
              heading={section.title}
              items={section.items}
              type={section.type}
              key={index}
            ></ItemGroup>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
