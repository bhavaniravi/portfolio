import React from 'react';
import PropTypes from 'prop-types';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	RedditShareButton,
} from 'react-share';
import './share.css';

const Share = ({ socialConfig, tags }) => (
	<div className="post-social">
		<div className="button is-outlined is-rounded">
			Share blog on
		</div>
		<TwitterShareButton 
			aria-label="Share on Twitter" 
			url={socialConfig.config.url} 
			className="button is-outlined is-rounded twitter" 
			title={socialConfig.config.title} 
			via={socialConfig.twitterHandle.split('@').join('')} hashtags={tags}
		>
			<i className="icon fa fa-twitter-square">
			</i>
		</TwitterShareButton>
		<FacebookShareButton 
			aria-label="Share on Facebook" 
			url={socialConfig.config.url} 
			className="button is-outlined is-rounded facebook"
			quote={socialConfig.config.title}>
			<i className="icon fa fa-facebook-square">
			</i>
		</FacebookShareButton>
		<LinkedinShareButton 
		aria-label="Share on LinkedIn" 
		url={socialConfig.config.url} 
		className="button is-outlined is-rounded linkedin" 
		title={socialConfig.config.title} >
			<i className="icon fa fa-linkedin-square">
			</i>
		</LinkedinShareButton>
		<RedditShareButton aria-label="Share on Reddit" url={socialConfig.config.url} className="button is-outlined is-rounded reddit" title={socialConfig.config.title} >
			<i className="icon fa fa-reddit-square"/>
		</RedditShareButton>
	</div>
);

Share.propTypes = {
	socialConfig: PropTypes.shape({
		twitterHandle: PropTypes.string.isRequired,
		config: PropTypes.shape({
			url: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
		}),
	}).isRequired,
	tags: PropTypes.arrayOf(PropTypes.string),
};
Share.defaultProps = {
	tags: [],
};

export default Share;