import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { Accordion, Typography, AccordionSummary, AccordionDetails } from '@material-ui/core';
// utils
// import mockData from '../../../utils/mock-data'; // Remove this line
//
import { varFadeIn, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const faqData = {
  FAQ: [
    {
      Question: 'Who can I refer?',
      Answer:
        'You can refer any student who meets the following eligibility criteria:\n- Holds a graduate degree in any stream.\n- Aged between 20 to 24 years.\n- Demonstrates good communication skills.'
    },
    {
      Question: 'Is this a PAID referral program?',
      Answer: 'No, our referral program is entirely FREE for everyone.'
    },
    {
      Question: 'I am not a MicroCollege student. Can I still refer a friend?',
      Answer:
        'Yes, this referral program is open to both MicroCollege learners and anyone looking to upskill. Start referring now!'
    },
    {
      Question: 'Is there a limit to the number of referrals per person?',
      Answer: 'No, you can refer as many friends as you like and receive exciting rewards.'
    },
    {
      Question: 'What courses can I refer my friends to?',
      Answer: 'You can refer your friends to all of our courses, as long as they meet the eligibility criteria.'
    }
  ]
};

export default function FaqsList() {
  return (
    <MotionInView variants={varFadeIn}>
      {faqData.FAQ.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<Icon icon={arrowIosDownwardFill} width={20} height={20} />}>
            <Typography variant="subtitle1">{faq.Question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.Answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </MotionInView>
  );
}
