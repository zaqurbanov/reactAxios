import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { MdOutlineDeleteSweep, MdOutlineEdit } from "react-icons/md";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

function App() {
  const url = "http://localhost:3000/users";

  const [users, setUsers] = useState([]);
  const [seachInputValue,setSeacrhInputValue] = useState("")
  const [newUser, setNewUser] = useState({
    product: "",
    brand: "",
    price:"",
    stock:""
  });
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    const axiosData = async () => {
      const response = await axios.get(url);

      setUsers(response.data);
    };

    axiosData();
  }, []);
  const handleAddUser = async () => {

    if(newUser.brand =="" ||!newUser.brand){
        const brandError = "Brand must be field"
        setErrors(brandError)
        return 
    }
    await axios.post(url, newUser);
    const updatedUsers = await axios.get(url);
    setUsers(updatedUsers.data);
    setNewUser({
      product: "",
      brand: "",
      price:"",
      stock:""
    });

    setShow(false);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;

    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    const response = await axios.delete(`${url}/${id}`);

    const updatedUsers = await axios.get(url);
    setUsers(updatedUsers.data);
  };

  const handleUpdate = async () => {
    const id = newUser.id;
    console.log(id);
    const response = await axios.put(`${url}/${newUser.id}`, newUser);
    const updatedUsers = await axios.get(url);
    setUsers(updatedUsers.data);
    setShow(false);
    setIsUpdated(false);
  };
  const handleEditUser = (user) => {
    setShow(true);
    setNewUser(user);
    setIsUpdated(true);
  };

  const [show, setShow] = useState(false);

  const handleClose = () =>{
    
    setIsUpdated(false)
    setNewUser({
      product: "",
      brand: "",
      price:"",
      stock:""
    })
    setShow(false)};
   
  const handleShow = () => setShow(true);

  const handleSearch = (e)=>{
     

  }

  return (
    <>
      {/* <div>
        <input
          type="text"
          placeholder="name"
          value={newUser.name}
          name="name"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="text"
          placeholder="age"
          value={newUser.age}
          name="age"
          onChange={(e) => handleInputChange(e)}
        />
        <button onClick={() => handleAddUser()}>Add</button>
        <button onClick={() => handleUpdate()}> Edit</button>
      </div> */}
  <div>

     <input type="text" value={seachInputValue}  onChange={(e)=>handleSearch(e)}/>
     

  </div>
      <Table striped bordered hover size="lg" className="table" variant="dark">
        <thead>
          <tr>
            <th>id</th>
            <th>Product</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>
              <Button variant="primary" onClick={handleShow}>
                Add
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
          {users?.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.product}</td>
              <td>{user.brand}</td>
              <td>{user.price}</td>
              <td>{user.stock}</td>
              <td className=" btngrp">
                <Button variant="primary" onClick={() => handleEditUser(user)}>
                  <MdOutlineEdit />
                </Button>

                <Button onClick={() => handleDelete(user.id)} variant="warning">

                <MdOutlineDeleteSweep  />

                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
      

          <InputGroup size="sm">
        <InputGroup.Text id="inputGroup-sizing-lg">Product</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          value={newUser.product}
          name='product'
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => handleInputChange(e)}
        />
      </InputGroup>

       

          <InputGroup size="sm">
        <InputGroup.Text id="inputGroup-sizing-lg">Brand</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          value={newUser.brand}
          name='brand'
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => handleInputChange(e)}
        />
      </InputGroup>
   

          <InputGroup size="sm">
        <InputGroup.Text id="inputGroup-sizing-lg">Price</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          value={newUser.price}
          name='price'
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => handleInputChange(e)}
        />
      </InputGroup>
         
          <InputGroup size="sm">
        <InputGroup.Text id="inputGroup-sizing-lg">Stock</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          value={newUser.stock}
          type="number"
          name='stock'
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => handleInputChange(e)}
        />
      </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {isUpdated ? (
            <Button variant="warning" onClick={() => handleUpdate()}>
              Update
            </Button>
          ) : (
            <Button variant="Success" onClick={() => handleAddUser()}>
              Add
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
