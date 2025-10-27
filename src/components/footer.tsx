import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-auto px-6 border-t border-[#28262D]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-6">
        <div className="md:w-2/3">
          <p className="text-lg md:text-xl font-semibold leading-relaxed text-gray-300">
            Our platform is trusted by millions & features the best updated
            movies all around the world.
          </p>
          <p className=" text-gray-400 text-sm text-left">
            &copy; {new Date().getFullYear()} Movie Explorer. All rights
            reserved.
          </p>
        </div>
        <div className="md:w-1/3 flex justify-start md:justify-end">
          <ul className="text-gray-300 text-sm space-y-2 text-left md:text-right">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/watchlist">Watchlist</NavLink>
            </li>

            <li>
              <NavLink to="/upcoming">Upcoming</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
