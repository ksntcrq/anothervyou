import React from "react";
import PropTypes from "prop-types";
import styles from "./Tags.module.scss";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby-plugin-intl";
import kebabCase from "kebab-case";

function Tags({ tags = [] }) {
    return tags.length > 0 && (
        <div className={styles.tags}>
            <span className={styles.title}>
                <FormattedMessage id="tags" /> -
            </span>
            <ul className={styles.list}>
                {tags.map(tag => (
                    <li key={tag} className={styles.item}>
                        <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
