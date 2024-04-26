import React, { useState } from 'react';
import './assets/css/style.css'; // Importing CSS directly
import './assets/js/script.js'; // Importing JavaScript directly is not recommended in React

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
                    // Exclude the last column
                    colIndex !== 10 &&
                    <td key={colIndex}>
                        <input
                            type="text"
                            value={cell}
                            onChange={(e) => handleCellValueChange(tableIndex, rowIndex, colIndex, e.target.value)}
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
