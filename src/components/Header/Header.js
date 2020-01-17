import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import styles from "./Header.module.scss";

function Header() {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    );

    return (
        <header className={styles.header}>
            <div className={styles.brandWrapper}>
                <Link className={styles.brand} to="/">
                    {data.site.siteMetadata.title}
                </Link>
            </div>
            <ul className={styles.menu}>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;
