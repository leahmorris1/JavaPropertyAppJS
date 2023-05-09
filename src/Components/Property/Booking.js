import React from 'react';
import { useRef, useState, useEffect } from 'react';


function Book() {
    const [records, setRecords] = useState([]);

    const buyerName = useRef();
    const dateTime = useRef();

    function getData() {
        fetch('http://localhost:8000/buyer')
            .then((response) => response.json()
                .then((data) => setRecords(data)))
    }

    useEffect(() => { getData() }, [])

    return (
        <>
            <header> Book A Viewing </header><br />
            <select ref={buyerName}>
                {records.map(data =>
                    <option> {data.firstName} {data.surname} {data.id} </option>
                )}
            </select >
            <br />

            <></>
            <label for="date">Select a date:</label><input type="date" ref={dateTime} />
            <label for="date">Select a time:</label><input type="time" ref={dateTime} />
            <select>
                {/* {for ($i = 16; $i <= 21; $i++)
                <option value="{{ $i }}">{{ $i }}:00</option>
                endforeach} */}
            </select>
        </>
    )
}
export default Book;
