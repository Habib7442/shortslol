const TweetCard = ({
  tweetId,
  tweetContext,
  username,
}: {
  tweetId: string;
  tweetContext: string;
  username: string;
}) => {
  return (
    <div
      onClick={() => {
        window.open(`https://twitter.com/status/${tweetId}`);
      }}
      className='flex cursor-pointer items-center justify-between gap-x-2 rounded-lg border border-gray-300 p-6 hover:border-gray-500'
    >
      <div className='flex min-w-[250px] items-center justify-start gap-x-2'>
        <div className='flex flex-col items-start justify-center'>
          <a
            href={`https://twitter.com/${username}`}
            target='_blank'
            className='hover:text-black'
          >
            <p className='text-xs'>@{username}</p>
          </a>
          <p>{tweetContext}</p>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
