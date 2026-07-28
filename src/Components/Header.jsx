import { IoIosSearch } from "react-icons/io";

function Header({ search, setSearch }) {
    console.log(search);
  console.log(setSearch);

  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="font-bold text-4xl mb-2">Boards</h1>

      <div className="flex items-center gap-6">

        <div className="relative">
          <IoIosSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl " />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80 h-12 pl-12 pr-4 rounded-2xl bg-white shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       

      </div>
    </div>
  );
}

export default Header;