import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import classNames from "classnames";
import styles from "./Dropdown.module.scss";

function Dropdown({ title, items, className }) {
    const [showItems, setShowItems] = useState(false);

    const handleShowItems = useCallback(() => setShowItems(true), [
        setShowItems,
    ]);
    const handleHideItems = useCallback(() => setShowItems(false), [
        setShowItems,
    ]);

    return (
        <div
            onMouseEnter={handleShowItems}
            onMouseLeave={handleHideItems}
            className={classNames(styles.dropdown, className)}
        >
            <button className={styles.toggle}>{title}</button>
            <ul
                className={classNames(styles.items, {
                    [styles.hidden]: !showItems,
                })}
            >
                {items.map(item => (
                    <li key={item.title}>
                        <Link to={item.slug}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

Dropdown.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
};

export default Dropdown;
