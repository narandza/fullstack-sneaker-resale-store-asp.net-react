import { useState } from "react";
import { ticketsFilterOptions } from "../../../constants/AdminFilterOptions";
import { ITicket } from "../../../interfaces/ITicket";
import MainButton from "../../Button/Button";
import styles from "./EditItem.module.scss";
import api from "../../../api/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IEditTicket {
  ticket: ITicket;
}

function EditTicket({ ticket }: IEditTicket) {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState<ITicket>({
    ...ticket,
    status: ticket.status,
  });
  const ticketStatuses = ticketsFilterOptions.find(
    (item) => item.name === "Status"
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setTicketData((prevData) => ({
      ...prevData,
      status: newStatus,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/tickets/${ticket.id}`,
        {
          id: ticketData.id,
          status: parseInt(ticketData.status),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        toast.success(`Item updated.`, {
          onClose: () => {
            navigate("/dashboard/tickets");
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.updateForm} onSubmit={handleSubmit}>
      <div className={styles.formItem}>
        <label>Update ticket status</label>
        <select
          onChange={handleChange}
          value={ticketData.status}
          className={styles.formSelect}
        >
          {ticketStatuses?.options?.map((status) => (
            <option
              value={status.value}
              key={status.value}
              selected={status.value === ticket.status}
            >
              {status.name}
            </option>
          ))}
        </select>
        <span className={styles.inputError}></span>
      </div>
      <div className={styles.formButton}>
        <span className={styles.inputError}></span>
        <MainButton text="Update" type="submit" />
      </div>
    </form>
  );
}

export default EditTicket;
