import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "react-feather";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const isNavLinkClickRef = useRef(false);

  const menuButtonRef = useRef(null);
  const [menuButtonCoords, setMenuButtonCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuButtonCoords({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (!isNavLinkClickRef.current) {
          setShowNav(false);
        }
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setShowNav(true);
        isNavLinkClickRef.current = false;
      }

      setScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Resume", href: "/Resume_nancy.pdf" },
  ];

  const handleNavLinkClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.getElementById(href.substring(1));

    if (targetElement) {
      isNavLinkClickRef.current = true;
      setIsOpen(false);

      const menuCloseDuration = 300; // Duration in ms matching exit animation
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }, menuCloseDuration + 50);
    }
  };

  const mobileMenuVariants = {
    hidden: {
      clipPath: `circle(0% at ${menuButtonCoords.x}px ${menuButtonCoords.y}px)`,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    visible: {
      clipPath: `circle(150% at ${menuButtonCoords.x}px ${menuButtonCoords.y}px)`,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      clipPath: `circle(0% at ${menuButtonCoords.x}px ${menuButtonCoords.y}px)`,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {showNav && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", damping: 15, stiffness: 120 }}
          className={`fixed w-full z-50 ${
            scrolled ? "backdrop-blur-md bg-gray-900/80" : "bg-transparent"
          } transition-all duration-100`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mr-28">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
              >
                <a
                  href="#home"
                  onClick={(e) => handleNavLinkClick(e, "#home")}
                  className="text-white font-bold text-xl"
                >
                  <span className="bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    Nancy Srivastava
                  </span>
                </a>
              </motion.div>

              {/* Desktop Nav */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavLinkClick(e, item.href)}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.05 * index,
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                      }}
                      whileHover={{
                        scale: 1.05,
                        color: "#818cf8",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                {/* Floating Close/Open Button */}
                <motion.button
                  ref={menuButtonRef}
                  onClick={() => setIsOpen(!isOpen)}
                  whileTap={{ scale: 0.9 }}
                  className="fixed top-4 right-4 z-50 md:hidden text-white  p-2 rounded-full shadow-lg"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bubbling Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-0 left-0 w-full h-full z-40 bg-gray-900/90 backdrop-blur-md"
                style={{ overflow: "hidden" }}
              >
                <div className="px-4 pt-20 space-y-4">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavLinkClick(e, item.href)}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="block px-3 py-2 rounded-md text-xl text-white hover:text-indigo-300"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
