import styles from "./SearchPage.module.scss";
import { FormInput } from "../../components/FormInput/FormInput";
import { SingleSearchItem } from "../../components/SingleProduct/SingleProduct";
import MainButton from "../../components/Button/Button";
import { useEffect, useState } from "react";
import api from "../../api/apiService";
import { ISneaker } from "../../interfaces/ISneaker";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState<ISneaker[]>([]);
  const [searchResult, setSearchResult] = useState<ISneaker[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await api.get("/sneakers");
      setSearchContent(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResult(searchContent);
      return;
    }
    try {
      const response = await api.get(`/sneakers`, {
        params: { q: query },
      });

      if (response.status === 200) {
        setSearchResult(response.data.items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeeAllClick = () => {
    navigate("/shop", { state: { searchResult } });
  };

  return (
    <section className={styles.search}>
      <div className={styles.searchInputContainer}>
        <FormInput
          type="text"
          placeholder="search for sneakers..."
          value={searchQuery || ""}
          onChange={handleSearchInputChange}
        />
      </div>
      {searchQuery && (
        <>
          <div className={styles.searchResult}>
            {searchResult.slice(0, 4).map((sneaker, index) => (
              <SingleSearchItem key={index} sneaker={sneaker} />
            ))}
          </div>

          <div className={styles.showMore} onClick={handleSeeAllClick}>
            <MainButton text="see all..." />
          </div>
        </>
      )}
    </section>
  );
}

export default SearchPage;
