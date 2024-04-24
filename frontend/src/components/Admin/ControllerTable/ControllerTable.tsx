import { BiEdit, BiShowAlt, BiTrash } from "react-icons/bi";
import { IBrand } from "../../../interfaces/IBrand";
import { ISneaker } from "../../../interfaces/ISneaker";
import styles from "./ControllerTable.module.scss";
import { Link, useNavigate } from "react-router-dom";
import IUser from "../../../interfaces/IUser";
import { getPath } from "../../../utils/apiUtilis";

interface IControllerTable {
  category?: string;
  items: IBrand[] | ISneaker[] | IUser[];
  useCases: number[];
  handleDelete: (id: number | string) => Promise<void>;
}

const showUseCaseIds = [12, 22, 42, 52, 72, 92];
const editUseCaseIds = [14, 24, 54];
const deleteUseCaseIds = [15, 25, 45, 55, 75, 95];

function ControllerTable({
  items,
  category,
  useCases,
  handleDelete,
}: IControllerTable) {
  if (!items || items.length === 0) {
    return <div>No items to display.</div>;
  }
  console.log(items);
  const keys = Object.keys(items[0]);

  const hasShowPremisson = () => {
    return showUseCaseIds.some((id) => useCases.includes(id));
  };

  const hasDeletePremisson = () => {
    return deleteUseCaseIds.some((id) => useCases.includes(id));
  };

  const hasEditPremisson = () => {
    return editUseCaseIds.some((id) => useCases.includes(id));
  };

  const renderCell = (key: string, item: any) => {
    const dateKeys = ["releaseDate", "createdAt", "modified"];
    if (dateKeys.includes(key)) {
      return new Date(item[key]).toLocaleDateString("en-GB");
    }

    switch (key) {
      case "logo":
        return (
          <img
            src={getPath(item[key]?.path)}
            alt="Logo"
            className={styles.brandLogo}
          />
        );
      case "brand":
        return String((item as ISneaker)[key].name);
      case "sizes":
        return (
          <>
            {item[key].map((size: any) => (
              <span key={size.id}>{size.number}, </span>
            ))}
          </>
        );
      case "images":
        return (
          <img
            src={item[key]?.[0]?.path && getPath(item[key][0].path)}
            alt={item.model}
            width={70}
          />
        );
      case "address":
        return `${item[key].streetAddress} ${item[key].city}`;
      case "items":
        return `${item[key].length} `;
      case "user":
        if (category === "tickets") return `${item[key].email}`;
        return `${item[key].name}`;
      case "roleUsers":
        return "";
      case "roleUseCases":
        return "";
      default:
        const truncatedString =
          String(item[key]).length > 100
            ? String(item[key]).substring(0, 100) + "..."
            : String(item[key]);

        return truncatedString;
    }
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          {keys.map((key, index) =>
            key === "roleUsers" ||
            key === "roleUseCases" ||
            key === "roleId" ||
            key === "modified" ||
            key === "createdAt" ? (
              ""
            ) : (
              <th key={`${index}_${key}`} className={styles.tableHeader}>
                {key}
              </th>
            )
          )}
          {(hasDeletePremisson() || hasEditPremisson()) && <th>Action</th>}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {items.map((item, index) => (
          <tr key={`row_${index}`} className={styles.tableRow}>
            {keys.map((key, indexK) =>
              key === "roleUsers" ||
              key === "roleUseCases" ||
              key === "roleId" ||
              key === "modified" ||
              key === "createdAt" ? (
                ""
              ) : (
                <td
                  key={`${index}_${key}_${indexK}`}
                  className={styles.tableItem}
                >
                  {renderCell(key, item)}
                </td>
              )
            )}

            {(hasDeletePremisson() || hasEditPremisson()) && (
              <td className={styles.actionIcons}>
                {hasShowPremisson() && (
                  <Link to={`/dashboard/${category}/${item.id}`}>
                    <BiShowAlt
                      className={`${styles.editButton} ${styles.actionIcon}`}
                    />
                  </Link>
                )}

                {category !== "users" && hasEditPremisson() && (
                  <Link
                    to={`/dashboard/${category}/edit/${item.id}`}
                    state={item}
                  >
                    <BiEdit
                      className={`${styles.editButton} ${styles.actionIcon}`}
                    />
                  </Link>
                )}

                {hasDeletePremisson() && (
                  <BiTrash
                    className={`${styles.deleteButton} ${styles.actionIcon}`}
                    onClick={() => handleDelete(item.id)}
                  />
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ControllerTable;
