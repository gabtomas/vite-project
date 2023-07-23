import "./Table.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import PropTypes from "prop-types";

export default function Table({ rows, deleteRow, editRow }) {
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>Page</th>
                        <th className="expand">Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>{row.page}</td>
                            <td>{row.description}</td>
                            <td>
                                <span className={`label label-${row.status}`}>
                                    {row.status}
                                </span>
                            </td>
                            <td>
                                <span className="actions">
                                    <BsFillTrashFill
                                        className="delete-btn"
                                        onClick={() => deleteRow(index)}
                                    />
                                    <BsFillPencilFill
                                        className="edit-btn"
                                        onClick={() => editRow(index)}
                                    />
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    deleteRow: PropTypes.func.isRequired,
    editRow: PropTypes.func.isRequired,
};
