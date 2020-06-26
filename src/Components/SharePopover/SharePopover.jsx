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
  const iconSize = 40;
  const borderRadius = 30;
  const appUrl = 'https://defund-the-police.today/';
  const shareTimelineText = 'Check out this timeline of all police brutality incidents since the death of George Floyd';

  const getShareIncidentProps = (incident, removeUrlFromText) => {
    const { name, date_text, id } = incident;
    const url = `${appUrl}#${id}`
    let shareText = `${name} on ${date_text}.\n\nLearn more about it and view all police brutality incidents since George Floyd's death\n\n`;

    if (!removeUrlFromText) {
      shareText += url;
      shareText += '\n\n';
    }

    return { shareText, url };
  };

  const getFacebookShareProps = () => {
    let quote;
    let url;
    const hashtag = '#DefundThePolice';

    if (incident) {
      const shareIncidentProps = getShareIncidentProps(incident);
      quote = shareIncidentProps.shareText;
      url = shareIncidentProps.url;
    } else {
      quote = shareTimelineText;
      url = appUrl;
    }

    return { quote, hashtag, url };
  }

  const getLinkedInShareProps = () => {
    let summary;
    let source;
    let url;
    const title = 'Defund The Police!';

    if (incident) {
      const shareIncidentProps = getShareIncidentProps(incident);
      summary = shareIncidentProps.shareText;
      url = shareIncidentProps.url;
      source = shareIncidentProps.url;
    } else {
      source = appUrl;
      url = appUrl;
      summary = shareTimelineText;
    }

    return { summary, title, url, source };
  };

  const getRedditShareProps = () => {
    let url;
    let title;

    if (incident) {
      const shareIncidentProps = getShareIncidentProps(incident);
      title = shareIncidentProps.shareText;
      url = shareIncidentProps.url;
    } else {
      title = shareTimelineText;
      url = appUrl;
    }

    return { title, url };
  };

  const getTwitterShareProps = () => {
    let url;
    let title;
    const hashtags = ['DefundThePolice', 'BlackLivesMatter'];

    if (incident) {
      const shareIncidentProps = getShareIncidentProps(incident, true);
      title = shareIncidentProps.shareText;
      url = shareIncidentProps.url;
    } else {
      title = shareTimelineText;
      url = appUrl;
    }

    return { title, url, hashtags };
  };

  const getWhatsappShareProps = () => {
    let url;
    let title;
    const separator = '\n\n';

    if (incident) {
      const shareIncidentProps = getShareIncidentProps(incident, true);
      title = shareIncidentProps.shareText;
      url = shareIncidentProps.url;
    } else {
      title = shareTimelineText;
      url = appUrl;
    }

    return { title, url, separator };
  };

  const getClassName = () => !!incident ? 'ShareIncidentContent' : 'ShareTimelineContent'

  const getShareContent = () => {
    return isPopoverVisible && (
      <div>
        <div className={getClassName()}>
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