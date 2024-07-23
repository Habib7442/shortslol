const faqQuestions = [
  {
    question: 'How long does a video take?',
    answer: 'On average it takes around 2 minutes per video.',
  },
  {
    question: 'How long are the videos?',
    answer:
      'Around 20 seconds for the beta, with more times coming out next week.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, the free trial contains with 3 credits.',
  },
  {
    question: 'I want a custom solution',
    answer: 'Please contact team@shorts.lol',
  },
  {
    question: 'Do you have an affiliate program?',
    answer: 'Yes, with insane rates. Please contact team@shorts.lol',
  },
];

const FAQ = () => {
  return (
    <div>
      <h1 className='py-8 text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
        FAQ
      </h1>
      {faqQuestions.map((question, index) => {
        return (
          <div
            key={index}
            className='flex flex-col gap-y-4 px-4 pb-8 text-center'
          >
            <h3 className='text-base font-semibold uppercase tracking-wide text-indigo-600'>
              {question.question}
            </h3>
            <p className='w-full text-base font-medium text-gray-900'>
              {question.answer}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FAQ;
