import React from 'react';
import TweetEmbed from 'react-tweet-embed';
import InstagramEmbed from 'react-instagram-embed';
import YouTube from 'react-youtube';
import VisibilitySensor from 'react-visibility-sensor';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';

import SharePopover from '../SharePopover/SharePopover';

import './IncidentCard.scss';

const IncidentCard = ({ incident }) => {
  const [inViewPort, setInViewPort] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const getLocation = () => {
    const { city, state } = incident;
    const location = `${city}, ${state}`;
    return location;
  };

  const getDomain = (url) => {
    const host = new URL(url).hostname;
    const hostParts = host.split('.');
    const domain = hostParts.length > 2 ? hostParts[1] : hostParts[0];
    return domain;
  };

  const getAnchorTag = (link, idx, arr) => {
    const isLastTag = idx + 1 === arr.length;
    const domain = getDomain(link);
    const linkName = isLastTag ? domain : `${domain}, `;
    return (
      <a href={link} className="SourceLink">
        {linkName}
      </a>
    );
  };

  const getSources = () => {
    const { links } = incident;
    const sources = links.map((link, idx, arr) => getAnchorTag(link, idx, arr));
    return sources;
  };

  const getClassNames = () => {
    const classNames = ['IncidentCard'];

    if (inViewPort) {
      classNames.push('InView');
    }

    return classNames.join(' ');
  };

  const getTweet = (tweetLink) => {
    const linkParts = tweetLink.split('/');
    let tweetId = linkParts[linkParts.length - 1];
    tweetId = tweetId.split('?')[0];
    return (
      <TweetEmbed
        id={tweetId}
      />
    );
  };

  const getInstaEmbed = (instaLink) => {
    return (
      <InstagramEmbed
        url={instaLink}
        maxWidth={520}
        hideCaption={false}
      />
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
          width: '510'
        }}
      />
    );
  };

  const getEmbed = () => {
    if (!inViewPort) {
      return null;
    }

    const { links } = incident;

    const tweetLink = links.find(link => link.includes('twitter'));
    if (tweetLink) {
      return getTweet(tweetLink);
    }

    const instagramLink = links.find(link => link.includes('instagram'));
    if (instagramLink) {
      return getInstaEmbed(instagramLink);
    }

    const youtubeLink = links.find(link => link.includes('youtube'));
    if (youtubeLink) {
      return getYouTubeEmbed(youtubeLink);
    }

    return null;
  };

  const onShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const getCard = () => {
    return (
      <li className={getClassNames()}>
        <section>
          <span className="Block IncidentInfo">{incident.name}</span>
          <span className="Block">
            <span className="FieldName">Date: </span>
            {incident.date_text}
          </span>
          <span className="Block">
            <span className="FieldName">Location: </span>
            {getLocation()}
          </span>
          <span className="Block">
            <span className="FieldName">Sources: </span>
            {getSources()}
          </span>
          <span className="Block ButtonBlock">
            <Button variant="contained" onClick={onShareClick}>
              Share
              <ShareIcon className="ShareIcon" />
            </Button>
            <SharePopover
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
            />
          </span>
          <span className="Block SourceBlock">
            {getEmbed()}
          </span>
        </section>
      </li>
    );
  };

  const onVisChange = (isVisible) => {
    setInViewPort(isVisible);
  }

  return (
    <VisibilitySensor onChange={onVisChange} partialVisibility={true}>
      {getCard()}
    </VisibilitySensor>
  );
};

export default IncidentCard;