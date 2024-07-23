export const TemplateCard = ({
  templateName,
  videoPath,
  onClick,
}: {
  templateName: string;
  videoPath: string;
  onClick: () => void;
}) => {
  return (
    <div
      className='group flex h-full w-full cursor-pointer flex-col gap-y-1'
      onClick={onClick}
    >
      <p className='text-center text-gray-600 group-hover:text-black'>
        {templateName}
      </p>
      <div className='overflow-hidden rounded-lg group-hover:shadow-xl group-hover:shadow-purple-400'>
        <video src={videoPath} muted autoPlay loop />
      </div>
    </div>
  );
};
