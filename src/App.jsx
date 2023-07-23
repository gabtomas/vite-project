import "./App.css";
import Table from "./Components/Table";
import Modal from "./Components/Modal";
import { useState } from "react";

export default function App() {
    const [modalOpen, setModalOpen] = useState(false);

    const [rows, setRows] = useState([
        {
            page: "1",
            description: "this is page 1",
            status: "live",
        },
        {
            page: "2",
            description: "this is draft page ",
            status: "draft",
        },
        {
            page: "3",
            description: "this is error page ",
            status: "error",
        },
    ]);

    const [rowToEdit, setRowToEdit] = useState(null);

    const handleEditRow = (index) => {
        setRowToEdit(index);
        setModalOpen(true);
    };

    const handleDeleteRow = (index) => {
        setRows(rows.filter((row, i) => i !== index));
    };

    const handleSubmit = (newRow) => {
        rowToEdit === null
            ? setRows([...rows, newRow])
            : setRows(
                  rows.map((currRow, idx) => {
                      if (idx !== rowToEdit) return currRow;

                      return newRow;
                  })
              );
    };

    return (
        <div className="App">
            <Table
                rows={rows}
                deleteRow={handleDeleteRow}
                editRow={handleEditRow}
            />
            <button className="btn" onClick={() => setModalOpen(true)}>
                {" "}
                Add{" "}
            </button>
            {modalOpen && (
                <Modal
                    close={() => {
                        setModalOpen(false);
                        setRowToEdit(null);
                    }}
                    onSubmit={handleSubmit}
                    defaultValue={rowToEdit !== null && rows[rowToEdit]} //passing curent row to the modal
                />
            )}
        </div>
    );
}
