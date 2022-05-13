import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const apiEndPoint = "http://localhost:8080/";
const initialValue = {
  countryName: "",
  countryCode: "",
};

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialValue);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setFormData(initialValue);
    setShow(false);
  };

  useEffect(() => {
    async function fechCountries() {
      const { data } = await axios.get(apiEndPoint + "countries/list");
      setCountries(data);
    }
    fechCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateModal = (country) => {
    setFormData(country);
    handleShow();
  };

  const handleSubmit = async () => {
    if (formData.id) {
      const old = [...countries];
      const filtered = old.filter((o) => o.id === formData.id)[0];
      const index = old.indexOf(filtered);
      old[index] = { ...formData };
      handleClose();
      setCountries(old);
      await axios.put(apiEndPoint + "countries/update", formData);
    } else {
      const { data } = await axios.post(
        apiEndPoint + "countries/add",
        formData
      );
      handleClose();
      setCountries([data, ...countries]);
    }
  };

  const handleDelete = async (country) => {
    const old = [...countries];
    const result = old.filter((o) => o.id !== country.id);
    setCountries(result);
    await axios.delete(apiEndPoint + "countries/delete/" + country.id);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleShow}>
        Add new
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Update" : "Create"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Country Name
            </label>
            <input
              type="text"
              name="countryName"
              className="form-control"
              value={formData.countryName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Country Code
            </label>
            <input
              type="text"
              name="countryCode"
              className="form-control"
              value={formData.countryCode}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {formData.id ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Country Name</th>
            <th scope="col">Code</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr>
              <td>{country.id}</td>
              <td>{country.countryName}</td>
              <td>{country.countryCode}</td>
              <td>
                <button
                  className="btn btn-success me-3"
                  onClick={() => updateModal(country)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(country)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Countries;
