import Header from "@/components/Header";
import Main from "@/components/Main";

function HomePage() {
  return (
    <>
      <main className="min-h-[90vh] max-w-screen-xl mx-auto px-4 my-8 ">
        <Header />
        <div className="flex flex-col justify-center items-center">
          <Main />
        </div>
      </main>
    </>
  );
}

export default HomePage;
