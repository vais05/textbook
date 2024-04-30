import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
const Page6 = () => {
    // Define a state to hold the values of cells
    const [cellValues, setCellValues] = useState({
        // Initialize with empty values for each cell
        table1: Array(10).fill(Array(3).fill("")),
        table2: Array(10).fill(Array(3).fill("")),
        table3: Array(9).fill(Array(3).fill("")),
        table4: Array(9).fill(Array(3).fill("")) // Include table4 in the state
    });

    // Function to handle change in cell value
    const handleCellValueChange = (tableIndex, rowIndex, colIndex, value) => {
        // Update the cell value in the state
        const updatedCellValues = {
            ...cellValues,
            [tableIndex]: cellValues[tableIndex].map((row, rIndex) => {
                if (rIndex === rowIndex) {
                    return row.map((cell, cIndex) => (cIndex === colIndex ? value : cell));
                }
                return row;
            })
        };
        setCellValues(updatedCellValues);
    };

    // Function to confirm submission
    const confirmSubmission = () => {
        // Ensure all values are obtained before submitting
        const allValues = Object.values(cellValues).flat();
        const allValuesFilled = allValues.every(value => value !== "");
        if (allValuesFilled) {
            const confirmed = window.confirm("Are you sure you want to submit?");
            if (confirmed) {
                handleSubmit(); // Call handleSubmit function if confirmed
            }
        } else {
            window.alert("Please fill in all values before submitting.");
        }
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        console.log(cellValues);
        try {
            const res = await axios.post("http://localhost:5000/newQuestion", {
                table1: cellValues.table1,
                table2: cellValues.table2,
                table3: cellValues.table3,
                table4: cellValues.table4, // Include table4 in the request
            });
            window.alert("Form submitted.");
        } catch (error) {
            console.error("Error submitting form:", error);
            window.alert("Error submitting form. Please try again later.");
        }
    };

    // Render table rows and cells based on cellValues state
    const renderTableRows = (tableIndex) => {
        return cellValues[tableIndex].map((row, rowIndex) => (
            <tr key={rowIndex}>
                <td style={{ color: rowIndex === 0 ? 'black' : 'inherit' }}>{<span style={{ color: 'black' }}>#</span>}</td>
                {row.map((cell, colIndex) => (
                    // Exclude the last column
                    colIndex !== 10 &&
                    <td key={colIndex} style={{ backgroundColor: "white" }}>
                        <input
                            onKeyDown={(evt) => ["e", "E"].includes(evt.key) && evt.preventDefault()}
                            type="number"
                            value={cell}
                            onChange={(e) => handleCellValueChange(tableIndex, rowIndex, colIndex, e.target.value)}
                            style={{ width: '100%', boxSizing: 'border-box', margin: "0px" }}
                        />
                    </td>
                ))}
            </tr>
        ));
    };

    return (
        <div style={{ marginLeft: '300px', marginRight: '0px' }}>
        <Header />
            <style>
                {`
                body {
                        font-family: Arial, sans-serif;
                        padding: 0;
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
                        background-color: #8e44ad;
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
                        
                    @media (max-width: 768px) {
                        .header, .submit-container, table {
                            margin: 10px;
                        }

                        th, td {
                            padding: 4px;

                        }

                        .submit-button {
                            padding: 8px 16px;
                            font-size: 14px;
                            margin-bottom:"10px";
                        }
                    }
                `}
            </style>
            <div className="table-container gap">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows('table1')}
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows('table2')}
                    </tbody>
                </table>
            </div>

            <div className="table-container">
                <table>
                    <tbody>
                        {renderTableRows('table3')}
                    </tbody>
                </table>

                <table>
                    <tbody>
                        {renderTableRows('table4')}
                    </tbody>
                </table>
            </div>

            <div className="submit-container">
                <button className="submit-button" onClick={confirmSubmission}>Submit</button>
            </div>
        </div>
    );
};

export default Page6;
