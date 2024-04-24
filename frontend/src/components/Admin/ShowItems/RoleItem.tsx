import { UseCases } from "../../../constants/UseCases";
import { IRole } from "../../../interfaces/IRole";
import styles from "./ShowItems.module.scss";

interface IRoleItem {
  role: IRole;
}

function RoleItem({ role }: IRoleItem) {
  return (
    <div className={styles.singleItem}>
      {role && (
        <div className={styles.role}>
          <h1 className={styles.roleHeading}>Role: {role.name}</h1>
          <div className={styles.listContainer}>
            <h2 className={styles.listHeading}>Role premmisons:</h2>
            <ul className={styles.useCaseList}>
              {role.roleUseCases.map((useCase) => (
                <li key={useCase}>
                  {useCase}. {UseCases.find((uc) => uc.id === useCase)?.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.listContainer}>
            <h2 className={styles.listHeading}>Role users:</h2>
            <ul>
              {role.roleUsers.emails.map((email, index) => (
                <li key={index}>
                  {index + 1}. {email}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleItem;
