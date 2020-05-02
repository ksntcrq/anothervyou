import React from "react";
import PropTypes from "prop-types";
import styles from "./Footer.module.scss";
import classNames from "classnames";
import BuyMeCoffeeButton from "../../Buttons/BuyMeCoffeeButton/BuyMeCoffeeButton";
import { Link } from "gatsby"
import { FormattedMessage } from "react-intl"

function Footer({ locale, className }) {
    return (
        <footer className={classNames(className, styles.footer)}>
            <div className={styles.bmcButtonWrapper}>
                <BuyMeCoffeeButton />
            </div>
            <div>
                <Link to={`/${locale}/rss.xml`} className={styles.rss}>
                    <FormattedMessage id="rss_feed" />
                </Link>
                <span> - </span>
                <span>© Killian Saint cricq, 2018-2020</span>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;
