import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

import { getVideosByUserId } from "@/lib/supabase/videos/getVideosByUserId";
import { supabase } from "@/lib/supabaseClient";

import { VideoError } from "@/components/cards/VideoError";
import { VideoLoading } from "@/components/cards/VideoLoading";
import { VideoPreview } from "@/components/cards/VideoPreview";
import DashboardHeader, {
  NAV_ITEMS,
} from "@/components/headers/dashboardHeader";
import Layout from "@/components/layout/Layout";
import Loader from "@/components/Loader";
import Seo from "@/components/Seo";

import { useUser } from "@/contexts";
import { useVideos } from "@/contexts/videosContext";
import withAuth from "@/hoc/withAuth";

type VideoTable = {
  id: string;
  title: string;
  url: string;
  duration: number;
  thumbnail: string;
  error_message?: string;
  video_url: string;
  prompt:string;
};

function HomePage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { videos, addVideo, updateVideo, setVideos } = useVideos();

  console.log(videos);

  const TOKEN_LIMITS = {
    FREE: 10, // Set your actual free limit
  };

  const VIDEOS_TABLE = "videos";

  useEffect(() => {
    const channel = supabase
      .channel("steps")
      .on(
        "postgres_changes",
        {
          schema: "public",
          table: VIDEOS_TABLE,
          event: "UPDATE",
        },
        (payload) => {
          const newVideo = payload.new as VideoTable;

          const videoExists = videos.some((video) => video.id === newVideo.id);

          if (videoExists) {
            updateVideo(newVideo);
          } else {
            addVideo(newVideo);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [videos, addVideo, updateVideo]);

  const getVideos = useCallback(async () => {
    if (!user) return;

    const videos = await getVideosByUserId(user.id);
    console.log("Fetched Videos: ", videos);

    setVideos(videos);

    setLoading(false);
  }, [setVideos, user]);

  useEffect(() => {
    getVideos();
  }, [getVideos]);

  const createNewButton = (
    <button
      onClick={() => {
        if (
          user &&
          (user.free_credits_used ?? 0) > TOKEN_LIMITS.FREE &&
          !user.subscription
        ) {
          router.push("/pricing");
          return;
        }
        router.push("/create");
      }}
      className="group relative inline-flex w-fit items-center justify-center overflow-hidden rounded-md p-1 font-bold"
    >
      <span className="absolute h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
      <span className="duration-400 relative flex w-full items-center gap-x-2 rounded-md bg-gray-900 px-6 py-3 transition-all ease-out group-hover:bg-opacity-0">
        <span className="relative hidden text-white sm:block">
          Create new video
        </span>
        <span className="relative text-white sm:hidden">New video</span>
        <FiPlus className="h-6 w-6 text-white" />
      </span>
    </button>
  );

  return (
    <Layout>
      <DashboardHeader activeElement={NAV_ITEMS.DASHBOARD} />
      <Seo />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex h-[80vh] items-center justify-center gap-x-2">
            <Loader />
          </div>
        ) : !loading && videos.length === 0 ? (
          <div className="flex h-[80vh] items-center justify-center">
            <div className="flex flex-col items-center gap-y-2 sm:gap-y-4">
              <h2>Welcome to shorts.lol 🎉</h2>
              {createNewButton}
            </div>
          </div>
        ) : (
          <div>
  <div className="mt-4 flex w-full flex-col items-center gap-y-4 sm:mt-6">
    <div className="flex w-full items-center justify-between">
      <h3 className="text-gray-700 text-xl font-semibold">My videos</h3>
      {createNewButton}
    </div>
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video, index) => (
        <div
          key={index}
          className="relative aspect-[16/9] w-full max-w-[300px] overflow-hidden rounded-2xl shadow-lg bg-gray-100"
        >
          {video.error_message ? (
            <div className="flex h-full items-center justify-center p-4">
              <p className="text-center text-red-500">
                Error: {video.error_message}
              </p>
            </div>
          ) : !video.video_url ? (
            <div className="flex h-full items-center justify-center p-4">
              <p className="text-center text-gray-500">Loading video...</p>
            </div>
          ) : (
            <>
              <video
                className="h-full w-full object-cover"
                src={video.video_url}
                controls
                loop
                playsInline
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="truncate text-sm text-white">{video.prompt}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

        )}
      </div>
    </Layout>
  );
}

export default withAuth(HomePage);
