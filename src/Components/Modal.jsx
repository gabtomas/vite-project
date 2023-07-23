import "./Modal.css";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Modal({ close, onSubmit, defaultValue }) {
    const [formState, setFormState] = useState(
        //try to get the default value from the props OR set it to an empty object
        defaultValue || {
            page: "",
            description: "",
            status: "live",
        }
    );

    const [errors, setErrors] = useState("");

    const handleChange = (e) => {
        setFormState({
            ...formState, //taking the previous state and updating it with the new state
            [e.target.name]: e.target.value, //napr page: "1" nebo description: "this is page 1" nebo status: "live"
        });
    };

    //prevent empty form submission
    const validateForm = () => {
        if (formState.page && formState.description && formState.status) {
            setErrors("");
            return true;
        } else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState)) {
                if (!value) {
                    errorFields.push(key);
                }
            }
            setErrors(
                `Please fill in the following fields: ${errorFields.join(", ")}`
            );
            return false;
        }
    };

    //submitting the form
    const handleSubmit = (e) => {
        e.preventDefault(); //preventing the default behavior of the form
        //the default behavior of the form is to refresh the page
        //we don't want that
        //we want to stay on the same page

        //if the form is not valid, don't submit it
        if (!validateForm()) return;

        onSubmit(formState);

        // console.log(formState);
        close();
    };

    return (
        <div
            className="modal-container"
            onClick={
                //event handler for the modal container
                (e) => {
                    //if the user clicks on the modal container, close the modal
                    if (e.target.className === "modal-container") {
                        close();
                    }
                }
            }
        >
            <div className="modal">
                <form>
                    <div className="form-group">
                        <label htmlFor="page">Page</label>
                        <input
                            name="page"
                            value={formState.page}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            value={formState.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            name="status"
                            value={formState.status}
                            onChange={handleChange}
                        >
                            <option value="live">Live</option>
                            <option value="draft">Draft</option>
                            <option value="error">Error</option>
                        </select>
                    </div>
                    {errors && <div className="error">{errors}</div>}
                    <button
                        type="submit"
                        className="btn"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

Modal.propTypes = {
    close: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    defaultValue: PropTypes.object,
};
