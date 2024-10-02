// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { ContactServices } from "../../../services/ContactService";
// import { ToastContainer, toast } from "react-toastify";
// import Spinner from "../../Spinner/Spinner";
// // import Spinner from "../../Spinner/Spinner";

// const EditContact = () => {
//   let contactId = useParams();
//   let [state, setState] = useState({
//     loading: false,
//     contact: {},
//     errorMassege: "error",
//   });

//   useEffect(() => {
//     let promise = new Promise((res, rej) => {
//       setState({ ...state, loading: true });
//       let response = ContactServices.viewContact(contactId.id);
//       res(response);
//       rej("error");
//     });
//     promise
//       .then((res) => {
//         console.log(res.data);
//         setState({ ...state, loading: false, contact: res.data.contact });
//       })
//       .catch(() => {
//         toast.error("Error Getting Contacts Data", {
//           position: "top-center",
//           autoClose: 2000, // Close after 2 seconds
//         });
//         setState({ ...state, loading: true });
//       });
//   }, [contactId]);

//   let { loading, contact } = state;

//   const handleInputChange = (e) => {
//     let  { name, value } = e.target;
//     setState({ ...state, [name]: value });
// };

//   return (
//     <div>
//       <ToastContainer />
//       <React.Fragment>
//         {loading ? (
//           <div className="container">
//             <div className="row d-flex flex-column  align-items-center  ">
//               <div className="col">
//                 <Spinner />
//               </div>
//               <div className="col" style={{ width: "fit-content" }}>
//                 <Link to={"/"} className="btn btn-primary ">
//                   Back to Home Page
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <React.Fragment>
//             <section className="add-contact">
//               <div className="container p-3">
//                 <div className="row">
//                   <p className="text-primary h4 fw-bold">Edit Contact</p>
//                   <p className="fst-italic">
//                     {" "}
//                     Enter Respective field Carefully
//                   </p>
//                 </div>

//                 <div className="row d-flex align-items-center">
//                   <div className="col-md-4">
//                     <form action="">
//                       <div className="mb-2">
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Name"
//                           name="name"
//                           value={contact.name}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                       <div className="mb-2">
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Photo url"
//                           name="photo"
//                         />
//                       </div>
//                       <div className="mb-2">
//                         <input
//                           type="number"
//                           className="form-control"
//                           placeholder="Mobile"
//                           name="mobile"
//                         />
//                       </div>
//                       <div className="mb-2">
//                         <input
//                           type="email"
//                           className="form-control"
//                           placeholder="Email"
//                           name="email"
//                         />
//                       </div>
//                       <div className="mb-2">
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Company Name"
//                           name="companyName"
//                         />
//                       </div>
//                       <div className="mb-2">
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Title"
//                           name="title"
//                         />
//                       </div>
//                       <div className="mb-2">
//                         <select className="form-control" name="groupName">
//                           <option value="group1">Group 1</option>
//                           <option value="group2">Group 2</option>
//                         </select>
//                       </div>
//                       <div className="mb-2">
//                         <input
//                           type="submit"
//                           className="btn btn-primary"
//                           value="create"
//                         />
//                         <Link to={"/"} className="btn btn-danger ms-2">
//                           Cancel
//                         </Link>
//                       </div>
//                     </form>
//                   </div>
//                   <div className="col-md-8">
//                     <img src="" alt="" className="img-fluid" />
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </React.Fragment>
//         )}
//       </React.Fragment>
//     </div>
//   );
// };

// export default EditContact;