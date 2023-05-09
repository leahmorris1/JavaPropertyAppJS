import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ManageBuyerBooking() {
    const { buyerId, firstName, surname } = useParams()
    const [records, setRecords] = useState([])
    const [propertyRecords, setPropertyRecords] = useState([])


    function getData() {
        fetch('http://localhost:8000/booking')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
        fetch('http://localhost:8000/property')
            .then((response) => response.json()
                .then((propertyData) => setPropertyRecords(propertyData)))
    }

    useEffect(() => { getData() }, [])

    function removeRecord(recno) {
        fetch(`http://localhost:8000/booking/${recno}`, { method: 'DELETE' })
            .then((response) => {
                if (response.ok) {
                    let temprecords = records.filter(recs => recs.id !== recno)
                    setRecords(temprecords);
                }
                else {
                    console.error('Error dleting record:', response.status);
                }
            })
            .catch(error => { console.error('Error deleting record', error) });
    }

    let filteredRecord = [records.filter(rec => rec.buyerid == buyerId) + propertyRecords.filter(rec => rec.id == buyerId)]

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const formattedDate = dateTime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        const formattedTime = dateTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric"
        });
        return `${formattedDate} at ${formattedTime}`;
    };

    return (
        <>
            <h1> Manage Seller Property <b>{firstName} {surname}</b></h1><br />

            <table className='container'>
                <tr>
                    <th> Address </th>
                    <th> Postcode </th>
                    <th> Type </th>
                    <th> Price </th>
                    <th> Bedroom </th>
                    <th> Bathroom </th>
                    <th> Garden </th>
                    <th> Booking date and time </th>
                    <th>  </th>
                </tr>
                {filteredRecord.map(() => {
                    propertyRecords.id == records.propertyId ?
                        (<tr class="tr1">
                            <td> {records.address} </td>
                            <td> {records.postcode} </td>
                            <td> {records.type} </td>
                            <td> {records.price} </td>
                            <td> {records.bedroom} </td>
                            <td> {records.bathroom} </td>
                            {records.garden == "true" ? (<td>Yes</td>) : (<td>No</td>)}
                            <td>  {filteredRecord.map(data => { formatDateTime(data.time) })} </td>
                            < td > <input className="btn_delete" type="button" value="Remove" onClick={() => removeRecord(propertyRecords.id)} /></td>
                        </tr>) : (<></>)
                })}
            </table >
        </>
    )

}

export default ManageBuyerBooking;