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
      Upon George Floyd's tragic murder and the subsequent protests against systemic racism and police brutality in the U.S., like most folks,
      I knew I had to do my part for the movement.
      Beyond educating myself, making donations, and sharing pertinent information on social media,
      I wondered what I could do in my unique capacity to support the movement against police brutality.&nbsp;
      <a href="https://www.linkedin.com/in/saad-masood-shaikh/" target="_blank">
        I'm a software engineer
      </a>
      &nbsp;by profession.
      So when I stumbled upon a properly curated, consistently updated source of police brutality incidents,
      I knew I had to create a website to communicate this information in a lucid, visually impactful manner. <br /> <br />

      My hope is that with this website:

      <ul>
        <li>
          The injustices committed by the American police are documented in an easily accessible form. One that can be seamlessly shared with others,
          and serve as a bold reminder that police brutality is an on-going issue. Not to be forgetten when the media decides it isn't trending anymore,
          with much more work to be done before meaningful reform and change alleviates the suffering of the Black community and others
          who have been oppressed by the police.
        </li>
        <li>
          Visitors of the website leave with more awareness, information, and ways to help in eradicating police brutality.
        </li>
      </ul>

    </article>
  );

  const whyDefundPolice = () => (
    <article>
      TODO
    </article>
  );

  const dataSource = () => (
    <article>
      The police brutality incidents are sourced from <a href="https://github.com/2020PB/police-brutality" target="_blank">this GitHub repository</a>
      &nbsp; You can view the mission statement, frequently asked questions, code of conduct, and incident reporting guidelines for
      the data collection <a href="https://github.com/2020PB/police-brutality/blob/master/CONTRIBUTING.md" target="_blank">here</a>.
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
      {getExpansionPanel('Why should the police be defunded?', whyDefundPolice(), 'WhyDefundPolice')}
      {getExpansionPanel('Additional resources', getItems('AdditionalResources'), 'AdditionalResources')}
    </section>
  );
};

export default AboutPage;
