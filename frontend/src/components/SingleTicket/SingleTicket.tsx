import { ITicket } from "../../interfaces/ITicket";
import styles from "./SingleTicket.module.scss";

interface ISingleTicket {
  ticket: ITicket;
}

function SingleTicket({ ticket }: ISingleTicket) {
  return (
    <div className={styles.ticketItem}>
      <span className={styles.title}>{ticket.title}</span>
      <span className={styles.descrition}>{ticket.description}</span>
    </div>
  );
}

export default SingleTicket;
