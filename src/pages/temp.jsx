
import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

const Page11 = () => {
    const [cellValues, setCellValues] = useState({
        table1: Array(5).fill(Array(10).fill("")),
        table2: Array(6).fill(Array(10).fill("")),
        table3: Array(7).fill(Array(10).fill("")),
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
        let specialValue;
        switch (tableIndex) {
            case 'table1':
                specialValue = 'A';
                break;
            case 'table2':
                specialValue = 'B';
                break;
            case 'table3':
                specialValue = 'C';
                break;
            default:
                specialValue = '';
                break;
        }
    
        return cellValues[tableIndex].map((row, rowIndex) => (
            <tr key={rowIndex}>
                <td style={{ backgroundColor : "white" , color: "black"}}>{ rowIndex === cellValues[tableIndex].length - 1 || rowIndex === cellValues[tableIndex].length - 2 ? 'ANS' : '#'}</td>
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
                        }
                    }
                `}
            </style>
            {Object.keys(cellValues).map((tableKey, index) => (
                <table key={index} style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px'  }}>
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

            <div className="submit-container">
                <button onClick={handleSubmit} className="submit-button">Submit</button>
            </div>
        </div>
    );
};

export default Page11;
