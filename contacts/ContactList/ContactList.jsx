import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactServices } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import NavBar from "../../NavBar/NavBar";

const ContactList = () => {
  let  [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let promise = new Promise((res, rej) => {
      setLoading(true);
      let response = ContactServices.getAllContacts();
      res(response);
      rej("error");
      setLoading(false);
    });
    promise
      .then((res) => {
        // console.log(res.data);
        setContacts(res.data.contacts);
        setLoading(false);
      })
      .catch(() => {
        setLoading(true);
        toast.error("Error Getting Contacts Data", {
          position: "top-center",
          autoClose: 2000, // Close after 2 seconds
        });
      });
  }, []);

  // let { loading,  errorMassage } = state;

  const handleSearchInputChange = (e) => {
    const inputText = e.target.value;
    setSearchInput(inputText);

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(inputText.toLowerCase())
    );

    setSearchResults(filteredContacts);
  };

  const deleteContact = (id) => {
    let promise = new Promise((res, reject) => {
      let response = ContactServices.deleteContact(id);
      res(response);
      reject("Error");
    });
    promise
      .then((res) => {
        setLoading(true);
        const updatedContacts = contacts.filter((contact) => contact.id !== id);

        // Show a toast message when contact is deleted
        toast.success("Contact deleted successfully", {
          position: "top-center",
          autoClose: 1000,
        });
        //update contact list
        setContacts(updatedContacts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
        // Show an error toast message if deletion fails
        toast.error("Error deleting contact", {
          position: "top-center",
          autoClose: 2000, // Close after 2 seconds
        });
      });
  };

  return (
    <div>
      <ToastContainer />
      {/* <NavBar/> */}
        {/* <pre> {JSON.stringify(contacts)}</pre> */}
        <section className="contact-search p-3">
          <div className="container">
            <div className="grid">
              <div className="row">
                <p className="h3 text-warning text-dark">
                  Contact Manager{" "}
                  <Link to={"/contacts/add"} className="btn btn-primary">
                    <i className="fa fa-plus-circle ms2 me-2" />
                    New
                  </Link>
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Obcaecati eligendi dolore repudiandae eum sint, dolor
                  reprehenderit officiis temporibus perspiciatis doloribus, ipsa
                  aliquid magni exercitationem accusantium cum voluptates velit,
               
                </p>
              </div>
              <div className="row d-flex justify-content-center ">
                <div className="col-md-4">
                  <form>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="search names"
                      className="form-control"
                      value={searchInput}
                      onChange={handleSearchInputChange}
                    />
                  </form>
                </div>
                <div className="col-md-1 mb-2">
                  <button className="btn btn-primary" onClick={()=>{setSearchInput("")}}>
                    <i className="fa fa-close"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <section className="contact-card">
              <div className="container">
                <div className="row">
                  {(searchInput === "" ? contacts : searchResults).map(
                    (contact) => (
                      <div className="col-md-6 mb-4  ">
                        <div className="card " >
                          <div className="card-body" >
                            <div className="row d-flex justify-content-center    align-items-center   flex-column flex-lg-row  ">
                              {/* col-md-1 d-flex flex-row flex-md-column  align-items-center  justify-content-center */}
                              <div className="col-4 mb-4 " >
                                <img
                                  src={contact.photo}
                                  alt={contact.name}
                                  className="img-fluid"
                                />
                              </div>
                              <div className="col-7 d-flex align-items-center mb-2  " >
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    {" "}
                                    Name :{" "}
                                    <span className="fw-bold">
                                      {contact.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Contact :{" "}
                                    <span className="fw-bold">
                                      {contact.mobile}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email :{" "}
                                    <span className="fw-bold">
                                      {contact.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-1 d-flex flex-row  flex-lg-column justify-content-sm-around align-items-center   " >
                              {/* col-md-1 d-flex flex-row flex-md-column  align-items-center  justify-content-center */}
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning  m-1 "
                                >
                                  <i className="fa fa-eye " />
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary m-1 "
                                >
                                  <i className="fa fa-pen " />
                                </Link>
                                <button
                                  className="btn btn-danger m-1  "
                                  onClick={() => {
                                    deleteContact(contact.id);
                                  }}
                                >
                                  <i className="fa fa-trash " />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
          </React.Fragment>
        )}
      
    </div>
  );
};

export default ContactList;
