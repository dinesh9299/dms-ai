import { useEffect, useState } from "react";
import background from "./images/portfoliobackground.jpg";
import "./App.css";
import man from "./images/man.png";
import html from "./images/html1.png";
import css from "./images/css1.png";
import javascript from "./images/javascript.webp";
import react from "./images/react2.png";
import bootstrap from "./images/bootstrap1.png";
import mongodb from "./images/mongo1.png";
import node from "./images/node2.png";
import express from "./images/express1.png";
import todo from "./images/todo.png";
import ecommerce from "./images/ecommerce.jpg";
import chat from "./images/chatapp.jpg";
import cookpad from "./images/cookpad.png";
import { motion } from "framer-motion";

import { fadeIn } from "./variants";

import axios from "axios";
import { toast } from "react-toastify";

function App() {
  const [headerBg, setHeaderBg] = useState("transparent");
  const [padding, setPadding] = useState("py-4");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("header");
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  console.log("data", data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "https://portfolio-1-shhl.onrender.com/send-email",
        data
      );
      const dataApi = response.data;

      if (dataApi.success) {
        setLoading(false);
        toast.success("Message submitted");
        setData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(`Error: ${dataApi.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred while sending the email. Please try again.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setHeaderBg("rgb(239, 239, 240)");
        setPadding("py-2");
      } else {
        setHeaderBg("transparent");
        setPadding("py-4");
      }

      // Update active section based on scroll position
      const sections = ["header", "about", "skills", "projects", "contact"];
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollY >= offsetTop - viewportHeight / 2 &&
            scrollY < offsetTop + offsetHeight - viewportHeight / 2
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const AnimatedText = ({ text }) => {
    return (
      <div className="namesize fw-bold">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1, // Staggering the animation
              type: "spring",
              stiffness: 100,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <div
      className="App overflow-hidden   bg-light  "
      style={{
        // backgroundImage: `url(${background})`,
        // backgroundRepeat:"no-repeat",
        // backgroundSize:"cover",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Background image container */}
      <div
        className="w-auto "
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        {/* Header section */}
        <header
          className={`position-fixed z-4 w-100 ${padding}`}
          style={{
            top: "0px",
            backgroundColor: headerBg,
            transition: "background-color 0.6s ease, padding 0.6s ease",
          }}
        >
          <div
            className="container d-flex justify-content-between align-items-center fw-bold"
            style={{
              transition: "color 0.6s ease",
              color: headerBg === "rgb(239, 239, 240)" ? "black" : "white",
            }}
          >
            <div
              className="fs-2"
              style={{ fontFamily: "Lucida Console, Courier New, monospace" }}
            >
              PORTFOLIO
            </div>

            {/* Desktop navigation */}
            <nav className="d-none d-lg-flex gap-5 align-items-center cursor">
              <span>
                <a
                  href="#header"
                  onClick={() => handleNavClick("header")}
                  className={`text-decoration-none ${
                    activeSection === "header" ? "highlighted-link" : ""
                  }`}
                  style={{
                    color:
                      headerBg === "rgb(239, 239, 240)" ? "black" : "white",
                  }}
                >
                  Home
                </a>
              </span>
              <span>
                <a
                  href="#about"
                  onClick={() => handleNavClick("about")}
                  className={`text-decoration-none ${
                    activeSection === "about" ? "highlighted-link" : ""
                  }`}
                  style={{
                    color:
                      headerBg === "rgb(239, 239, 240)" ? "black" : "white",
                  }}
                >
                  About
                </a>
              </span>
              <span>
                <a
                  href="#skills"
                  onClick={() => handleNavClick("skills")}
                  className={`text-decoration-none ${
                    activeSection === "skills" ? "highlighted-link" : ""
                  }`}
                  style={{
                    color:
                      headerBg === "rgb(239, 239, 240)" ? "black" : "white",
                  }}
                >
                  Skills
                </a>
              </span>
              <span>
                <a
                  href="#projects"
                  onClick={() => handleNavClick("projects")}
                  className={`text-decoration-none ${
                    activeSection === "projects" ? "highlighted-link" : ""
                  }`}
                  style={{
                    color:
                      headerBg === "rgb(239, 239, 240)" ? "black" : "white",
                  }}
                >
                  Projects
                </a>
              </span>
              <span>
                <a
                  href="#contact"
                  onClick={() => handleNavClick("contact")}
                  className={`text-decoration-none ${
                    activeSection === "contact" ? "highlighted-link" : ""
                  }`}
                  style={{
                    color:
                      headerBg === "rgb(239, 239, 240)" ? "black" : "white",
                  }}
                >
                  Contact
                </a>
              </span>
            </nav>

            {/* Mobile menu button */}
            <button
              className="d-lg-none fs-2 bi bi-list"
              onClick={toggleMenu}
              style={{
                background: "none",
                border: "none",
                color: headerBg === "rgb(239, 239, 240)" ? "black" : "white",
              }}
            ></button>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <div
              className="mobile-menu d-lg-none"
              style={{
                backgroundColor: "#333",
                color: "white",
                padding: "10px",
              }}
            >
              <div>
                <a
                  href="#header"
                  onClick={() => handleNavClick("header")}
                  className={`text-white text-decoration-none ${
                    activeSection === "header" ? "highlighted-link" : ""
                  }`}
                >
                  Home
                </a>
              </div>
              <div>
                <a
                  href="#about"
                  onClick={() => handleNavClick("about")}
                  className={`text-white text-decoration-none ${
                    activeSection === "about" ? "highlighted-link" : ""
                  }`}
                >
                  About
                </a>
              </div>
              <div>
                <a
                  href="#skills"
                  onClick={() => handleNavClick("skills")}
                  className={`text-white text-decoration-none ${
                    activeSection === "skills" ? "highlighted-link" : ""
                  }`}
                >
                  Skills
                </a>
              </div>
              <div>
                <a
                  href="#projects"
                  onClick={() => handleNavClick("projects")}
                  className={`text-white text-decoration-none ${
                    activeSection === "projects" ? "highlighted-link" : ""
                  }`}
                >
                  Projects
                </a>
              </div>
              <div>
                <a
                  href="#contact"
                  onClick={() => handleNavClick("contact")}
                  className={`text-white text-decoration-none ${
                    activeSection === "contact" ? "highlighted-link" : ""
                  }`}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section
          id="header"
          className="p-3 d-flex justify-content-center align-items-center h-100"
        >
          <div>
            <div className="fs-1 fw-bold hicolor">HI !</div>
            <motion.div>
              <AnimatedText text="I am Dinesh Veeravalli" />
            </motion.div>
            <div className="fs-5 baskervville-sc-regular">
              MERN Stack Developer
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <section id="about" className=" ps-4 " style={{ height: "100vh" }}>
        <div className="row h-100 d-flex align-items-center">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className="col-md-4 d-flex justify-content-center mb-4 mb-md-0"
          >
            <img src={man} alt="img" width={"300px"} className="img-fluid" />
          </motion.div>
          <div className="col-md-8 d-flex justify-content-center align-items-center">
            <motion.div className="text-secondary fs-5">
              <div className="text-info fs-1 fw-bold">About Me</div>
              <motion.div
                variants={fadeIn("left", 0.5)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.6 }}
              >
                As a passionate web developer, I specialize in creating
                responsive, user-friendly websites with a focus on performance,
                functionality, and clean design. My expertise spans front-end
                technologies and modern frameworks to bring innovative ideas to
                life on the web.
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className=" dancing-script "
        style={{ height: "100vh", paddingTop: "60px" }}
      >
        <div className="text-center skillscolor fw-bold fs-1">Skills</div>
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ height: "60vh" }}
        >
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className="rounded-3 d-flex flex-wrap gap-4 justify-content-center"
            style={{ maxWidth: "1100px" }} // Optional, sets a maximum width
          >
            {/* Skill Item: HTML */}
            <div
              className="skillsgradient d-flex align-items-center p-2 rounded-3 gap-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <span>
                <img src={html} width={"35px"} alt="html" />
              </span>
              <span className="jacques-francois-shadow-regular fs-2">HTML</span>
            </div>

            {/* Skill Item: CSS */}
            <div
              className="skillsgradient d-flex align-items-center p-2 rounded-3 gap-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <span>
                <img src={css} width={"35px"} alt="css" />
              </span>
              <span className="jacques-francois-shadow-regular fs-2">CSS</span>
            </div>

            {/* Skill Item: JavaScript */}
            <div
              className="skillsgradient d-flex align-items-center p-2 rounded-3 gap-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <span>
                <img src={javascript} width={"35px"} alt="javascript" />
              </span>
              <span className="jacques-francois-shadow-regular fs-2">
                JavaScript
              </span>
            </div>

            {/* Skill Item: Bootstrap */}
            <div
              className="skillsgradient d-flex align-items-center p-2 rounded-3 gap-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <span>
                <img src={bootstrap} width={"35px"} alt="bootstrap" />
              </span>
              <span className="jacques-francois-shadow-regular fs-2">
                Bootstrap
              </span>
            </div>

            {/* Skill Item: React */}
            <div
              className="skillsgradient d-flex align-items-center p-2 rounded-3 gap-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <span>
                <img src={react} width={"35px"} alt="react" />
              </span>
              <span className="jacques-francois-shadow-regular fs-2">
                React Js
              </span>
            </div>

            {/* Skill Item: MongoDB */}
            <div
              className="skillsgradient d-flex align-items-center p-2 rounded-3 gap-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <span>
                <img src={mongodb} width={"35px"} alt="mongodb" />
              </span>
              <span className="jacques-francois-shadow-regular fs-2">
                Mongo DB
              </span>
            </div>

            {/* Skill Item: Node.js */}
            <div
              className="skillsgradient d-flex align-items-center p-2 rounded-3 gap-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <span>
                <img src={node} width={"35px"} alt="node" />
              </span>
              <span className="jacques-francois-shadow-regular fs-2">
                Node Js
              </span>
            </div>

            {/* Skill Item: Express.js */}
            <div
              className="skillsgradient d-flex align-items-center p-2 rounded-3 gap-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "300px",
                maxWidth: "300px",
              }}
            >
              <span>
                <img src={express} width={"35px"} alt="express" />
              </span>
              <span className="jacques-francois-shadow-regular fs-2">
                Express Js
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className=" z-1"
        style={{ paddingTop: "50px" }} // Adjust paddingTop to account for the fixed header
      >
        <div className="text-center dancing-script fs-1 skillscolor fw-bold">
          Projects
        </div>
        <div className="scrollhidden mt-5 d-lg-flex gap-4 overflow-x-auto overflow-y-hidden">
          {/* Project Cards */}

          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className=" p-4 d-lg-flex gap-4"
          >
            <div
              className="border overflow-hidden text-center pt-3 fw-bold rounded-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "350px",
                height: "250px",
                backgroundImage: `url(${ecommerce})`,
                color: "white",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className="rounded-3 bg-opacity-25 h-100 w-100 text-light translate-up"
                style={{
                  backgroundColor: "rgba(44, 235, 235, 0.4)",
                  bottom: "-250px",
                  transition: "transform 0.5s ease", // Smooth transition on hover
                }}
              >
                <div className="border h-100 d-flex justify-content-center align-items-center">
                  <div>
                    <div
                      className=" text-secondary"
                      style={{ fontSize: "13px" }}
                    >
                      This is a responsive and user-friendly e-commerce platform
                      designed to offer a seamless shopping experience. Users
                      can browse a wide range of products, add them to their
                      cart, and make purchases with ease.
                    </div>
                    <div className="text-danger">
                      <a
                        className=" fs-5 text-decoration-none text-danger"
                        href="https://dinesh-6ovzriggx-dineshs-projects-9703b79e.vercel.app/"
                      >
                        visit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className=" p-4 d-lg-flex gap-4"
          >
            <div
              className="border overflow-hidden text-center pt-3 fw-bold rounded-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "350px",
                height: "250px",
                backgroundImage: `url(${chat})`,
                color: "white",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className="rounded-3 bg-opacity-25 h-100 w-100 text-light translate-up"
                style={{
                  backgroundColor: "rgba(44, 235, 235, 0.4)",
                  bottom: "-250px",
                  transition: "transform 0.5s ease", // Smooth transition on hover
                }}
              >
                <div className="border h-100 d-flex justify-content-center align-items-center">
                  <div>
                    <div
                      className=" text-secondary"
                      style={{ fontSize: "13px" }}
                    >
                      Chat application is a responsive and real-time chatting
                      application that enables users to communicate seamlessly
                      with friends, family, and colleagues. The platform is
                      designed for engaging and interactive conversations,
                      making it easy for users to connect.
                    </div>
                    <div className="">
                      <a
                        className=" text-decoration-none fs-5 text-danger"
                        href="https://chat-oh8995780-dineshs-projects-9703b79e.vercel.app/"
                      >
                        visit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/*second card */}

          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className=" p-4 d-lg-flex gap-4"
          >
            <div
              className="border overflow-hidden text-center pt-3 fw-bold rounded-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "350px",
                height: "250px",
                backgroundImage: `url(${cookpad})`,
                color: "white",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className="rounded-3 bg-opacity-25 h-100 w-100 text-light translate-up"
                style={{
                  backgroundColor: "rgba(44, 235, 235, 0.4)",

                  transition: "transform 0.5s ease",
                }}
              >
                <div className="border h-100 d-flex justify-content-center align-items-center">
                  <div>
                    <div className=" text-dark" style={{ fontSize: "12px" }}>
                      Cookpad is an interactive platform dedicated to helping
                      users discover, learn, and master the art of cooking. The
                      website features a curated collection of diverse recipes,
                      accompanied by step-by-step instructions, cooking tips,
                      and techniques.
                    </div>
                    <div className="text-danger">
                      <a
                        className=" text-decoration-none fs-5 text-danger"
                        href="https://cookpad-rgcu6zmhw-dineshs-projects-9703b79e.vercel.app/"
                      >
                        visit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.6 }}
            className=" p-4 d-lg-flex gap-2"
          >
            <div
              className="border overflow-hidden text-center pt-3 fw-bold rounded-2 cursor"
              style={{
                objectFit: "contain",
                minWidth: "350px",
                height: "250px",
                backgroundImage: `url(${todo})`,
                color: "white",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className="rounded-3 bg-opacity-25 h-100 w-100 text-light translate-up"
                style={{
                  backgroundColor: "rgba(44, 235, 235, 0.4)",

                  transition: "transform 0.5s ease",
                }}
              >
                <div className="border h-100 d-flex justify-content-center align-items-center">
                  <div>
                    <div>This is an app to set appointments</div>
                    <div className="text-danger">visit</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className=" bg-light"
        style={{ height: "90vh", paddingTop: "15px" }}
      >
        <div className="text-center dancing-script skillscolor fs-1  fw-bold">
          Contact
        </div>
        <motion.form
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.6 }}
          onSubmit={handleSubmit}
          className=" p-2 bg-secondary d-flex flex-column gap-2 contactwidth bg-opacity-50 m-auto rounded-3"
        >
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={data.name}
              className=" form-control"
              placeholder="Enter your Name"
              required
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={data.email}
              onChange={handleChange}
              className=" form-control"
              placeholder="Enter your Email"
              name="email"
              required
            ></input>
          </div>
          <div>
            <label>subject</label>
            <input
              type="text"
              value={data.subject}
              onChange={handleChange}
              className=" form-control"
              placeholder="Enter subject here"
              name="subject"
              required
            ></input>
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={data.message}
              className="form-control"
              onChange={handleChange}
              placeholder="Enter message here"
              name="message"
              required
              rows="4" // Adjust the number of rows as needed
            ></textarea>
          </div>
          <div className=" text-end mt-3">
            <button className=" btn btn-info w-50">Send</button>
          </div>
        </motion.form>
        {loading && (
          <div className=" m-auto align-items-center d-flex justify-content-center">
            <div
              className=" text-white fw-bold loading position-absolute d-flex align-items-center  justify-content-center  bg-opacity-25 w-50 text-center m-auto rounded-3 "
              style={{ height: "200px" }}
            >
              <span class="loader"></span>
            </div>
          </div>
        )}
      </section>
      <div
        className=" text-secondary position-absolute w-100  mb-3 ps-3   "
        style={{ fontSize: "13px", marginTop: "-20px" }}
      >
        @2024 dinesh veeravalli.All rights reserved
      </div>
    </div>
  );
}

export default App;
