import { useEffect, useState } from 'react'
import "./Contacts.css";
import usePut from '../../services/usePut';
import { Constants } from '../../CONSTANTS';
import useDelete from '../../services/useDelete';



interface ContactProps {
    setFetchFlag: React.Dispatch<React.SetStateAction<boolean>>;  
  contact: {
    contactID?: number;
    email?: string;
    name?: string;
    phone?: string;
  };
}

const Contact = ({ setFetchFlag, contact }: ContactProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: contact?.name ?? "",
    phone: contact?.phone ?? "",
    email: contact?.email ?? "",
  });
  const {data,error,loading,putService} = usePut();
  const {data:deleteData,error:deleteError,loading:deleteLoading,deleteService} = useDelete();

  const token = localStorage.getItem("jwtToken");
  if(!token){
    window.location.href = "/login";
  }

  useEffect(() => {
    if (!isEditing) {
      setForm({
        name: contact?.name ?? "",
        phone: contact?.phone ?? "",
        email: contact?.email ?? "",
      });
    }
  }, [contact, isEditing]);

  useEffect(() => {
    console.log("data,error,loading", data, error, loading);
    if (data && error === null && !loading) {
      setFetchFlag((prev: boolean) => !prev);
    }
  }, [data, error, loading]);


  useEffect(()=>{
    if(deleteData && deleteError === null && !deleteLoading){
      setFetchFlag((prev: boolean) => !prev);
    }

  },[deleteData,deleteError,deleteLoading])

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const url = `${Constants.UPDATE_CONTACT_URL}${contact?.contactID}`;
    putService(url,token,form)
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({
      name: contact?.name ?? "",
      phone: contact?.phone ?? "",
      email: contact?.email ?? "",
    });
    setIsEditing(false);
  };

  const handleDelete = ()=>{
    const url = `${Constants.DELETE_CONTACT_URL}${contact?.contactID}`
    deleteService(url,token);
  }

  return (
    <div className={`contact--card${isEditing ? " contact--card--editing" : ""}`}>
      <div className="contact--card--body">
        <div className="contact--card--element">
          <h3>Name:</h3>
          {isEditing ? (
            <input
              className="contact--card--input"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            <h2>{contact?.name}</h2>
          )}
        </div>

        <div className="contact--card--element">
          <h3>Phone:</h3>
          {isEditing ? (
            <input
              className="contact--card--input"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          ) : (
            <h2>{contact?.phone}</h2>
          )}
        </div>

        <div className="contact--card--element">
          <h3>Email:</h3>
          {isEditing ? (
            <input
              className="contact--card--input"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          ) : (
            <h2>{contact?.email}</h2>
          )}
        </div>
      </div>

      <div className="contact--card--actions">
        {isEditing ? (
          <>
            <button
              type="button"
              className="contact--btn contact--btn--save"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="contact--btn contact--btn--cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="contact--btn contact--btn--edit"
              onClick={() => setIsEditing(true)}
            >
              <span className="contact--btn--icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </span>
              Edit
            </button>
            <button
              type="button"
              className="contact--btn contact--btn--delete"
              onClick={handleDelete}
            >
              <span className="contact--btn--icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M10 11v6M14 11v6" />
                </svg>
              </span>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
