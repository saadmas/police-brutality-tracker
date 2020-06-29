import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './AboutPage.scss';

const AboutPage = () => {

  const getExpansionPanel = (headingText, children) => (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className="PanelSummary"
      >
        {headingText}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );

  const whyBuildThisWebsite = () => (
    <article>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
      sit amet blandit leo lobortis eget.
    </article>
  );

  const howCanIHelp = () => {
    const waysToHelp = [
      {
        description: 'Sign petitions',
        url: 'https://blacklivesmatters.carrd.co/#petitions'
      },
      {
        description: 'Text or call',
        url: 'https://blacklivesmatters.carrd.co/#text'
      },
      {
        description: 'Vote!',
        url: 'https://blacklivesmatters.carrd.co/#vote'
      },
      {
        description: 'Educate Yourself',
        url: 'https://blacklivesmatters.carrd.co/#educate'
      },
      {
        description: 'File a police report',
        url: 'https://filepolicereport.com/'
      },
    ];

    waysToHelp.sort((a, b) => a.description.localeCompare(b.description));

    const waysToHelpItems = waysToHelp.map(way => (
      <li>
        <a href={way.url} target="_blank">
          {way.description}
        </a>
      </li>
    ));

    return (
      <article>
        <ul>
          {waysToHelpItems}
        </ul>
      </article>
    );
  };

  return (
    <section className="AboutPage">
      {getExpansionPanel('Why build this website?', whyBuildThisWebsite())}
      {getExpansionPanel('Where is the data sourced from?', whyBuildThisWebsite)}
      {getExpansionPanel('How can I help outside of donations?', howCanIHelp())}
      {getExpansionPanel('Additional resources', whyBuildThisWebsite)}
    </section>
  );
};

export default AboutPage;
