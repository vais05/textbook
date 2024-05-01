import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
const Page7 = () => {
    const [cellValues, setCellValues] = useState({
        table1: Array(5).fill(Array(10).fill("")),
        table2: Array(5).fill(Array(10).fill("")),
        table3: Array(6).fill(Array(10).fill("")),
        table4: Array(6).fill(Array(10).fill("")),
        table5: Array(5).fill(Array(10).fill("")),
        table6: Array(5).fill(Array(10).fill("")),
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
            case 'table4':
                specialValue = 'D';
                break;
            case 'table5':
                specialValue = 'E';
                break;
            case 'table6':
                specialValue = 'F';
                break;
            default:
                specialValue = '';
                break;
        }

        return cellValues[tableIndex].map((row, rowIndex) => (
            <tr key={rowIndex}>
                <td style={{ color: rowIndex === 0 ? 'black' : 'inherit' }}>{<span style={{ color: 'black' }}>#</span>}</td>
                {row.map((cell, colIndex) => (
                    // Exclude the last column
                    colIndex !== 10 &&
                    <td key={colIndex} style={{ backgroundColor: "white" }}>
                        <input
                        onKeyDown={(evt) => ["e", "E"].includes(evt.key) && evt.preventDefault()}
                            type="number"
                            value={cell}
                            onChange={(e) => handleCellValueChange(tableIndex, rowIndex, colIndex, e.target.value)}
                            style={{ width: '100%', boxSizing: 'border-box', margin: "0px" }}
                        />
                    </td>
                ))}
            </tr>
        ));
    };


    const handleSubmit = async () => {
        // Check if any cell is empty
        const isEmptyCell = Object.values(cellValues).some(table =>
            table.some(row => row.some(cell => cell === ""))
        );
    
        if (isEmptyCell) {
            alert("Please fill in all the cells before submitting.");
            return; // Exit early if any cell is empty
        }
    
        console.log(cellValues);
        try {
            let res = await axios.post("http://localhost:5000/newQuestion", {
                table1 : cellValues.table1,
                table2 : cellValues.table2,
                table3 : cellValues.table3,
                table4 : cellValues.table4,
                table5 : cellValues.table5,
                table6 : cellValues.table6,
            });
            // Handle response if needed
        } catch (error) {
            console.error("Error:", error);
            // Handle error
        }
    };
    
    return (

<div style={{marginLeft: '300px', marginRight: '0px' }}>
            <Header />
                        <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>REA</div>
                <div style={{ fontSize: '18px' }}>LEVEL - I MODEL EXAMINATION</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px auto', maxWidth: '1000px' }}>
                {[1, 2, 3].map(column => (
                    <div key={column} style={{ border: '1px solid #ccc', padding: '20px', width: '30%' }}>
                        {[...Array(10)].map((_, i) => (
                            <input key={i} type="text" style={{ width: '100%', boxSizing: 'border-box', marginBottom: '10px' }} />
                        ))}
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Submit</button>
            </div>
        </div>
    );
};

export default Page7;
