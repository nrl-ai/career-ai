import { motion } from "framer-motion";
import { HiBars3 } from "react-icons/hi2";
import { MdNavigateNext } from "react-icons/md";
import { Icon } from "@/client/components/icon";

export const Header = () => (
  <motion.header
    className="fixed inset-x-0 top-0 z-20 navbar nav-dark"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.3 } }}
  >
    <div className="container bg-gradient-to-b from-white to-[#ECF3FE]/90 rounded-b-3xl">
      <nav>
        <a href="/" className="flex flex-row">
          <Icon open={true} size={38} />
        </a>
        {/* Moblie Menu Toggle Button (Offcanvas Button) */}
        <div className="lg:hidden flex items-center ms-auto px-2.5">
          <button
            className="hs-collapse-toggle inline-flex items-center justify-center h-9 w-12 rounded-md border border-gray-300 bg-slate-300/30"
            type="button"
            id="hs-unstyled-collapse"
            data-hs-collapse="#mobileMenu"
            data-hs-type="collapse"
          >
            <HiBars3 className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        <div
          id="mobileMenu"
          className="hs-collapse overflow-hidden transition-all duration-300 lg:basis-auto basis-full grow hidden lg:flex items-center justify-center mx-auto mt-2 lg:mt-0"
        >
          <ul id="navbar-navlist" className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://blog.career-ai.vn/">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard/resumes">
                Resume Buider
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard/cv-optimization">
                Resume Optimizer
              </a>
            </li>
          </ul>
          <div className="lg:hidden flex items-center pt-4 mt-4 lg:pt-0 lg:mt-0 border-t border-gray-200 lg:border-none">
            <a
              href="/dashboard/resumes"
              className="nav-btn font-bold text-white bg-orange-400 rounded-2xl"
            >
              <MdNavigateNext className="h-5 w-5 me-2" />
              Register
            </a>
          </div>
        </div>
        <div className="hidden lg:flex items-center">
          <a href="/dashboard/resumes" className="nav-btn text-white bg-orange-400 rounded-2xl">
            <MdNavigateNext className="h-5 w-5 me-2" />
            Register
          </a>
        </div>
      </nav>
    </div>
  </motion.header>
);
