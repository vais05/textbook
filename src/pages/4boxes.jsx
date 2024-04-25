import React, { useState } from 'react';
import './assets/css/style.css'; // Importing CSS directly
import './assets/js/script.js'; // Importing JavaScript directly is not recommended in React

const Page4 = () => {
    // Define a state to hold the values of cells
    const [cellValues, setCellValues] = useState({
        // Initialize with empty values for each cell
        table1: Array(10).fill(Array(3).fill("")),
        table2: Array(10).fill(Array(3).fill("")),
        table3: Array(9).fill(Array(3).fill("")),
        table4: Array(9).fill(Array(3).fill(""))
    });

    // Function to handle change in cell value
    const handleCellValueChange = (tableIndex, rowIndex, colIndex, value) => {
        // Update the cell value in the state
        const updatedCellValues = [...cellValues[tableIndex]];
        updatedCellValues[rowIndex][colIndex] = value;
        setCellValues({
            ...cellValues,
            [tableIndex]: updatedCellValues
        });
    };

    // Function to confirm submission
    const confirmSubmission = () => {
        // Ensure all values are obtained before submitting
        const allValues = Object.values(cellValues).flat();
        const allValuesFilled = allValues.every(value => value !== "");
        if (allValuesFilled) {
            const confirmed = window.confirm("Are you sure you want to submit?");
            if (confirmed) {
                // Perform submission to backend
                window.alert("Form submitted.");
            }
        } else {
            window.alert("Please fill in all values before submitting.");
        }
    };

    // Render table rows and cells based on cellValues state
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
            <div className="table-container gap">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows('table1')}
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableRows('table2')}
                    </tbody>
                </table>
            </div>

            <div className="table-container">
                <table>
                    <tbody>
                        {renderTableRows('table3')}
                    </tbody>
                </table>

                <table>
                    <tbody>
                        {renderTableRows('table4')}
                    </tbody>
                </table>
            </div>

            <div className="submit-container">
                <button className="submit-button" onClick={confirmSubmission}>Submit</button>
            </div>
        </div>
    );
};

export default Page4;
