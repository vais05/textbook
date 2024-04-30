import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

const Page6 = () => {
    const [cellValues, setCellValues] = useState({
        table1: Array(4).fill(Array(10).fill("")),
        table2: Array(4).fill(Array(10).fill("")),
        table3: Array(5).fill(Array(10).fill("")),
        table4: Array(5).fill(Array(10).fill("")),
        table5: Array(4).fill(Array(10).fill("")),
        table6: Array(4).fill(Array(10).fill("")),
    });

    const handleCellValueChange = (tableIndex, rowIndex, colIndex, value) => {
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

    const renderTableRows = (tableIndex) => {
        return cellValues[tableIndex].slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                    // Exclude the last column
                    colIndex !== 10 &&
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
                table4 : cellValues.table4,
                table5 : cellValues.table5,
                table6 : cellValues.table6,
            }
        })
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

                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin-bottom: 20px;
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
            {Object.keys(cellValues).map((tableKey, index) => (
                <table key={index}>
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
            <table>
                <tbody>
                    <tr>
                        <td>Result</td>
                    </tr>
                    <tr>
                        <td>TimeTaken (B)</td>
                        <td><input type="text" style={{ width: '100%', boxSizing: 'border-box' }} /></td>
                    </tr>
                    <tr>
                        <td>Total Time A( & B)</td>
                        <td><input type="text" style={{ width: '100%', boxSizing: 'border-box' }} /></td>
                    </tr>
                    <tr>
                        <td>Percentage</td>
                        <td><input type="text" style={{ width: '100%', boxSizing: 'border-box' }} /></td>
                    </tr>
                    <tr>
                        <td>Remarks</td>
                        <td><input type="text" style={{ width: '100%', boxSizing: 'border-box' }} /></td>
                    </tr>
                    <tr>
                        <td>Signature</td>
                        <td><input type="text" style={{ width: '100%', boxSizing: 'border-box' }} /></td>
                    </tr>
                </tbody>
            </table>
            <div className="submit-container">
                <button onClick={handleSubmit} className="submit-button">Submit</button>
            </div>
        </div>
    );
};

export default Page6;
