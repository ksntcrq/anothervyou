import React from "react";
import PropTypes from "prop-types";
import styles from "./Footer.module.scss";
import classNames from "classnames";

function Footer({ className }) {
    return (
        <footer className={classNames(className, styles.footer)}>
            <div className={styles.bmcButtonWrapper}>
                <a
                    className={styles.bmcButton}
                    target="_blank"
                    href="https://www.buymeacoffee.com/ksntcrq"
                >
                    <img
                        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                        alt="Buy me a coffee"
                    />
                    <span className={styles.text}>Buy me a coffee</span>
                </a>
            </div>
            <div>
                © Killian Saint cricq, 2018-2020
            </div>
        </footer>
    );
}

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;
