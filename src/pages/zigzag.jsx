import React, { useState } from 'react';
import './assets/css/style.css'; // Importing CSS directly

const Page5 = () => {
    const [cellValues, setCellValues] = useState(Array(3).fill(Array(20).fill(""))); // Initialize cell values with empty strings

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
        updatedCellValues[rowIndex][colIndex] = value;
        setCellValues(updatedCellValues);
    };

    const renderInputFields = () => {
        return cellValues.map((row, rowIndex) => (
            <div className="division" key={rowIndex}>
                <table>
                    {row.map((_, colIndex) => (
                        <tr key={`${rowIndex}-${colIndex}`}>
                            <td>
                                <input
                                    type="text"
                                    size="5"
                                    value={cellValues[rowIndex][colIndex]}
                                    onChange={(e) => handleCellValueChange(rowIndex, colIndex, e.target.value)}
                                    id={`cell-${rowIndex}-${colIndex}`}
                                />
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        ));
    };

    return (
        <div>
            <div className="main-container">
                {renderInputFields()}
            </div>
            <div className="submit-container">
                <button className="submit-button" onClick={confirmSubmission}>Submit</button>
            </div>
        </div>
    );
};

export default Page5;
