const TopBar = () => {
  return (
    <div className=' bg-blue-700 py-2 text-center text-white'>
      Good at promoting? <span className='font-bold'>Earn $5</span> everytime
      someone buys premium ($10){' '}
      <a
        href='mailto:team@shorts.lol'
        target='_blank'
        className='underline hover:text-gray-200'
      >
        Find out more
      </a>
    </div>
  );
};

export default TopBar;
