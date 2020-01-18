import React from "react";
import styles from "./Footer.module.scss";
import classNames from 'classnames';

function Footer({ className }) {
    return (
        <footer className={classNames(className, styles.footer)}>
            <div className={styles.copyright}>© Killian Saint cricq, 2018-2020</div>
        </footer>
    );
}

export default Footer;
