import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Buy() {
    const navigate = useNavigate()

    const { sellerId, firstName, surname } = useParams()

    const [records, setRecords] = useState([])

    function getData() {
        fetch('http://localhost:8000/property')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
    }

    useEffect(() => { getData() }, [])

    function removeRecord(recno) {
        fetch(`http://localhost:8000/property/${recno}`, { method: 'DELETE' })
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

    function sellerPropertyForm() {
        const url = `/Seller/AddSellerPropertyForm/${sellerId}/${firstName}/${surname}`
        navigate(url)
    }

    function withdrawRecord(recno, newstatus) {
        fetch(`http://localhost:8000/property/${recno}`, {
            method: 'PATCH',
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
                "status": newstatus
            })
        })
            .then((response) => {
                navigate(`/Seller/ManageSellerProperty/${sellerId}/${firstName}/${surname}`);
                getData();
            })
            .catch(error => {
                console.error('Error saving seller:', error);
            });
    }

    // eslint-disable-next-line eqeqeq
    let filteredRecord = records.filter(rec => rec.sellerId == sellerId)

    return (
        <>
            <header> Buy A Property <b>{firstName} {surname}</b> </header><br />

            <br />
            <button className="btn btn-light addpropertybtn" onClick={() => sellerPropertyForm()}> Add Poperty</button>
            <br /><br />

            <table class="table">
                <tr>
                    <th> SellerId </th>
                    <th> Address </th>
                    <th> Postcode </th>
                    <th> Type </th>
                    <th> Price </th>
                    <th> Bedroom </th>
                    <th> Bathroom </th>
                    <th> Garden </th>
                    <th> Status </th>
                    <th> PropertyID </th>
                    <td>  </td>
                </tr>


                {filteredRecord.map(data =>
                    <tr>
                        <td> {data.sellerId} </td>
                        <td> {data.address} </td>
                        <td> {data.postcode} </td>
                        <td> {data.type} </td>
                        <td> {data.price} </td>
                        <td> {data.bedroom} </td>
                        <td> {data.bathroom} </td>
                        <td> {data.garden} </td>
                        <td> {data.status} </td>
                        <td> {data.id} </td>
                        {// eslint-disable-next-line eqeqeq
                            data.status != 'SOLD' ?
                                // eslint-disable-next-line eqeqeq
                                (data.status == "FOR SALE" ?
                                    (<td><input className="btn_withdraw" type="button" value="Withdraw" onClick={() => withdrawRecord(data.id, "Withdraw")} /></td>)
                                    :
                                    (<td><input className="btn_withdraw" type="button" value="Resubmit" onClick={() => withdrawRecord(data.id, "FOR SALE")} /></td>)
                                )
                                : (<td></td>)}
                        < td > <input className="btn_delete" type="button" value="Remove" onClick={() => removeRecord(data.id)} /></td>
                    </tr>

                )}
            </table >
        </>
    )
}
export default Buy;
