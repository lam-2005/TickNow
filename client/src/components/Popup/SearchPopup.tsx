import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getMovieList } from "@/services/movie.service";
import { MovieType } from "@/interfaces/movie.interface";
import env from "@/configs/environment";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import convertSlug from "@/utils/convertSlug";
import LoadingSpin from "../LoadingAPI/LoadingSpin";

const SearchPopup = ({ className }: { className: string }) => {
  const [searchText, setSearchText] = useState("");
  const [openSearchbox, setOpenSearchbox] = useState(false);

  const searchRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpenSearchbox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [results, setResults] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await getMovieList(
        `?status=1${searchText ? `&name=${searchText}` : "&limit=5"}`
      );
      setResults(res?.data.movie);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseSearchbox = () => {
    setOpenSearchbox(false);
    setSearchText("");
  };
  return (
    <>
      {openSearchbox && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-998" />
      )}
      <form action="" ref={searchRef} className={`${className}`}>
        <button type="button" className="px-2 flex-center border-0">
          <span className="font-bold text-foreground">
            <FiSearch />
          </span>
        </button>
        <span className="w-[1px] h-3 bg-foreground"></span>
        <input
          // onClick={() => setIsSearchOpen(!isSearchOpen)}
          onFocus={() => setOpenSearchbox(true)}
          type="search"
          placeholder="Tìm kiếm"
          value={searchText}
          className="w-full h-full outline-0 px-2 text-foreground text-xs"
          onChange={(e) => setSearchText(e.target.value)}
        />
        {openSearchbox && (
          <div className="scroll-bar absolute bg-background-card top-[calc(100%_+_22px)] right-0 min-w-[350px] w-fit rounded-lg after:w-5 after:h-5 after:bg-inherit after:absolute after:top-0 after:rotate-45 after:-translate-y-1/2 after:right-5 ">
            {loading ? (
              <LoadingSpin />
            ) : results && !searchText ? (
              <>
                <div className="text-foreground p-3">PHIM ĐANG CHIẾU</div>
                <div className="last:rounded-b-lg scroll-bar flex-column overflow-hidden max-h-[80vh] overflow-y-auto ">
                  {results.map((movie) => (
                    <ItemSearch
                      key={movie._id}
                      movie={movie}
                      onClose={handleCloseSearchbox}
                    />
                  ))}
                </div>
              </>
            ) : searchText && results.length > 0 ? (
              <>
                <div>
                  <div className="text-foreground p-3">KẾT QUẢ TÌM KIẾM</div>
                  {results.map((movie) => (
                    <ItemSearch
                      key={movie._id}
                      movie={movie}
                      onClose={() => setOpenSearchbox(false)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="w-full h-full text-center p-5">
                Rất tiếc. Không tìm thấy phim
              </p>
            )}
          </div>
        )}
      </form>
    </>
  );
};

const ItemSearch = ({
  movie,
  onClose,
}: {
  movie: MovieType;
  onClose: () => void;
}) => {
  const slugName = convertSlug(movie.name);
  return (
    <Link
      onClick={onClose}
      href={`/detail/${slugName}-${movie._id}`}
      className="flex gap-4 hover:bg-neutral-600 p-3"
      title={movie.name}
    >
      <div className="relative min-w-[70px] w-[70px] h-[105px]">
        <Image
          alt=""
          src={`${env.IMG_API_URL}${movie.image}`}
          fill
          sizes="100px"
          loading="lazy"
          className="object-cover rounded-sm"
        />
      </div>
      <div className="space-y-1">
        <div className="font-bold text-foreground text-base line-clamp-1">
          {movie.name}
        </div>
        <div className="text-subtitle text-sm line-clamp-2">
          {movie.genre.map((item) => item.name).join(", ")}
        </div>
        {movie.star ? (
          <div className="flex gap-1">
            <FaStar className="text-yellow-500 text-xl" />{" "}
            <span className="text-sm font-bold self-center leading-0">
              {movie.star}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

export default SearchPopup;
