import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    RedditShareButton,
    RedditIcon,
} from "react-share";
import styles from './Share.module.scss';
import { FormattedMessage } from "react-intl"

function Share({ title, url }) {
    return (
        <div className={styles.wrapper}>
            <div><FormattedMessage id="share" /></div>
            <FacebookShareButton
                url={url}
                className={classNames(styles.button, styles.facebook)}
            >
                <FacebookIcon size={38} />
            </FacebookShareButton>
            <TwitterShareButton
                url={url}
                title={title}
                className={classNames(styles.button, styles.twitter)}
            >
                <TwitterIcon size={38} />
            </TwitterShareButton>
            <LinkedinShareButton
                url={url}
                title={title}
                className={classNames(styles.button, styles.linkedin)}
            >
                <LinkedinIcon size={38} />
            </LinkedinShareButton>
            <RedditShareButton
                url={url}
                title={title}
                className={classNames(styles.button, styles.reddit)}
            >
                <RedditIcon size={38} />
            </RedditShareButton>
            <WhatsappShareButton
                url={url}
                title={title}
                className={classNames(styles.button, styles.whatsapp)}
            >
                <WhatsappIcon size={38} />
            </WhatsappShareButton>
        </div>
    );
}

Share.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Share;
