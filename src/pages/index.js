import MainNavigation from "../../components/layout/main-navigation";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <MainNavigation />
      <main className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome On Board
        </h1>
        <p className="text-lg text-gray-600">
          Start exploring your Next.js + Tailwind CSS app.
        </p>
      </main>
    </div>
  );
}
