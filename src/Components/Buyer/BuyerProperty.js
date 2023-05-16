import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Buyer() {
    const navigate = useNavigate()

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://localhost:8080/buyer/read')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
    }

    useEffect(() => { getData() }, [])

    function removeRecord(recno) {
        //let choice = window.confirm('Are you sure you wish to delete this item?')
        //if (choice === true) {
        let temprecords = records.filter(recs => recs.address !== recno)
        setRecords(temprecords)
        //}
    }

    function buyerBookings(buyer) {
        const url = `/Buyer/ManageBuyerBookings/${buyer.id}/${buyer.firstName}/${buyer.surname}`
        navigate(url)
    }

    return (
        <>
            <h1> Buyer Data Page </h1>
            <br />
            <div className='container'>
                <Link className="btn btn-light" to="/Buyer/AddBuyerForm"> Add Buyer</Link>
                <Link className="addsellerbtn" type="button" value="Add Seller" />
            </div>
            <br />

            <table className='container'>
                <tr>
                    <th>First Name</th>
                    <th>Surname</th>
                    <th>Address</th>
                    <th>Poscode</th>
                    <th>PhoneNo</th>
                    <th>  </th>
                    <th>  </th>
                </tr>
                {records.map(rec => <tr class="tr1">
                    <td> {rec.firstName}  </td>
                    <td> {rec.surname}  </td>
                    <td> {rec.address}  </td>
                    <td> {rec.postcode}  </td>
                    <td> {rec.phone}  </td>
                    <td><button className='btn btn-light' onClick={() => buyerBookings(rec)}>Manage</button></td>
                    <td><input className="btn_delete" type="button" value="Remove" onClick={() => removeRecord(rec.address)} /></td>
                </tr>
                )
                }
            </table>
        </>
    )
}

export default Buyer;
