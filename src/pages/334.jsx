import React, { useState } from 'react';
import './assets/css/style.css'; // Importing CSS directly
import './assets/js/script.js'; // Importing JavaScript directly is not recommended in React

const Page2 = () => {
    const [cellValues, setCellValues] = useState({
        table1: Array(4).fill(Array(10).fill("")),
        table2: Array(4).fill(Array(10).fill("")),
        table3: Array(5).fill(Array(10).fill("")),
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
                <td>{rowIndex === 0 ? specialValue : rowIndex === cellValues[tableIndex].length - 1 ? 'ANS' : '#'}</td>
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
                <button className="submit-button">Submit</button>
            </div>
        </div>
    );
};

export default Page2;
