// eslint-disable-next-line no-unused-vars
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const iconButton = ({ handleClick }) => {
    return (
        <button onClick={(e) => {
            e.stopPropagation();
            handleClick();
        }}
        >
            <FaTrashAlt />
        </button>
    )
}

export default iconButton
