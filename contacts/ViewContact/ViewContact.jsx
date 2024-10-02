import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactServices } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewContact = () => {
  let contactId = useParams();
  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMassege: "error",
  });

  useEffect(() => {
    let promise = new Promise((res, rej) => {
      setState({ ...state, loading: true });
      let response = ContactServices.viewContact(contactId.id);
      res(response);
      rej("error");
    });
    promise
      .then((res) => {
        console.log(res.data);
        setState({ ...state, loading: false, contact: res.data.contact });
      })
      .catch(() => {
        toast.error("Error Getting Contacts Data", {
          position: "top-center",
          autoClose: 2000, // Close after 2 seconds
        });
        setState({ ...state, loading: true });
      });
  }, [contactId.id]);

  let { loading, contact } = state;

  return (
    <div>
      <ToastContainer />
      <React.Fragment>
        {/* <h1>{contactId}</h1> */}
        {loading ? (
          <div className="container">
            <div className="row d-flex flex-column  align-items-center  ">
            <div className="col">
              <Spinner />
            </div>
            <div className="col" style={{width:"fit-content"}}>
              <Link to={"/"} className="btn btn-primary ">Back to Home Page</Link>
            </div>
          </div>
          </div>
        ) : (
          <React.Fragment>
            {Object.keys(contact).length > 0 && (
              <>
                <section className="view-contact-intro p-3 ">
                  <div className="container">
                    <div className="row">
                      <p className="h3 text-success  fw-bold ">
                        {" "}
                        View Contact{" "}
                      </p>
                      <p className="fst-italic ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas rerum quod incidunt esse, consectetur reprehenderit iure dolores? Dolor, accusamus impedit Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                    </div>
                  </div>
                </section>
                <section className="view-contact">
                  <div className="container">
                    <div className="row d-flex justify-content-center ">
                      <div className="col">
                        <img
                          src={contact.photo}
                          alt={contact.name}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="row mt-3 ">
                      <div className="col-md-8 ">
                        <ul className="list-group">
                          <li className="list-group-item list-group-item-action">
                            {" "}
                            Name :{" "}
                            <span className="fw-bold">{contact.name}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            Contact :{" "}
                            <span className="fw-bold">{contact.mobile}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            Email :{" "}
                            <span className="fw-bold">{contact.email}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            company :{" "}
                            <span className="fw-bold">
                              {contact.companyName}
                            </span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            group :{" "}
                            <span className="fw-bold">{contact.groupName}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            title :{" "}
                            <span className="fw-bold">{contact.title}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-3 mt-4">
                        <Link to={"/"} className="btn btn-success ">
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    </div>
  );
};

export default ViewContact;
