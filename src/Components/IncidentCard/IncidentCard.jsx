import React from 'react';
import Iframe from 'react-iframe'; ///
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
    const linksWithoutTweets = links.filter(link => !link.includes('twitter'));
    const sources = linksWithoutTweets.map((link, idx, arr) => getAnchorTag(link, idx, arr));
    return sources; ///
  };

  const getClassNames = () => {
    const classNames = ['IncidentCard'];

    if (inViewPort) {
      classNames.push('InView');
    }

    return classNames.join(' ');
  };

  const getTweet = () => {
    const { links } = incident;
    const tweetLink = links.find(link => link.includes('twitter'));

    if (!tweetLink) {
      return null;
    }

    const linkParts = tweetLink.split('/');
    let tweetId = linkParts[linkParts.length - 1];
    tweetId = tweetId.split('?')[0];
    console.log(tweetId);
    return null;
  };

  const getCard = () => {
    return (
      <li className={getClassNames()}>
        <div>
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
          {getTweet()}
        </div>
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