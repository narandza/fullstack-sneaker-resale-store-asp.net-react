import { useEffect, useState } from "react";
import IUser from "../../../interfaces/IUser";
import styles from "./Tickets.module.scss";
import api from "../../../api/apiService";
import { ITicket } from "../../../interfaces/ITicket";
import SingleTicket from "../../SingleTicket/SingleTicket";

interface ITicketComponent {
  user: IUser;
}

function Tickets({ user }: ITicketComponent) {
  const token = localStorage.getItem("token");
  const [userTickets, setUserTickets] = useState<ITicket[]>();

  const getUserTickets = async () => {
    try {
      const response = await api.get(`/tickets?userEmail=${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUserTickets(response.data.items);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserTickets();
  }, []);
  return (
    <div className={styles.tickets}>
      {userTickets &&
        userTickets.map((ticket, index) => (
          <SingleTicket ticket={ticket} key={index} />
        ))}
    </div>
  );
}

export default Tickets;
