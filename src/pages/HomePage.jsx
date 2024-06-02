import Header from "@/components/Header";
import Main from "@/components/Main";

function HomePage() {
  return (
    <>
      <main className="min-h-[90vh] max-w-screen-xl mx-auto px-4 my-8 flex flex-col justify-center items-center">
        <Header />
        <Main />
      </main>
    </>
  );
}

export default HomePage;
