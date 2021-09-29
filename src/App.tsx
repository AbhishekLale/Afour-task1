import React, { ChangeEvent, useState } from 'react';
import './App.css';
import moment from 'moment'
import data from './data/data.json'
import { Idata } from './interfaces'
import { Button, Form, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Employee from './employee';

function App() {
  //initializing states
  const [empData, setEmpData] = useState<Idata[]>(data)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  
  //for form input
  const formInputs = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "title") {
      setTitle(event.target.value)
    }
    else {
      setDescription(event.target.value)
    }
  }

  //add data object to state
  const addEmp = (event: React.FormEvent): void => {
    event.preventDefault()
    let length = empData.length
    let newEmp = {
      id: length + 1,
      title: title,
      description: description,
      createdAt: moment().format("DD/MM/YYYY")
    }
    let element: HTMLElement = document.getElementById("check-title") as HTMLElement
    if (empData.some(e => e.title === newEmp.title)) {
      element.innerHTML = "Cannot Enter Existing Title"
    }
    else {
      setEmpData([newEmp, ...empData])
      setTitle("")
      setDescription("")
      element.innerHTML = ""
    }
  }

  //delete data object from state
  const deleteEmp = (empTitle: string): void => {
    setEmpData(empData.filter((emp) => {
      return emp.title !== empTitle
    }))
  }

  //sorting table
  const sorted = (): void => {
    setEmpData([...empData].sort((a: Idata,b: Idata) => {
      return a.title.localeCompare(b.title)
    }))
  }
    
  

  return (
    <div className="App">
      <div className="container border border-dark p-2 mb-3">
        <h2 className="text-center">Add Employee</h2>
        <div className="input-form">
          <Form onSubmit={(event) => addEmp(event)}>
            <Row className="justify-content-md-center">
              <Col className="p-2 border border-dark text-center" xs lg="3">
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Employee Role</Form.Label>
                  <Form.Control type="text" placeholder="Title" name="title" onChange={formInputs} value={title} required />
                  <Form.Label id="check-title" className="text-danger"></Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Role Description</Form.Label>
                  <Form.Control type="text" placeholder="Description" name="description" onChange={formInputs} value={description} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className="emp-list mt-4 container">
        <h2 className="text-center">Employee Data</h2>
        <div className="col-3 mx-auto text-center">
          <input type="text" className="search form-control m-2" placeholder="Enter Title To Search" onChange={(event) => { setSearchTerm(event.target.value) }
          } />
          <span id="validate-search"></span>
          <Button variant="warning" onClick={sorted}>Sort</Button>
        </div>
        <div className=" mt-2 table-wrapper-scroll-y my-custom-scrollbar">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {empData.filter((val: Idata) => {
                if (searchTerm === "") {
                  return val
                }
                else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
              }).map((emp: Idata, key: number) => {
                return <Employee key={key} emp={emp} deleteEmp={deleteEmp} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
