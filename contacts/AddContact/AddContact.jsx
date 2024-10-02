import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddContact = () => {
   
    // Define state variables to hold form input values
    const [formData, setFormData] = useState({
        name: "",
        photo: "",
        mobile: 0,
        email: "",
        companyName: "",
        title: "",
        groupName: "",
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const apiUrl = 'http://localhost:8083/addContact';

        // Create a POST request with the formData
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // alert("Contact Added Successfully");
                // window.location.href = '/';
                toast.success("Contact added  successfully", {
                    position: "top-center",
                    autoClose: 2000,
                  });  
                  window.location.href = '/';
               
                
            })
            .catch((error) => {
                console.error('Error creating contact:', error);
            });
    };

    return (
        <div>
            <ToastContainer/>
            <section className="add-contact">
                <div className="container p-3">
                    <div className="row">
                        <p className="text-success h4 fw-bold">Create Contact</p>
                        <p className="fst-italic">Enter Respective fields Carefully</p>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <form >{/*onSubmit={handleFormSubmit} */}
                                <div className="mb-2">
                                    <input type="text" className='form-control' placeholder='Name' name='name'
                                    value={formData.name} onChange={handleInputChange}  />
                                </div>
                                <div className="mb-2">
                                    <input type="text" className='form-control' placeholder='Photo url' name='photo' 
                                    value={formData.photo} onChange={handleInputChange} />
                                </div>
                                <div className="mb-2">
                                    <input type="number" className='form-control' placeholder='Mobile' name='mobile'
                                    value={formData.mobile} onChange={handleInputChange}  />
                                </div>
                                <div className="mb-2">
                                    <input type="email" className='form-control' placeholder='Email' name='email' 
                                    value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="mb-2">
                                    <input type="text" className='form-control' placeholder='Company Name' name='companyName'
                                        value={formData.companyName} onChange={handleInputChange} />
                                </div>
                                <div className="mb-2">
                                    <input type="text" className='form-control' placeholder='Title' name='title'
                                        value={formData.title} onChange={handleInputChange} />
                                </div>
                                <div className="mb-2">
                                    <select className="form-control" name="groupName" value={formData.groupName} onChange={handleInputChange}>
                                        <option value="group1">Alfa</option>
                                        <option value="group2">Super 30</option>
                                        <option value="group2">Testing</option>
                                        
                                    </select>
                                </div>
                                
                                <div className="mb-2">
                                    <button className='btn btn-success ' onClick={handleFormSubmit}>Submit</button>
                                    <Link to={'/'} className="btn btn-danger ms-2">
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
};

export default AddContact;
