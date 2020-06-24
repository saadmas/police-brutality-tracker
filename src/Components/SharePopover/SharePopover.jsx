import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";

import './SharePopover.scss';

const SharePopover = ({ isPopoverVisible, incident }) => {
  const [iconSize, setIconSize] = React.useState(40);
  const [borderRadius, setBorderRadius] = React.useState(30);

  const getFacebookShareProps = () => {
    let quote;
    let url;
    const hashtag = '#DefundThePolice';

    if (incident) {
      const { name, date_text, links } = incident;
      const linksText = links.join('\n\n');
      url = links[0];
      quote = `${name} on ${date_text}. See it for yourself:\n\n ${linksText}`;
    } else {
      quote = 'Check out this timeline of all police brutality incidents since the death of George Floyd.'
      url = 'defund-the-police.today';
    }

    return { quote, hashtag, url };
  }

  const getLinkedInShareProps = () => {
    let summary;
    let url;
    const title = 'Defund The Police!';
    const source = 'defund-the-police.today';

    if (incident) {
      const { name, date_text, links } = incident;
      const linksText = links.join('\n\n');
      url = links[0];
      summary = `${name} on ${date_text}. See it for yourself:\n\n ${linksText}`;
    } else {
      url = 'defund-the-police.today';
      summary = 'Check out this timeline of all police brutality incidents since the death of George Floyd.'
    }

    return { summary, title, url, source };
  };

  const getRedditShareProps = () => {
    let url;
    const title = 'Defund The Police!';

    if (incident) {
      url = incident.links[0];
    } else {
      url = 'defund-the-police.today';
    }

    return { title, url };
  };

  const getTwitterShareProps = () => {
    let url;
    const title = 'Defund The Police!';
    const hashtags = ['DefundThePolice', 'BlackLivesMatter'];

    if (incident) {
      url = incident.links[0];
    } else {
      url = 'defund-the-police.today';
    }

    return { title, url, hashtags };
  };

  const getWhatsappShareProps = () => {
    let url;
    const title = 'Defund The Police!';
    const separator = '\n\n';

    if (incident) {
      url = incident.links[0];
    } else {
      url = 'defund-the-police.today';
    }

    return { title, url, separator };
  };

  const getShareContent = () => {
    return isPopoverVisible && (
      <div>
        <div className="ShareContent">
          <div className="Arrow" />
          <FacebookShareButton {...getFacebookShareProps()}>
            <FacebookIcon size={iconSize} borderRadius={borderRadius} />
          </FacebookShareButton>
          <LinkedinShareButton {...getLinkedInShareProps()}>
            <LinkedinIcon size={iconSize} borderRadius={borderRadius} />
          </LinkedinShareButton>
          <RedditShareButton {...getRedditShareProps()}>
            <RedditIcon size={iconSize} borderRadius={borderRadius} />
          </RedditShareButton>
          <TwitterShareButton {...getTwitterShareProps()}>
            <TwitterIcon size={iconSize} borderRadius={borderRadius} />
          </TwitterShareButton>
          <WhatsappShareButton {...getWhatsappShareProps()}>
            <WhatsappIcon size={iconSize} borderRadius={borderRadius} />
          </WhatsappShareButton>
          <WorkplaceShareButton {...getFacebookShareProps()}>
            <WorkplaceIcon size={iconSize} borderRadius={borderRadius} />
          </WorkplaceShareButton>
        </div>
      </div>
    );
  };

  return getShareContent();
};

export default SharePopover;