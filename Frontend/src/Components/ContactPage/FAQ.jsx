import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Contact.css';
import faq3 from "../../assets/faq3.jpg";


const FAQ = () => {
  return (
    <section className="faqImageSection">
      <div className="faqContent">
    
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>What is BudgetBee?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              BudgetBee is a personal finance management tool that helps you track your earnings, expenses, and set savings goals.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How do I add an expense?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Simply navigate to the 'Expense' section, enter the amount, category, and date of the expense, and click 'Add Expense'.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>What types of financial assistance does BudgetBee provide?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              BudgetBee helps you track your expenses and earnings while providing insights on how to better manage your funds. We offer tips on budgeting and financial planning based on your income and spending patterns.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How do I track my expenses on BudgetBee?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Simply log in to your account and navigate to the "Expenses" section. You can manually add expenses or categorize them based on your transactions. BudgetBee will automatically update your financial status.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Can I sync my bank account or payment methods with BudgetBee?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Currently, we do not offer direct bank syncing. However, you can manually input your transactions and categorize them for a more accurate financial overview.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How do I update my account settings?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              To update your account settings, log in to your BudgetBee account and go to the "Account Settings" section, where you can modify your personal information, password, and other preferences.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Is my financial data safe with BudgetBee?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, we take your privacy and security seriously. All your data is encrypted and stored securely. We follow best practices to ensure your financial information remains protected.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
     
      <div className="faqImage">
        <img
          src={faq3}
          alt="Support"
        />
      </div>
    </section>
  );
};

export default FAQ;