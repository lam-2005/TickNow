import Button from "./components/Button/Button";
import Movie from "./components/Movie/Movie";
import Slideshow from "./components/Slideshow/Slideshow";

export default function Home() {
  return (
    <>
      <Slideshow />
      <div className="">
        <section className="bg-background py-10">
          <div className="container flex flex-col">
            <h2 className="self-center">Phim Đang Chiếu</h2>
            <div className="grid grid-cols-5 gap-x-5 gap-y-10 mt-5 ">
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
              <Movie />
            </div>
            <Button
              title="Xem thêm"
              className="mt-10 self-center bg-transparent border-primary border-2 before:border-primary 
              text-primary  hover:text-white hover:shadow-primary hover:bg-primary"
            />
          </div>
        </section>
        <section className="">
          <div className="container flex flex-col">
            <h2 className="self-center">Phim Sắp Chiếu</h2>
          </div>
        </section>
        <article>
          <div className="container flex flex-col">
            <h2 className="self-center">Khuyến Mãi</h2>
          </div>
        </article>
      </div>
    </>
  );
}
