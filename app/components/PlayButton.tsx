import React from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="flex flex-row items-center w-auto px-2 py-1 text-xs font-semibold transition bg-white rounded-md md:px-8 lg:text-lg hover:bg-neutral-300"
    >
      <PlayIcon className="w-6 mr-1 text-black md:w-7" />
      Play
    </button>
  );
};

export default PlayButton;
