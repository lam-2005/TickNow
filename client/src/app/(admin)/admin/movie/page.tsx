"use client";
import React from "react";
import AddBtn from "@/admin_components/Button/AddBtn";
import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import OptionTable from "@/admin_components/OptionTable/OptionTable";
import Table, { Column } from "@/admin_components/Table/Table";
import { MovieType } from "@/interfaces/movie.interface";
const MovieManagement = () => {
  const movies: MovieType[] = [
    {
      id: 1,
      name: "Avengers: Endgame",
      date: "2019-04-26",
      director: "Anthony Russo, Joe Russo",
      nation: "USA",
      age: 13,
      category: "Action, Sci-Fi",
      language: "English",
      time: 181,
      text_summary:
        "The Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
      status: 1,
      image: "avengers.jpg",
      banner: null,
      trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
      date_added: "2025-06-03",
    },
    {
      id: 2,
      name: "Parasite",
      date: "2019-05-30",
      director: "Bong Joon-ho",
      nation: "South Korea",
      age: 18,
      category: "Drama, Thriller",
      language: "Korean",
      time: 132,
      text_summary:
        "A poor family schemes to become employed by a wealthy household by infiltrating their lives.",
      status: 1,
      image: "parasite.jpg",
      banner: null,
      trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
      date_added: "2025-06-01",
    },
    {
      id: 3,
      name: "Inception",
      date: "2010-07-16",
      director: "Christopher Nolan",
      nation: "USA",
      age: 13,
      category: "Sci-Fi, Thriller",
      language: "English",
      time: 148,
      text_summary:
        "A thief who steals corporate secrets through dream-sharing is given a task to plant an idea instead.",
      status: 1,
      image: "inception.jpg",
      banner: null,
      trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      date_added: "2025-05-28",
    },
    {
      id: 4,
      name: "The Godfather",
      date: "1972-03-24",
      director: "Francis Ford Coppola",
      nation: "USA",
      age: 18,
      category: "Crime, Drama",
      language: "English",
      time: 175,
      text_summary:
        "The aging patriarch of an organized crime dynasty transfers control of his empire to his son.",
      status: 1,
      image: "godfather.jpg",
      banner: null,
      trailer: "https://www.youtube.com/watch?v=sY1S34973zA",
      date_added: "2025-05-20",
    },
    {
      id: 5,
      name: "Spirited Away",
      date: "2001-07-20",
      director: "Hayao Miyazaki",
      nation: "Japan",
      age: 10,
      category: "Animation, Fantasy",
      language: "Japanese",
      time: 125,
      text_summary:
        "A young girl enters a magical world ruled by gods, spirits, and a witch, where humans are transformed into beasts.",
      status: 1,
      image: "spirited_away.jpg",
      banner: null,
      trailer: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
      date_added: "2025-05-15",
    },
    {
      id: 6,
      name: "Interstellar",
      date: "2014-11-07",
      director: "Christopher Nolan",
      nation: "USA",
      age: 13,
      category: "Adventure, Sci-Fi",
      language: "English",
      time: 169,
      text_summary:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      status: 1,
      image: "interstellar.jpg",
      banner: null,
      trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
      date_added: "2025-05-10",
    },
    {
      id: 7,
      name: "Your Name",
      date: "2016-08-26",
      director: "Makoto Shinkai",
      nation: "Japan",
      age: 10,
      category: "Animation, Romance",
      language: "Japanese",
      time: 106,
      text_summary:
        "Two teenagers share a profound connection after they find themselves swapping bodies.",
      status: 1,
      image: "yourname.jpg",
      banner: null,
      trailer: "https://www.youtube.com/watch?v=xU47nhruN-Q",
      date_added: "2025-05-08",
    },
    {
      id: 8,
      name: "Joker",
      date: "2019-10-04",
      director: "Todd Phillips",
      nation: "USA",
      age: 18,
      category: "Drama, Thriller",
      language: "English",
      time: 122,
      text_summary:
        "In Gotham City, a mentally troubled comedian embarks on a downward spiral that leads to crime.",
      status: 1,
      image: "joker.jpg",
      banner: null,
      trailer: "https://www.youtube.com/watch?v=zAGVQLHvwOY",
      date_added: "2025-04-30",
    },
    {
      id: 9,
      name: "Titanic",
      date: "1997-12-19",
      director: "James Cameron",
      nation: "USA",
      age: 13,
      category: "Romance, Drama",
      language: "English",
      time: 195,
      text_summary:
        "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the Titanic.",
      status: 1,
      image: "titanic.jpg",
      banner: null,
      trailer: "https://www.youtube.com/watch?v=kVrqfYjkTdQ",
      date_added: "2025-04-25",
    },
    {
      id: 10,
      name: "The Dark Knight",
      date: "2008-07-18",
      director: "Christopher Nolan",
      nation: "USA",
      age: 13,
      category: "Action, Crime",
      language: "English",
      time: 152,
      text_summary:
        "Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      status: 1,
      image: "dark_knight.jpg",
      banner: null,
      trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
      date_added: "2025-04-20",
    },
  ];
  const col: Column<MovieType>[] = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "date", title: "Date" },
    { key: "director", title: "Director" },
    { key: "nation", title: "Nation" },
    { key: "age", title: "Age" },
    { key: "category", title: "Category" },
    { key: "time", title: "Time" },
    {
      title: "Thao tác",
      render(row: MovieType) {
        return (
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded"
              onClick={() => handleEdit(row.id)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => handleDelete(row.id)}
            >
              Xóa
            </button>
          </div>
        );
      },
    },
  ];
  const handleEdit = (id: string | number) => {
    console.log("Edit", id);
  };

  const handleDelete = (id: string | number) => {
    console.log("Delete", id);
  };
  return (
    <div className="card">
      <HeadingCard title="Quản lý Phim Chiếu">
        <AddBtn />
      </HeadingCard>
      <OptionTable />
      <Table column={col} data={movies} />
    </div>
  );
};

export default MovieManagement;
