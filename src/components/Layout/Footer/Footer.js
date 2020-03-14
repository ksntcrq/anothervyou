import React from "react";
import PropTypes from "prop-types";
import styles from "./Footer.module.scss";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

function Footer({ className }) {
    return (
        <footer className={classNames(className, styles.footer)}>
            <div className={styles.bmcButtonWrapper}>
                <a
                    className={styles.bmcButton}
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://www.buymeacoffee.com/ksntcrq"
                >
                    <img
                        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                        alt="Buy me a coffee"
                    />
                    <span className={styles.text}>
                        <FormattedMessage id="buy_me_a_coffee" />
                    </span>
                </a>
            </div>
            <div>© Killian Saint cricq, 2018-2020</div>
        </footer>
    );
}

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;
