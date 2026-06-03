import { useEffect, useState } from "react";
import "./Contacts.css";
import usePost from "../../services/usePost";
import { Constants } from "../../CONSTANTS";

const AddContact = () => {
  const { data, loading, error, postService } = usePost();

  const token = localStorage.getItem("jwtToken");

  if (!token) {
    window.location.href = "/login";
  }

  const [contact, setContact] = useState({
    email: "",
    phone: "",
    name: "",
  });

  useEffect(() => {
    if(data && error===null && loading==false){
      setTimeout(()=>{
        window.location.href="/contacts"
      },1500)
    }
  }, [data, error, loading]);

  const handleAddContact = (e: any) => {
    e.preventDefault();
    console.log("======================contact================", contact);
    try {
      postService(Constants.POST_CONTACT_URL, token, contact);
    } catch (error) {}
  };

  const handleChange = (e: any, field: string) => {
    setContact((prev) => {
      return {
        ...prev,
        [field]: e.target.value,
      };
    });
  };
  return (
    <div className="add-contact-page">
      {(error===null && loading===false && data) ? <h1>Contact Added Succesfully</h1> : <h1>Add Contact Page</h1>}
      {loading && <h1>Loading...</h1>}
      {error && error.length > 0 && <h1>{error}</h1>}
      <form className="form">
        <input
          onChange={(e) => handleChange(e, "name")}
          type="text"
          placeholder="Name"
        />
        <input
          onChange={(e) => handleChange(e, "email")}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => handleChange(e, "phone")}
          type="tel"
          placeholder="Phone"
        />
        <button onClick={(e) => handleAddContact(e)}>Add Contact</button>
      </form>
    </div>
  );
};

export default AddContact;
