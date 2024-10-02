import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactServices } from "../../../services/ContactService";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../../Spinner/Spinner";
import "react-toastify/dist/ReactToastify.css";
const EditContact = () => {
  let contactId = useParams();
  let  [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "error",
  });

  useEffect(() => {
    ContactServices.viewContact(contactId.id)
      .then((response) => {
        setState({ ...state, loading: false, contact: response.data.contact });
      })
      .catch(() => {
        toast.error("Error Getting Contacts Data", {
          position: "top-center",
          autoClose: 2000,
        });
        setState({ ...state, loading: true });
      });
  }, [contactId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, contact: { ...state.contact, [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    ContactServices.editContact(state.contact)
      .then((response) => {

        toast.success("Contact updated successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        window.location.href = '/';
      })
      .catch((error) => {
        toast.error("Error updating contact", {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  let  { loading, contact } = state;

  return (
    <React.Fragment>
      <ToastContainer />
      {loading ? (
        <div className="container">
          <div className="row d-flex flex-column  align-items-center">
            <div className="col">
              <Spinner />
            </div>
            <div className="col" style={{ width: "fit-content" }}>
              <Link to={"/"} className="btn btn-primary">
                Back to Home Page
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <section className="add-contact">
          <div className="container p-3">
            <div className="row">
              <p className="text-primary h4 fw-bold">Edit Contact</p>
              <p className="fst-italic">Enter Respective field Carefully</p>
            </div>

            <div className="row d-flex align-items-center">
              <div className="col-md-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={contact.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Photo url"
                      name="photo"
                      value={contact.photo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Mobile"
                      name="mobile"
                      value={contact.mobile}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={contact.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Name"
                      name="companyName"
                      value={contact.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      name="title"
                      value={contact.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2">
                    <select
                      className="form-control"
                      name="groupName"
                      value={contact.groupName}
                      onChange={handleInputChange}
                    >
                      <option value="group1">Group 1</option>
                      <option value="group2">Group 2</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <input type="submit" className="btn btn-primary" value="Update" />
                    <Link to={"/"} className="btn btn-danger ms-2">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
              <div className="col-md-8">
                <img src={contact.photo} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default EditContact;
