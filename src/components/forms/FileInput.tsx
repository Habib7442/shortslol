import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';

type FileInputProps = {
  labelText: string;
  setFile: (file: File | null) => void;
};

const FileInput = ({ labelText, setFile }: FileInputProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (!file.type.match(/image\/(jpeg|png|jpg)/)) {
        alert('Invalid file type. Please upload a JPEG or PNG image.');
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      const fileSizeInMB = file.size / (1024 * 1024); // file size in MB

      if (fileSizeInMB > 10) {
        alert('File size exceeds 10MB. Please select a smaller file.');
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      const url = URL.createObjectURL(file);
      setFile(file);
      setPreviewUrl(url);
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <label htmlFor='file-upload' className='relative cursor-pointer'>
      <div className='flex w-full flex-col items-start gap-y-2'>
        <span className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>
          {labelText}
        </span>
        <div className='mt-1 w-full sm:col-span-2 sm:mt-0'>
          <div className='flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5'>
            {previewUrl ? (
              <>
                <span
                  className='absolute right-2 top-2 cursor-pointer'
                  onClick={clearFile}
                >
                  <ImCross />
                </span>
                <Image
                  src={previewUrl}
                  alt='Preview'
                  className='h-12 w-12'
                  layout='responsive'
                  width={1}
                  height={1}
                />
              </>
            ) : (
              <div className='space-y-1 text-center'>
                <svg
                  className='mx-auto h-12 w-12 text-gray-400'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 48 48'
                  aria-hidden='true'
                >
                  <path
                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <div className='flex text-sm text-gray-600'>
                  <span className='relative mx-auto cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'>
                    Upload a file
                    <input
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      className='sr-only'
                      onChange={handleFileChange}
                    />
                  </span>
                </div>
                <p className='text-xs text-gray-500'>PNG, JPG up to 10MB</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </label>
  );
};

export default FileInput;
