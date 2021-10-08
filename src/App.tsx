import React, { ChangeEvent, useState, useEffect} from 'react';
import './App.css';
import moment from 'moment'
import data from './data/data.json'
import { Idata } from './interfaces'
import { Button, Form, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Employee from './components/employee';

function App() {
  //initializing states
  const [empData, setEmpData] = useState<Idata[]>(data)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [titleError, setTitleError] = useState<string>("")
  const [searchError, setsearchError] = useState<string>("")
  let count:Number  = 0

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
    if (empData.some(e => e.title === newEmp.title)) {
      setTitleError("Cannot Enter Existing Title")
    }
    else {
      setEmpData([ ...empData,newEmp])
      setTitle("")
      setDescription("")
      setTitleError("")
    }
  }

  //delete data object from state
  const deleteEmp = (empTitle: string): void => {
    let x: number = 0
    setEmpData(empData.filter((emp) => {
      if( emp.title === empTitle){
        x = emp.id
      }
      if ( emp.id > x){
        emp.id -= 1
      }
      return emp.title !== empTitle
    }))
  }

  //sorting table
  const sorted = (e: ChangeEvent<HTMLSelectElement>): void => {
    if(e.target.value ==="id"){
      setEmpData([...empData].sort((a: Idata, b: Idata) => {
        return a.id > b.id ? 1 : -1
      }))
    }
    if(e.target.value ==="title"){
      setEmpData([...empData].sort((a: Idata, b: Idata) => {
        return a.title.localeCompare(b.title)
      }))
    }
    if(e.target.value ==="description"){
      setEmpData([...empData].sort((a: Idata, b: Idata) => {
        return a.description.localeCompare(b.description)
      }))
    }
    if(e.target.value ==="createdAt"){
      setEmpData([...empData].sort((a: Idata, b: Idata) => 
      a.createdAt.split('/').reverse().join().localeCompare(b.createdAt.split('/').reverse().join())
      ))
    }
    
  }

  // eslint-disable-next-line
  useEffect(()=> {
    if( count === 0 ){
      setsearchError("No records Found")
    }
    else{
      setsearchError("")
    }
  })

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
                  <Form.Label id="check-title" className="text-danger">{titleError}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Role Description</Form.Label>
                  <Form.Control type="text" placeholder="Description" name="description" onChange={formInputs} value={description} required />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!title.trim() || !description.trim()}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className="emp-list mt-4 container">
        <h2 className="text-center">Employee Data</h2>
        <div className="row justify-content-center text-center">
          <div className="col-4">
          <label>Search:</label>
            <input type="text" className="search form-control " placeholder="Enter Title To Search" onChange={(event) => { setSearchTerm(event.target.value) }
              } /> 
          </div>
          <div className="form-group col-4">
            <label>Sort Using:</label>
            <select className="form-control" onChange={(event) => {sorted(event)}}>
              <option value="id">Id</option>
              <option value="title">Title</option>
              <option value="description">Description</option>
              <option value="createdAt">Created At</option>
            </select>
          </div>
        </div>
         <p className="text-center text-danger" id="count-search">{searchError}</p>
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
              { // eslint-disable-next-line array-callback-return
              empData.filter((val: Idata) => {
                if (searchTerm === "") {
                  return val
                }
                else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return val
                }
              }).map((emp: Idata, key: number) => {
                count = +count + 1
                return <Employee key={key} emp={emp} deleteEmp={deleteEmp}/>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
