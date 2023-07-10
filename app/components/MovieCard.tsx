import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import FavoriteButton from "./FavoriteButton";
import { MovieInterface } from "../types/MovieInterface";
import useInfoModal from "@/hooks/useInfoModal";
import Image from "next/image";

interface MovieCardProps {
  data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  const redirectToWatch = useCallback(() => router.push(`/watch/${data.id}`), [router, data.id]);

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <Image
        onClick={redirectToWatch}
        src={data.thumbnailUrl}
        alt="Movie"
        width="1000"
        height="1000"
        quality={100}
        draggable={false}
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 w-full h-[12vw] delay-300"
      />

      <div className="opacity-0 absolute top-0 transition duration-300 z-10 invisible sm:visible w-full scale-50 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:opacity-100 delay-300">
        <Image
          onClick={redirectToWatch}
          src={data.thumbnailUrl}
          width="1000"
          height="1000"
          quality={100}
          alt="Movie"
          draggable={false}
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
        />
        <div className="absolute z-10 w-full p-2 transition shadow-md bg-zinc-800 lg:p-4 rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={redirectToWatch}
              className="flex items-center justify-center w-6 h-6 transition bg-white rounded-full cursor-pointer lg:w-10 lg:h-10 hover:bg-neutral-300"
            >
              <PlayIcon className="w-4 text-black lg:w-6" />
            </div>
            <FavoriteButton movieId={data.id} />
            <div
              onClick={() => openModal(data?.id)}
              className="flex items-center justify-center w-6 h-6 ml-auto transition border-2 border-white rounded-full cursor-pointer group/item lg:w-10 lg:h-10 hover:border-neutral-300"
            >
              <ChevronDownIcon className="w-4 text-white group-hover/item:text-neutral-300 lg:w-6" />
            </div>
          </div>
          <p className="mt-4 font-semibold text-green-400">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row items-center gap-2 mt-4">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            <p>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
