import React, { Dispatch, SetStateAction, useState } from 'react';

type VideoTable = {
  id: string;
  title: string;
  video_url: string;
  duration: number;
  thumbnail: string;
  error_message?: string;
  prompt:string;
};

// Define the context type with videos and management functions

type VideosContextType = {
  videos: VideoTable[];
  addVideo: (video: VideoTable) => void;
  updateVideo: (updatedVideo: VideoTable) => void;
  setVideos: Dispatch<SetStateAction<VideoTable[]>>;
};

export function useVideos() {
  const context = React.useContext(VideosContext);
  if (!context) {
    throw new Error('useVideos must be used within a VideosProvider');
  }
  return context;
}

const VideosContext = React.createContext<VideosContextType | undefined>(
  undefined
);

type VideosProviderProps = {
  children: React.ReactNode;
};

export const VideosProvider: React.FC<VideosProviderProps> = ({ children }) => {
  const [videos, setVideos] = useState<VideoTable[]>([]);

  const addVideo = (video: VideoTable) => {
    setVideos((prevVideos) => [...prevVideos, video]);
  };

  const updateVideo = (updatedVideo: VideoTable) => {
    setVideos((prevVideos) => {
      const videoIndex = prevVideos.findIndex(
        (video) => video.id === updatedVideo.id
      );
      if (videoIndex !== -1) {
        const newVideos = [...prevVideos];
        newVideos[videoIndex] = updatedVideo;
        return newVideos;
      }
      return prevVideos;
    });
  };

  return (
    <VideosContext.Provider
      value={{ videos, addVideo, updateVideo, setVideos }}
    >
      {children}
    </VideosContext.Provider>
  );
};
