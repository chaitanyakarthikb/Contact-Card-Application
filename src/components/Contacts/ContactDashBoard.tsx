import { useEffect, useState } from "react";
import useFetch from "../../services/useFetch";
import { Constants } from "../../CONSTANTS";

import "./Contacts.css";
import Contact from "./Contact";
import { Link } from "react-router-dom";

type ContactRecord = {
  contactID?: number;
  name?: string;
  phone?: string;
  email?: string;
};

const ContactDashBoard = () => {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const token = localStorage.getItem("jwtToken");
  const [fetchFlag,setFetchFlag] = useState<boolean>(false);
 
  if (!token) {
    window.location.href = "/login";
  }

  const { data, loading, error, getService } = useFetch();

  useEffect(() => {
    if (data) {
      setContacts(data);
    }
  }, [data]);

  useEffect(() => {
    getService(Constants.FETCH_CONTACTS_URL, token);
  }, [token,fetchFlag]);

  return (
    <div className="contacts--screen">
      <div className="contacts--toolbar">
        <button
          type="button"
          className="contacts--add-btn"
          aria-label="Add contact"
        >
          <span className="contacts--add-btn-icon" aria-hidden="true">
            +
          </span>
          <Link to="/add-contact">
            Add Contact
          </Link>
        </button>
      </div>

      <div className="contacts--width">
        <div className="contacts--page">
          <div className="contacts--container">
            {loading && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            {contacts.length === 0 && <h1>No contacts Added Yet...</h1>}
            {contacts.length > 0 &&
              contacts.map((el) => (
                <Contact setFetchFlag={setFetchFlag} key={el.contactID ?? el.email} contact={el} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDashBoard;
