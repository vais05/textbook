import React, { useState } from 'react';
import './assets/css/style.css'; // Importing CSS directly
import './assets/js/script.js'; // Importing JavaScript directly is not recommended in React

const Page1 = () => {
    const [cellValues, setCellValues] = useState({
        table1: Array(5).fill(Array(11).fill("")),
        table2: Array(5).fill(Array(11).fill("")),
        table3: Array(7).fill(Array(11).fill("")),
    });

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

    const handleCellValueChange = (tableIndex, rowIndex, colIndex, value) => {
        const updatedCellValues = [...cellValues[tableIndex]];
        updatedCellValues[rowIndex][colIndex] = value;
        setCellValues({
            ...cellValues,
            [tableIndex]: updatedCellValues
        });
    };

    const renderTableRows = (tableIndex) => {
        return cellValues[tableIndex].map((row, rowIndex) => (
            <tr key={`${tableIndex}-${rowIndex}`}>
                {row.map((cell, colIndex) => (
                    <td key={`${tableIndex}-${rowIndex}-${colIndex}`}>
                        <input
                            type="text"
                            value={cell}
                            onChange={(e) => handleCellValueChange(tableIndex, rowIndex, colIndex, e.target.value)}
                            id={`cell-${tableIndex}-${rowIndex}-${colIndex}`}
                        />
                    </td>
                ))}
            </tr>
        ));
    };

    return (
        <div>
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

export default Page1;
