import { TicketStatus } from "../../../constants/orders";
import { ITicket } from "../../../interfaces/ITicket";
import { getEnumValue } from "../../../utils/enumUtils";
import styles from "./ShowItems.module.scss";

interface ITicketItem {
  ticket: ITicket;
}

function TicketItem({ ticket }: ITicketItem) {
  console.log(ticket);
  return (
    <div className={styles.singleItem}>
      {ticket && (
        <div className={styles.ticket}>
          <h1 className={styles.ticketHeading}>Ticket No{ticket.id}</h1>
          <p className={styles.ticketP}>
            Status:{" "}
            <span className={styles.ticketHiglight}>
              {ticket.status}
              {/* {getEnumValue(parseInt(ticket.status), TicketStatus)} */}
            </span>
          </p>
          <div className={styles.ticketInfoContainer}>
            <h2 className={styles.infoHeading}>Descripton:</h2>
            <p>{ticket.description}</p>
          </div>
          <div className={styles.ticketInfoContainer}>
            <h2 className={styles.infoHeading}>User:</h2>
            <p>
              Name: {ticket.user.firstName} {ticket.user.lastName}
            </p>
            <p>Email: {ticket.user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketItem;
