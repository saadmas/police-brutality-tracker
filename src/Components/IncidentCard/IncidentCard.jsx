import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import InstagramEmbed from 'react-instagram-embed';
import YouTube from 'react-youtube';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import SharePopover from '../SharePopover/SharePopover';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { FacebookProvider, EmbeddedPost } from 'react-facebook';
import Divider from '@material-ui/core/Divider';

import useWindowDimensions from '../../Hooks/useWindowDimensions';

import './IncidentCard.scss';

const IncidentCard = ({ incident }) => {
  const [isPopoverVisible, setPopoverVisible] = React.useState(false);
  const { width } = useWindowDimensions();

  const getLocation = () => {
    const { city, state } = incident;
    const location = `${city}, ${state}`;
    return location;
  };

  const getDomain = (url) => {
    let host;

    try {
      host = new URL(url).hostname;
    }
    catch (e) {
      return null;
    }

    const isYoutuDOTbe = host.includes('youtu.be');
    if (isYoutuDOTbe) {
      return 'youtube';
    }

    const hostParts = host.split('.');
    const domain = hostParts.length > 2 ? hostParts[1] : hostParts[0];
    return domain;
  };

  const getAnchorTag = (link, idx, arr) => {
    const isLastTag = idx + 1 === arr.length;

    const domain = getDomain(link);
    if (!domain) {
      return null;
    }

    const trailingComma = !isLastTag && ', ';
    return (
      <span key={`source-${incident.date}-${link}-${idx}`}>
        <a href={link} className="SourceLink">
          {domain}
        </a>
        {trailingComma}
      </span>
    );
  };

  const getSources = () => {
    const { links } = incident;
    const sources = links.map((link, idx, arr) => getAnchorTag(link, idx, arr));
    return sources;
  };

  const getTweet = (tweetLink) => {
    const linkParts = tweetLink.split('/');
    let tweetId = linkParts[linkParts.length - 1];
    tweetId = tweetId.split('?')[0];
    return (
      <TwitterTweetEmbed
        tweetId={tweetId}
        placeholder="Loading Tweet ..."
        options={{
          width: getSocialEmbedWidth()
        }}
      />
    );
  };

  const getInstaEmbed = (instaLink) => {
    return (
      <InstagramEmbed
        url={instaLink}
        maxWidth={Number(getSocialEmbedWidth())}
        hideCaption={false}
      />
    );
  };

  const getSocialEmbedWidth = () => {
    switch (true) {
      case width <= 420:
        return '220';
      case width <= 1300:
        return '400';
      default:
        return '470';
    }
  }

  const getFacebookEmbed = (facebookLink) => {
    return (
      <FacebookProvider appId="306545370511738">
        <EmbeddedPost
          href={facebookLink}
          width={getSocialEmbedWidth()}
        />
      </FacebookProvider>
    );
  };

  const getYouTubeIdFromQueryString = (qs) => {
    const qsParts = qs.split('&');
    const idPart = qsParts.find(part => part[0] === 'v');
    const youtubeId = idPart.slice(2);
    return youtubeId;
  }

  const getYouTubeEmbed = (youtubeLink) => {
    const qs = youtubeLink.split('?')[1];
    const videoId = getYouTubeIdFromQueryString(qs);
    return (
      <YouTube
        videoId={videoId}
        opts={{
          width: getSocialEmbedWidth()
        }}
      />
    );
  };

  const getEmbed = () => {
    const { links } = incident;
    const isMobile = width <= 420;

    const tweetLink = links.find(link => link.includes('twitter'));
    if (tweetLink && !isMobile) {
      return getTweet(tweetLink);
    }

    const instagramLink = links.find(link => link.includes('instagram'));
    if (instagramLink && !isMobile) {
      return getInstaEmbed(instagramLink);
    }

    const youtubeLink = links.find(link => link.includes('youtube'));
    if (youtubeLink) {
      return getYouTubeEmbed(youtubeLink);
    }

    const facebookLink = links.find(link => link.includes('facebook'));
    if (facebookLink) {
      return getFacebookEmbed(facebookLink);
    }

    return null;
  };

  const onShareClick = (event) => {
    setPopoverVisible(prevVisibility => !prevVisibility);
  };

  const handleClickAwayFromShare = () => {
    setPopoverVisible(false);
  };

  const getCard = () => {
    return (
      <section className="IncidentCard">
        <span className="Block IncidentInfo">{incident.name}</span>
        <Divider className="NameDivider" />
        <span className="Block">
          <span className="FieldName">When: </span>
          {incident.date_text}
        </span>
        <span className="Block">
          <span className="FieldName">Where: </span>
          {getLocation()}
        </span>
        <span className="Block">
          <span className="FieldName">Sources: </span>
          {getSources()}
        </span>
        <span className="Block ButtonBlock">
          <ClickAwayListener onClickAway={handleClickAwayFromShare}>
            <div>
              <Button className="ShareButton" variant="outlined" onClick={onShareClick}>
                Share
            <ShareIcon className="ShareIcon" />
              </Button>
              <SharePopover isPopoverVisible={isPopoverVisible} incident={incident} />
            </div>
          </ClickAwayListener>
        </span>
        <span className="Block SourceBlock">
          {getEmbed()}
        </span>
      </section>
    );
  };

  return getCard();
};

export default IncidentCard;