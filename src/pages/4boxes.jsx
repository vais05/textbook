/* eslint-disable no-undef */
import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
const Page4 = () => {
    // Define a state to hold the values of cells
    const [cellValues, setCellValues] = useState({
        // Initialize with empty values for each cell
        table1: Array(10).fill(Array(3).fill("")),
        table2: Array(10).fill(Array(3).fill("")),
        table3: Array(9).fill(Array(3).fill("")),
        table4: Array(9).fill(Array(3).fill(""))
    });

    // Function to handle change in cell value
    const handleCellValueChange = (tableIndex, rowIndex, colIndex, value) => {
        // Update the cell value in the state
        const updatedCellValues = [...cellValues[tableIndex]];
        updatedCellValues[rowIndex][colIndex] = value;
        setCellValues({
            ...cellValues,
            [tableIndex]: updatedCellValues
        });
    };

    // Function to confirm submission
    const confirmSubmission = () => {
        // Ensure all values are obtained before submitting
        const allValues = Object.values(cellValues).flat();
        const allValuesFilled = allValues.every(value => value !== "");
        if (allValuesFilled) {
            const confirmed = window.confirm("Are you sure you want to submit?");
            if (confirmed) {
                // Perform submission to backend
                window.alert("Form submitted.");
            }
        } else {
            window.alert("Please fill in all values before submitting.");
        }
    };

    // Render table rows and cells based on cellValues state
    const renderTableRows = (tableIndex) => {
        return cellValues[tableIndex].map((row, rowIndex) => (
            <tr key={rowIndex}>
                <td style={{ color: rowIndex === 0 ? 'black' : 'inherit' }}>{<span style={{ color: 'black' }}>#</span>}</td>

                {row.map((cell, colIndex) => (
                    <td key={colIndex} style={{ backgroundColor: "white" }}>
                        <input
                                                onKeyDown={(evt) => ["e", "E"].includes(evt.key) && evt.preventDefault()}
                            type="text"
                            value={cell}
                            onChange={(e) => handleCellValueChange(tableIndex, rowIndex, colIndex, e.target.value)}
                            style={{ width: '100%', boxSizing: 'border-box', margin: "0px" }}


                        />
                    </td>
                ))}
            </tr>
        ));
    };
    const handleSubmit = async () => {
        console.log(cellValues);
        let res = await axios.post("http://localhost:5000/newQuestion", {} , {
            params:{
                table1 : cellValues.table1,
                table2 : cellValues.table2,
                table3 : cellValues.table3,
            }
        })
    }


    return (
<div style={{marginLeft: '300px', marginRight: '0px' }}>
            <Header />
                        <style>
                {`
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        padding: 0;
                    }

                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 2px solid #333;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }

                    .academy-name {
                        font-size: 24px;
                        font-weight: bold;
                    }

                    .table-container {
                        display: flex;
                        justify-content: space-between;
                        gap: 20px;
                    }

                    table {
                        border-collapse: collapse;
                        width: 45%;
                    }

                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: center;
                    }

                    th {
                        background-color: #800080;
                        color: white;
                    }

                    .gap {
                        margin-bottom: 40px;
                    }

                    .submit-container {
                        text-align: center;
                        margin-top: 20px;
                    }

                    .submit-button {
                        padding: 10px 20px;
                        font-size: 16px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        cursor: pointer;
                        border-radius: 5px;
                    }

                    .submit-button:hover {
                        background-color: #45a049;
                    }
                `}
            </style>
            <div className="table-container gap">
            {Object.keys(cellValues).map((tableKey, index) => (
                <table key={index} style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px'  }}> {/* Adjusted margin here */}
                    <thead>
                        <tr>
                        <th>{String.fromCharCode(65 + index)}</th>
                            {[...Array(10)].map((_, i) => <th key={i}>{i + 1}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows(tableKey)}
                    </tbody>
                </table>
            ))}

            </div>

            <div className="submit-container">
                <button onClick={handleSubmit} className="submit-button">Submit</button>
            </div>
        </div>
    );
};

export default Page4;
