import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { waysToHelp, additionalResources } from './aboutLinks';

import './AboutPage.scss';

const AboutPage = () => {

  const getExpansionPanel = (headingText, children, panelClassName) => (
    <ExpansionPanel className={panelClassName}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className="PanelSummary"
      >
        {headingText}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="PanelDetails">
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

  const dataSource = () => (
    <article>
      The data is sourced from <a href="https://github.com/2020PB/police-brutality" target="_blank">this GitHub Repo</a>
    </article>
  );

  const getItems = (itemType) => {
    let items;

    switch (itemType) {
      case 'HowCanIHelp':
        items = waysToHelp;
        break;
      case 'AdditionalResources':
        items = additionalResources;
        break;
    }

    items.sort((a, b) => a.description.localeCompare(b.description));

    const itemsList = items.map(way => (
      <li>
        <a href={way.url} target="_blank">
          {way.description}
        </a>
      </li>
    ));

    return (
      <article>
        <ul>
          {itemsList}
        </ul>
      </article>
    );
  };

  return (
    <section className="AboutPage">
      {getExpansionPanel('Why build this website?', whyBuildThisWebsite(), 'WhyBuildThisWebsite')}
      {getExpansionPanel('Where is the data sourced from?', dataSource(), 'DataSource')}
      {getExpansionPanel('How can I help outside of donations?', getItems('HowCanIHelp'), 'HowCanIHelp')}
      {getExpansionPanel('Additional resources', getItems('AdditionalResources'), 'AdditionalResources')}
    </section>
  );
};

export default AboutPage;
