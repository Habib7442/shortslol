import Image from 'next/image';

type ReviewCardProps = {
  name: string;
  description: string;
  photoUrl: string;
};

const ReviewCard = ({ name, description, photoUrl }: ReviewCardProps) => {
  return (
    <div className='mx-auto flex items-center gap-x-4 px-4 sm:px-6'>
      <div className='h-12 w-12 flex-shrink-0 overflow-auto rounded-full sm:mb-0 sm:mr-4'>
        <Image
          src={photoUrl}
          alt='Profile picture'
          layout='responsive'
          width={1}
          height={1}
        />
      </div>
      <div>
        <h4 className='text-lg font-bold'>{name}</h4>
        <p className='mt-1 italic'>"{description}"</p>
      </div>
    </div>
  );
};

export default ReviewCard;
