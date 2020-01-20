import React from "react";
import PropTypes from "prop-types";
import styles from "./Tags.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "gatsby";
import dashify from "dashify";

function Tags({ locale, tags = [] }) {
    const intl = useIntl();

    return (
        <div className={styles.tags}>
            <span className={styles.title}>
                <FormattedMessage id="tags" /> -
            </span>
            <ul className={styles.list}>
                {tags.map(tag => {
                    const translatedTag = intl.formatMessage({
                        id: `post_tag_${tag}`,
                    });
                    return (
                        <li key={tag} className={styles.item}>
                            <Link to={`/${locale}/tags/${dashify(translatedTag)}`}>
                                {translatedTag}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
