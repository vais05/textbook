import React, { useState } from 'react';
import './assets/css/style.css'; // Importing CSS directly
import './assets/js/script.js'; // Importing JavaScript directly is not recommended in React

const Page2 = () => {
    const [cellValues, setCellValues] = useState({
        table1: Array(5).fill(Array(11).fill("")),
        table2: Array(5).fill(Array(11).fill("")),
        table3: Array(7).fill(Array(11).fill("")),
    });

    const confirmSubmission = () => {
        const confirmed = window.confirm("Are you sure you want to submit?");
        if (confirmed) {
            window.alert("Form submitted.");
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
            <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        {[...Array(10)].map((_, i) => <th key={i}>{i + 1}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows('table1')}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        {[...Array(10)].map((_, i) => <th key={i}>{i + 1}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows('table2')}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        {[...Array(10)].map((_, i) => <th key={i}>{i + 1}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows('table3')}
                </tbody>
            </table>

            <div className="submit-container">
                <button className="submit-button" onClick={confirmSubmission}>Submit</button>
            </div>
        </div>
    );
};

export default Page2;
