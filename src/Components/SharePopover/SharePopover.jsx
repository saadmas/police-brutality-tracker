import React from 'react';
import Popover from '@material-ui/core/Popover';
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

const SharePopover = ({ setAnchorEl, anchorEl, incident }) => {
  const [iconSize, setIconSize] = React.useState(40);
  const [borderRadius, setBorderRadius] = React.useState(30);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFacebookShareProps = () => {
    let quote;
    let url;
    const hashtag = 'DefundThePolice';

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
    const title = 'Defund The Police';
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

  const getShareContent = () => {
    return (
      <div className="ShareContent">
        <FacebookShareButton {...getFacebookShareProps()}>
          <FacebookIcon size={iconSize} borderRadius={borderRadius} />
        </FacebookShareButton>
        <LinkedinShareButton {...getLinkedInShareProps()}>
          <LinkedinIcon size={iconSize} borderRadius={borderRadius} />
        </LinkedinShareButton>
        <RedditShareButton>
          <RedditIcon size={iconSize} borderRadius={borderRadius} />
        </RedditShareButton>
        <TwitterShareButton>
          <TwitterIcon size={iconSize} borderRadius={borderRadius} />
        </TwitterShareButton>
        <WhatsappShareButton>
          <WhatsappIcon size={iconSize} borderRadius={borderRadius} />
        </WhatsappShareButton>
        <WorkplaceShareButton>
          <WorkplaceIcon size={iconSize} borderRadius={borderRadius} />
        </WorkplaceShareButton>
      </div>
    );
  };

  return (
    <Popover
      open={!!anchorEl}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      className="SharePopover"
    >
      {getShareContent()}
    </Popover>
  );
};

export default SharePopover;