import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { waysToHelp, additionalResources } from './aboutLinks';
import { whyDefundPolice } from './whyDefundPolice';

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
      Upon George Floyd's tragic murder and the subsequent protests against systemic racism and police brutality across the globe., like most folks,
      I knew I had to do my part for the movement.
      Beyond educating myself, making donations, and sharing pertinent information on social media,
      I wondered what I could do in my unique capacity to support the movement against police brutality.&nbsp;
      <a href="https://www.linkedin.com/in/saad-masood-shaikh/" rel="noopener noreferrer" target="_blank">
        I'm a software engineer
      </a>
      &nbsp;by profession.
      So when I stumbled upon a well organized data source of police brutality incidents,
      I knew I had to create a website to communicate this information in a lucid, visually impactful manner. <br /> <br />

      My hope is that with this website:

      <ul>
        <li>
          The injustices committed by the American police are documented in an easily accessible form. One that can be seamlessly shared with others,
          and serve as a stark reminder that police brutality is an on-going issue. Not to be forgotten when the media decides it isn't trending anymore,
          with much more work to be done before meaningful reform and change alleviates the suffering of the Black community and others
          who have been oppressed by the police.
        </li>
        <li>
          Visitors of the website leave with more awareness, information, and ways to help in eradicating police brutality.
          And if you're reading this, maybe you ponder on what you—
          <em>in your unique position with your unique skills</em>
          —can do to support the movement.
        </li>
        <li>
          The videos and sources supporting the police brutality incidents highlight that police brutality isn't
          a fringe problem with a few officers. It's a structural problem that can no longer be tolerated.
          It's been happening for far too long. Far from over, it's happening <em>now.</em>
        </li>
      </ul>

    </article>
  );

  const dataSource = () => (
    <article>
      The police brutality incidents are sourced from <a href="https://github.com/2020PB/police-brutality" rel="noopener noreferrer" target="_blank">this GitHub repository</a>
      .&nbsp; This is a community-led effort.
      You can view the mission statement, frequently asked questions, code of conduct, and incident reporting guidelines for
      the data collection <a href="https://github.com/2020PB/police-brutality/blob/master/CONTRIBUTING.md" rel="noopener noreferrer" target="_blank">here</a>.
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
      default:
        break;
    }

    items.sort((a, b) => a.description.localeCompare(b.description));

    const itemsList = items.map(way => (
      <li>
        <a href={way.url} rel="noopener noreferrer" target="_blank">
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
      {getExpansionPanel('Why was this website built?', whyBuildThisWebsite(), 'WhyBuildThisWebsite')}
      {getExpansionPanel('Why should we defund the police?', whyDefundPolice, 'WhyDefundPolice')}
      {getExpansionPanel('Where is the police brutality incident data sourced from?', dataSource(), 'DataSource')}
      {getExpansionPanel('How can we help outside of donations?', getItems('HowCanIHelp'), 'HowCanIHelp')}
      {getExpansionPanel('Additional resources', getItems('AdditionalResources'), 'AdditionalResources')}
    </section>
  );
};

export default AboutPage;
