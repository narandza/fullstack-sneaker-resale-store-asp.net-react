import { IconType } from "react-icons";
import { FormInput, TextArea } from "../../components/FormInput/FormInput";
import styles from "./ContactPage.module.scss";
import { BiEnvelope, BiPhone } from "react-icons/bi";
import MainButton from "../../components/Button/Button";
import { useState } from "react";
import { InfoModal } from "../../components/Modal/Modals";
import api from "../../api/apiService";
import { toast } from "react-toastify";
import kobe from "../../assets/images/kobe.jpg";

const contactInfo: {
  icon: IconType;
  name: string;
  value: string;
}[] = [
  {
    icon: BiPhone,
    name: "Phone",
    value: "+381 60 1234567",
  },
  {
    icon: BiEnvelope,
    name: "Email",
    value: "contact@pairrun.com",
  },
];

type TicketData = {
  title: string;
  description: string;
};

function ContactPage() {
  const token = localStorage.getItem("token");
  const [modal, setModal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [ticketData, setTicketData] = useState<TicketData>({
    title: "",
    description: "",
  });

  const handleReportAProblem = async () => {
    if (!token) {
      setOpenModal(true);
      setModal("Please log in or sing up to report a problem.");
      return;
    }

    if (!ticketData.title.trim() && !ticketData.description.trim()) {
      setOpenModal(true);
      setModal("Please provide a title and description for the problem.");
      return;
    }
    if (!ticketData.title.trim()) {
      setOpenModal(true);
      setModal("Please provide a title for the problem.");
      return;
    }

    if (!ticketData.description.trim()) {
      setOpenModal(true);
      setModal("Please provide a description for the problem.");
      return;
    }

    try {
      const response = await api.post("/tickets", ticketData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.status);
      if (response.status === 201) {
        toast.success("Thank you for sending the report!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTicketData({
      ...ticketData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className={styles.contact}>
      <div className={styles.contactHeading}>
        <h1>Contact us</h1>
      </div>
      <div className={styles.contactContent}>
        <div className={styles.contactInfoContainer}>
          <h2 className={styles.infoHeading}>Contact info</h2>
          {contactInfo.map((item, index) => (
            <div className={styles.infoItem} key={index}>
              <item.icon size="2em" />
              <p className={styles.itemName}>
                {item.name}:{" "}
                <span className={styles.itemValue}>{item.value}</span>
              </p>
            </div>
          ))}
          <div className={styles.contactImageContainer}>
            <img
              src={kobe}
              alt="contact page  
        "
              className={styles.contactImage}
            />
          </div>
        </div>

        <div className={styles.reportProblem}>
          <h2 className={styles.reportHeading}>Report a problem</h2>
          <label className={styles.ticketLabel}>Title: </label>
          <FormInput
            placeholder="enter a title..."
            type="text"
            name="title"
            onChange={handleChange}
          />
          <label className={styles.ticketLabel}>Description: </label>
          <TextArea
            className={styles.reportTextArea}
            name="description"
            placeholder="describe your problem..."
            onChange={handleChange}
          />

          <MainButton
            className={styles.reportButton}
            text="send"
            onClick={handleReportAProblem}
          />
        </div>
      </div>
      <InfoModal
        heading={modal}
        isOpen={openModal}
        onAccept={() => {
          setOpenModal(!openModal);
        }}
      />
    </section>
  );
}

export default ContactPage;
