import React, { useRef, useState, useEffect } from 'react';

function Book() {
    const [records, setRecords] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedBuyer, setSelectedBuyer] = useState('');

    const buyerName = useRef();

    function getData() {
        fetch('http://localhost:8080/buyer/read')
            .then((response) => response.json())
            .then((data) => setRecords(data));
    }

    useEffect(() => {
        getData();
    }, []);
    function handleDateChange(event) {
        setSelectedDate(event.target.value);
    }
    function handleTimeChange(event) {
        setSelectedTime(event.target.value);
    }
    function handleBuyerChange(event) {
        setSelectedBuyer(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:8080/booking/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                buyerId: selectedBuyer,
                dateTime: selectedDate + ' ' + selectedTime,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setSelectedDate('');
                setSelectedTime('');
                setSelectedBuyer('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <header> Book A Viewing </header>
            <form onSubmit={handleSubmit}>
                <label htmlFor="buyer">Select a buyer:</label>
                <select id="buyer" ref={buyerName} onChange={handleBuyerChange} value={selectedBuyer}>
                    {records.map((data) => (
                        <option key={data.id} value={data.id}>
                            {data.firstName} {data.surname}
                        </option>
                    ))}
                </select>
                <br />

                <label htmlFor="date">Select a date:</label>
                <input type="date" id="date" onChange={handleDateChange} value={selectedDate} />
                <br />

                <label htmlFor="time">Select a time:</label>
                <input type="time" id="time" onChange={handleTimeChange} value={selectedTime} />
                <br />

                <button type="submit">Submit Booking</button>
            </form>
        </>
    );
}

export default Book;
