import React, { useState } from 'react';
import { AccordionContainer, AccordionContent, AccordionHeader, AccordionIcon, AccordionTitle } from './styles';
import { ChevronDown } from 'react-feather';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer>
      <AccordionHeader onClick={handleAccordionClick}>
        <AccordionTitle>{title}</AccordionTitle>
        <AccordionIcon isOpen={isOpen}>
          <ChevronDown />
        </AccordionIcon>
      </AccordionHeader>
      {isOpen && <AccordionContent isOpen={isOpen}>{children}</AccordionContent>}
    </AccordionContainer>
  );
};

export default Accordion;
