import styles from "./ShopPage.module.scss";
import { useEffect, useState } from "react";
import { BiSliderAlt } from "react-icons/bi";
import ItemGroup from "../../components/ItemGroup/ItemGroup";
import FilterAndSortOptions, {
  filterValues,
} from "../../components/FilterAndSort/FilterAndSortOptions";
import Pagination from "../../components/Pagination/Pagination";
import api from "../../api/apiService";
import Loader from "../../components/Loader/Loader";
import ErrorFallback from "../../components/ErrorFallback/ErrorFallback";
import { IPagedResponse, tempSneakers } from "../../interfaces/IPagedResponse";

import { useLocation } from "react-router-dom";
import { IBrand } from "../../interfaces/IBrand";
import { getBrands } from "../../utils/sneakerUtils";
import { getPath } from "../../utils/apiUtilis";

function ShopPage() {
  const [filterAndSortOpen, setFilterAndSortOpen] = useState(false);
  const [shopContent, setShopContent] = useState<IPagedResponse>(tempSneakers);
  const [filteredProducts, setFilteredProducts] =
    useState<IPagedResponse>(tempSneakers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const sizeParam = new URLSearchParams(location.search).get("size");
  const brandParam = new URLSearchParams(location.search).get("brand");
  const shopPerPage = 12;

  useEffect(() => {
    const stateData = location?.state;
    if (stateData) {
      setFilteredProducts({
        currentPage: 1,
        items: stateData.searchResult,
        itemsPerPage: shopPerPage,
        pageCount: Math.ceil(stateData.searchResult.length / shopPerPage),
        totalCount: stateData.searchResult.length,
      });
    } else if (sizeParam) {
      filterProducts("sizes", sizeParam);
    } else if (brandParam) {
      filterProducts("brand", brandParam);
    } else {
      fetchData();
    }
  }, [location, sizeParam, brandParam]);

  const filterProducts = async (filterType: string, filterValue: string) => {
    try {
      setLoading(true);
      const response = await api.get(
        `/sneakers?${filterType}=${filterValue}&perPage=${shopPerPage}`
      );
      setShopContent(response.data);
      setFilteredProducts(response.data);
    } catch (error: any) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/sneakers?perPage=12");
      setShopContent(response.data);
      setFilteredProducts(response.data);
    } catch (error: any) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilterAndSort = () => {
    setFilterAndSortOpen(!filterAndSortOpen);
  };

  const handlePageChange = (pageNumber: number) => {
    filterProducts("page", pageNumber.toString());
  };

  const [values, setValues] = useState<filterValues>({
    minPrice: 0,
    maxPrice: 0,
    selectedSizes: [],
    selectedBrands: [],
    sortType: 0,
  });

  const handleSetInitialValues = (selectedFilterValeus: filterValues) => {
    setValues(selectedFilterValeus);
  };

  const handleFilterChange = async (filterOptions: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/sneakers?${filterOptions}&perPage=12`);
      setShopContent(response.data);
      setFilteredProducts(response.data);
    } catch (error: any) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const [brands, setBrands] = useState<IBrand[]>();

  useEffect(() => {
    const fetchBrands = async () => {
      const brands = await getBrands();
      setBrands(brands);
    };

    fetchBrands();
  }, []);

  return (
    <section className={styles.shop}>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorFallback />
      ) : (
        <>
          <h1 className={styles.shopHeader}>
            {sizeParam ? `size ${sizeParam}` : brandParam ? brandParam : "shop"}
          </h1>
          {brandParam && (
            <div className={styles.brandDescription}>
              {brands
                ?.filter((brand) => brand.name === brandParam)
                .map((filteredBrand) => (
                  <>
                    <img
                      src={getPath(filteredBrand.logo.path)}
                      alt={filteredBrand.name}
                      className={styles.brandLogo}
                    />
                    <p key={filteredBrand.id}>{filteredBrand.description}</p>
                  </>
                ))}
            </div>
          )}

          {!(sizeParam || brandParam) && (
            <div className={styles.filterAndSort}>
              <div className={styles.fsTop}>
                <BiSliderAlt
                  size="1em"
                  className={styles.fsIcon}
                  onClick={toggleFilterAndSort}
                />
                <h2 className={styles.fsHeader} onClick={toggleFilterAndSort}>
                  Filter and sort
                </h2>
                <span className={styles.fsProducts}>
                  {filteredProducts.totalCount} products
                </span>
              </div>
              {filterAndSortOpen && brands && (
                <FilterAndSortOptions
                  brands={brands}
                  onFilterChange={handleFilterChange}
                  initialFilters={values}
                  setInitialValues={handleSetInitialValues}
                />
              )}
            </div>
          )}
          {filteredProducts.totalCount ? (
            <div className={styles.shopItems}>
              <ItemGroup
                type="product"
                heading=""
                items={filteredProducts.items}
              ></ItemGroup>
            </div>
          ) : (
            <div className={styles.noProducts}>
              <h1>No products to show</h1>
            </div>
          )}
          <Pagination
            numberOfPages={filteredProducts.pageCount}
            currentPage={filteredProducts.currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
}

export default ShopPage;
