export default function Navbar() {
  return (
    <nav className="bg-orange-400 drop-shadow-xl">
      <div className="text-lg text-gray-100">
        <div className="flex justify-items-end mb-2 pt-2 pb-8 pl-8 pr-8 mb-8 ">
          <div className="font-normal hover:font-bold">
            <a href="/">Home</a>
          </div>
          <div className="grow"></div>
          <div className="flex column space-x-4">
            <div className="font-normal hover:font-bold">
              <a href="/admin">Admin</a>
            </div>
            <div className="font-normal hover:font-bold">
              <a href="#">Login</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
