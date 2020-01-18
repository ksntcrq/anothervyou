import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.copyright}>© Killian Saint cricq, 2018-2020</div>
        </footer>
    );
}

export default Footer;
