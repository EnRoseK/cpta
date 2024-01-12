import { IGroupQuestion } from '@/interfaces';
import React, { FC, useState } from 'react';
import { Collapse } from '../global';

interface GroupQuestionsProps {
  groupQuestion: IGroupQuestion;
}

export const GroupQuestions: FC<GroupQuestionsProps> = ({ groupQuestion }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className='space-y-10'>
      <div className='w-full border-b border-b-primary px-[30px] py-4 text-lg font-medium text-primary'>
        {groupQuestion.title}
      </div>
      <div className='space-y-6'>
        {groupQuestion.questions.map((question, index) => {
          return (
            <Collapse
              show={activeIndex === index}
              key={question.id}
              title={question.question}
              content={question.answer}
              onClick={() => setActiveIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
};
