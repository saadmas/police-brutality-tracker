import React from 'react';
import TweetEmbed from 'react-tweet-embed';
import InstagramEmbed from 'react-instagram-embed';
import VisibilitySensor from 'react-visibility-sensor';

import './IncidentCard.scss';

const IncidentCard = ({ incident }) => {
  const [inViewPort, setInViewPort] = React.useState(true);

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
    const linksWithoutEmbed = links.filter(link => !link.includes('twitter')); /// add insta, yt

    const sources = linksWithoutEmbed.map((link, idx, arr) => getAnchorTag(link, idx, arr));
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
        maxWidth={500}
        hideCaption={false}
      />
    );
  };

  const getYouTubeEmbed = (youtubeLink) => {

  };

  const getEmbed = () => {
    if (!inViewPort) {
      return null;
    }

    const { links } = incident;

    // const tweetLink = links.find(link => link.includes('twitter'));
    // if (tweetLink) {
    //   return getTweet(tweetLink);
    // }

    // const instagramLink = links.find(link => link.includes('instagram'));
    // if (instagramLink) {
    //   return getInstaEmbed(instagramLink);
    // }

    const youtubeLink = links.find(link => link.includes('youtube'));
    if (youtubeLink) {
      return getYouTubeEmbed(youtubeLink);
    }

    return null;
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