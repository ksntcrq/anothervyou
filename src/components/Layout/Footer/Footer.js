import React from "react";
import PropTypes from "prop-types";
import styles from "./Footer.module.scss";
import classNames from "classnames";
import BuyMeCoffeeButton from "../../Buttons/BuyMeCoffeeButton/BuyMeCoffeeButton";

function Footer({ className }) {
    return (
        <footer className={classNames(className, styles.footer)}>
            <div className={styles.bmcButtonWrapper}>
                <BuyMeCoffeeButton />
            </div>
            <div>© Killian Saint cricq, 2018-2020</div>
        </footer>
    );
}

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;
