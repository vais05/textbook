import React, { useState } from 'react';

const Page8 = () => {
    const [cellValues, setCellValues] = useState(() => {
        // Initialize cell values with empty strings
        return Array(1).fill(null).map(() => Array(20).fill(""));
    });

    const handleCellValueChange = (rowIndex, colIndex, value) => {
        const updatedCellValues = cellValues.map((row, rIndex) => {
            if (rIndex === rowIndex) {
                return row.map((cell, cIndex) => (cIndex === colIndex ? value : cell));
            }
            return row;
        });
        setCellValues(updatedCellValues);
    };

    const handleSubmit = () => {
        // Check if any cell is empty
        const isEmptyCell = cellValues.some(row => row.some(cell => cell === ""));

        if (isEmptyCell) {
            alert("Please fill in all the cells before submitting.");
            return; // Exit early if any cell is empty
        }

        // Proceed with submission
        console.log("Submitting:", cellValues);
    };

    const renderInputFields = () => {
        return cellValues.map((row, rowIndex) => (
            <div className="division" key={rowIndex}>
                {row.map((_, colIndex) => (
                    <div className="inline-content" key={`${rowIndex}-${colIndex}`}>
                        <input
                            onKeyDown={(evt) => ["e", "E"].includes(evt.key) && evt.preventDefault()}
                            type="text"
                            size="5"
                            value={cellValues[rowIndex][colIndex]}
                            onChange={(e) => handleCellValueChange(rowIndex, colIndex, e.target.value)}
                        />
                        <span> + </span>
                        <input
                            onKeyDown={(evt) => ["e", "E"].includes(evt.key) && evt.preventDefault()}
                            type="text"
                            size="5"
                        />
                        <span> = </span>
                        <input
                            onKeyDown={(evt) => ["e", "E"].includes(evt.key) && evt.preventDefault()}
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
                    padding: 0;
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
                    margin-bottom: 20px;
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
                        margin-bottom: 10px;
                    }
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
                <button onClick={handleSubmit} className="submit-button">Submit</button>
            </div>
        </div>
    );
};

export default Page8;
