import React, { useState } from 'react';

const Page5 = () => {
    const [cellValues, setCellValues] = useState(() => {
        // Initialize cell values with empty strings
        return Array(1).fill(null).map(() => Array(20).fill(""));
    });

    const confirmSubmission = () => {
        const confirmed = window.confirm("Are you sure you want to submit?");
        if (confirmed) {
            const allValues = cellValues.flat();
            const allValuesFilled = allValues.every(value => value !== "");
            if (allValuesFilled) {
                window.alert("Form submitted.");
                // Here you can send the cellValues to the backend
            } else {
                window.alert("Please fill in all values before submitting.");
            }
        }
    };

    const handleCellValueChange = (rowIndex, colIndex, value) => {
        const updatedCellValues = [...cellValues];
        updatedCellValues[rowIndex] = [...updatedCellValues[rowIndex]];
        updatedCellValues[rowIndex][colIndex] = value;
        setCellValues(updatedCellValues);
    };

    const renderInputFields = () => {
        return cellValues.map((row, rowIndex) => (
            <div className="division" key={rowIndex}>
                {row.map((_, colIndex) => (
                    <div className="inline-content" key={`${rowIndex}-${colIndex}`}>
                        <input
                            type="text"
                            size="5"
                            value={cellValues[rowIndex][colIndex]}
                            onChange={(e) => handleCellValueChange(rowIndex, colIndex, e.target.value)}
                        />
                        <span> + </span>
                        <input
                            type="text"
                            size="5"
                        />
                        <span> = </span>
                        <input
                            type="text"
                            size="5"
                        />
                    </div>
                ))}
            </div>
        ));
    };

    const renderTable = () => {
        return (
            <div className="division">
                <table>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <tr key={index}>
                            <td><input type="text" size="5" /></td>
                            <td><input type="text" size="5" /></td>
                        </tr>
                    ))}
                </table>
            </div>
        );
    };

    return (
        <div>
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

                    .main-container {
                        display: flex;
                        justify-content: space-between;
                        gap: 20px;
                    }

                    .division {
                        flex: 1;
                        border: 1px solid #ddd;
                        padding: 10px;
                    }

                    .inline-content {
                        display: flex;
                        align-items: center;
                    }

                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }

                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: center;
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
            <div className="main-container">
                {renderInputFields()}
                {renderTable()}
                {renderInputFields()} {/* Assuming you want the input fields after the table */}
                {renderTable()}
            </div>

            <div className="submit-container">
                <button className="submit-button" onClick={confirmSubmission}>Submit</button>
            </div>
        </div>
    );
};

export default Page5;
