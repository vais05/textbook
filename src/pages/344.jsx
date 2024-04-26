import React, { useState } from 'react';

const Page3 = () => {
    const [cellValues, setCellValues] = useState({
        table1: Array(4).fill(Array(11).fill("")),
        table2: Array(5).fill(Array(11).fill("")),
        table3: Array(5).fill(Array(11).fill("")),
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

    const confirmSubmission = () => {
        const confirmed = window.confirm("Are you sure you want to submit?");
        if (confirmed) {
            const allValues = Object.values(cellValues).flat();
            const allValuesFilled = allValues.every(value => value !== "");
            if (allValuesFilled) {
                window.alert("Form submitted.");
                // Here you can send the cellValues to the backend
            } else {
                window.alert("Please fill in all values before submitting.");
            }
        }
    };

    const renderTableRows = (tableIndex) => {
        return cellValues[tableIndex].map((row, rowIndex) => (
            <tr key={rowIndex}>
                <td>{rowIndex === 0 ? getSpecialValue(tableIndex) : rowIndex === cellValues[tableIndex].length - 1 ? 'ANS' : '#'}</td>
                {row.map((cell, colIndex) => (
                    colIndex !== 10 &&
                    <td key={colIndex}>
                        <input
                            type="text"
                            value={cell}
                            onChange={(e) => handleCellValueChange(tableIndex, rowIndex, colIndex, e.target.value)}
                            style={{ width: '100%' }} // Ensuring input takes full cell width
                        />
                    </td>
                ))}
            </tr>
        ));
    };

    const getSpecialValue = (tableIndex) => {
        switch (tableIndex) {
            case 'table1':
                return 'A';
            case 'table2':
                return 'B';
            case 'table3':
                return 'C';
            default:
                return '';
        }
    };

    return (
        <div>
            <style>
                {`
                    /* Basic styles for the page */
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        padding: 0;
                    }

                    /* Header styles */
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

                    /* Table styles */
                    table {
                        border-collapse: collapse;
                        width: 100%;
                        margin-bottom: 20px;
                    }

                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align:center;
                    }

                    th {
                        background-color: #800080;
                        color: white;
                    }

                    /* Submit button styles */
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

                    /* Media queries for responsive design */
                    @media screen and (max-width: 768px) {
                        .academy-name {
                            font-size: 18px;
                        }

                        table {
                            font-size: 12px;
                        }

                        th, td {
                            padding: 6px;
                        }
                    }

                    @media screen and (max-width: 480px) {
                        .academy-name {
                            font-size: 14px;
                        }

                        table {
                            font-size: 10px;
                        }

                        th, td {
                            padding: 4px;
                        }
                    }
                `}
            </style>
            {Object.keys(cellValues).map((tableKey, index) => (
                <table key={index}>
                    <thead>
                        <tr>
                            <th>#</th>
                            {[...Array(10)].map((_, i) => <th key={i}>{i + 1}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows(tableKey)}
                    </tbody>
                </table>
            ))}

            <div className="submit-container">
                <button className="submit-button" onClick={confirmSubmission}>Submit</button>
            </div>
        </div>
    );
};

export default Page3;
