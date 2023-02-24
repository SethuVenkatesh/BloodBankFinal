import React from 'react'
import styled from 'styled-components'
export const Table = () => {
  return (
    <TableContainer>
        <TableHeader>
            <h3>Blood Type</h3>
            <h3>Donate Blood To</h3>
            <h3>Receive Blood From</h3>
        </TableHeader>
        <TableRow>
            <p>A+</p>
            <p>A+ AB+</p>
            <p>A+ A- O+ O-</p>
        </TableRow>
        <TableRow>
            <p>O+</p>
            <p>O+ A+ B+ AB+	</p>
            <p>	O+ O-</p>
        </TableRow>
        <TableRow>
            <p>B+</p>
            <p>B+ AB+</p>
            <p>B+ B- O+ O-</p>
        </TableRow>
        <TableRow>
            <p>AB+</p>
            <p>AB+</p>
            <p>Everyone</p>
        </TableRow>
        <TableRow>
            <p>A-</p>
            <p>A+ A- AB+ AB-</p>
            <p>A- O-</p>
        </TableRow>
        <TableRow>
            <p>O-</p>
            <p>Everyone</p>
            <p>O-</p>
        </TableRow>
        <TableRow>
            <p>B-</p>
            <p>B+ B- AB+ AB-</p>
            <p>B- O-</p>
        </TableRow>
        <TableRow>
            <p>AB-</p>
            <p>AB+ AB-</p>
            <p>AB- A- B- O-</p>
        </TableRow>
    </TableContainer>
  )
}

const TableContainer=styled.div`
    padding: 20px;
    margin-bottom: 20px;
`;
const TableHeader=styled.div`
    background-color: red;
    padding: 10px;
    display: flex;
    gap:15px;
    justify-content: space-around;
    h3{
        color: white;
        font-size: 16px;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
    }
`
const TableRow=styled.div`
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid lightgray;
    p{
        font-weight: 600;
        font-size: 16px;
    }
    p:nth-child(1){
        color: red;
        font-weight: bold;
    }
`