import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import styles from "./MobileMenu.module.scss";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import classNames from "classnames";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import BuyMeCoffeeButton from "../../../Buttons/BuyMeCoffeeButton/BuyMeCoffeeButton";

function MobileMenu({ className, formattedDestinations, formattedTypes }) {
    const [showMenu, setShowMenu] = useState(false);

    const handleToggleMenu = useCallback(() => setShowMenu(!showMenu), [
        showMenu,
    ]);

    const handleHideMenu = useCallback(() => setShowMenu(false), []);

    const menuRef = useOnClickOutside(handleHideMenu);

    return (
        <div ref={menuRef} className={classNames(className, styles.mobileMenu)}>
            <button className={styles.button} onClick={handleToggleMenu}>
                ☰
            </button>
            <ul
                className={classNames(styles.menuItems, {
                    [styles.hidden]: !showMenu,
                })}
            >
                <li>
                    <div className={styles.title}>
                        <FormattedMessage id="destinations" />
                    </div>
                    <ul className={styles.subMenuItems}>
                        {formattedDestinations.map(destination => (
                            <li key={destination.title}>
                                <Link to={destination.slug}>
                                    {destination.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <div className={styles.title}>
                        <FormattedMessage id="categories" />
                    </div>
                    <ul className={styles.subMenuItems}>
                        {formattedTypes.map(type => (
                            <li key={type.title}>
                                <Link to={type.slug}>{type.title}</Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className={styles.bmcWrapper}>
                    <BuyMeCoffeeButton />
                </li>
            </ul>
        </div>
    );
}

MobileMenu.propTypes = {
    className: PropTypes.string,
    formattedDestinations: PropTypes.array.isRequired,
    formattedTypes: PropTypes.array.isRequired,
};

export default MobileMenu;
