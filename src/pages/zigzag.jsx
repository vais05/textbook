import React, { useState } from 'react';
import './assets/css/style.css'; // Importing CSS directly

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
