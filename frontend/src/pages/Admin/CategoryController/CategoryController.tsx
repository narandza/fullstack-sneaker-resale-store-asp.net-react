import { Link, useNavigate, useParams } from "react-router-dom";
import { checkIfUserIsAdmin } from "../../../utils/userUtilis";
import styles from "./CategoryController.module.scss";
import { BiArrowBack, BiChevronDown, BiChevronUp } from "react-icons/bi";
import api from "../../../api/apiService";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import ErrorFallback from "../../../components/ErrorFallback/ErrorFallback";
import MainButton from "../../../components/Button/Button";
import ControllerTable from "../../../components/Admin/ControllerTable/ControllerTable";
import {
  IPagedResponse,
  tempSneakers,
} from "../../../interfaces/IPagedResponse";
import { toast } from "react-toastify";
import FilterData from "../../../components/Admin/FilterData/FilterData";
import {
  filterOptions,
  brandsFilterOptions,
  sneakersFilterOptions,
  usersFilterOptions,
  rolesFilterOptions,
  ordersFilterOptions,
  ticketsFilterOptions,
} from "../../../constants/AdminFilterOptions";
import Pagination from "../../../components/Pagination/Pagination";

const addNewUseCaseIds = [13, 23, 53];

function CategoryController() {
  const isAdmin = checkIfUserIsAdmin();
  const { category } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IPagedResponse>(tempSneakers);
  const [loading, setLoading] = useState(false);
  const [pageError, setPageError] = useState("");
  const userUseCases = JSON.parse(localStorage.getItem("userUseCases") ?? "[]");
  const [toggleFilterOptions, setToggleFilterOptions] = useState(false);

  const handleToggleFilterOptions = () => {
    setToggleFilterOptions(!toggleFilterOptions);
  };

  const filterOptions: filterOptions[] = (() => {
    switch (category) {
      case "brands":
        return brandsFilterOptions;
      case "sneakers":
        return sneakersFilterOptions;
      case "users":
        return usersFilterOptions;
      case "roles":
        return rolesFilterOptions;
      case "orders":
        return ordersFilterOptions;
      case "tickets":
        return ticketsFilterOptions;
    }
    return [];
  })();

  const handleBack = () => {
    navigate("/dashboard");
  };

  const hasAddNewPermission = () => {
    return addNewUseCaseIds.some((addNewUseCaseId) =>
      userUseCases.includes(addNewUseCaseId)
    );
  };

  const token = localStorage.getItem("token");

  const fetchData = async (params: Record<string, string> = {}) => {
    try {
      setLoading(true);

      if (!token) {
        localStorage.clear();
        navigate("/login");
      }

      const response = await api.get(`/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      if (response.status === 200) {
        setData(response.data);
      } else {
        setPageError("Error fetching the data. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setPageError("An error has occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    try {
      const response = await api.delete(`/${category}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) {
        toast.success("Delete successful.", {
          onClose: () => window.location.reload(),
        });
      } else {
        toast.error("Delete unsucessful, try again later");
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
      navigate("/login", { state: "session expired" });
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchData({ page: newPage.toString() });
  };

  // FILTERING

  const handleFilter = (params: Record<string, string>) => {
    fetchData(params);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={styles.category}>
      {isAdmin && loading ? (
        <Loader />
      ) : pageError ? (
        <ErrorFallback />
      ) : (
        <>
          <div className={styles.backButton} onClick={handleBack}>
            <BiArrowBack />
            {category}
          </div>
          {hasAddNewPermission() &&
            (category === "brands" ||
              category === "sneakers" ||
              category === "users" ||
              category === "roles") && (
              <div className={styles.addButtonContainer}>
                <Link to="add-new">
                  <MainButton
                    text={category === "users" ? "add staff member" : "add +"}
                    className={styles.addButton}
                  />
                </Link>
              </div>
            )}
          {filterOptions && (
            <div className={styles.filterDataContainer}>
              <h2
                className={styles.filterHeading}
                onClick={handleToggleFilterOptions}
              >
                Filter options
                {toggleFilterOptions ? <BiChevronUp /> : <BiChevronDown />}
              </h2>
              {toggleFilterOptions && (
                <FilterData options={filterOptions} onFilter={handleFilter} />
              )}
            </div>
          )}

          <div className={styles.tableContainer}>
            <p className={styles.totalItems}>
              Total: {data.totalCount} {category}
            </p>
            <ControllerTable
              items={data.items}
              category={category && category}
              useCases={userUseCases}
              handleDelete={handleDelete}
            />
          </div>
        </>
      )}
      <Pagination
        onPageChange={handlePageChange}
        numberOfPages={data.pageCount}
        currentPage={data.currentPage}
      />
    </section>
  );
}

export default CategoryController;
