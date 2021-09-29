import React from 'react';
import {Idata} from './interfaces'
interface Props{
    emp: Idata,
    deleteEmp(deleteEmp: string): void
}

const Employee = ({emp,deleteEmp}:Props ) => {
    return(
        <tr>
        <td>{emp.id}</td>
        <td>{emp.title}</td>
        <td>{emp.description}</td>
        <td>{emp.createdAt}</td>
        <td><button className="btn btn-danger" onClick={() => {if(window.confirm('Are You sure you wish to delete this record?')){ deleteEmp(emp.title) } }}>X</button></td>
      </tr>
    )
}

export default Employee