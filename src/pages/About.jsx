import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function About() {
  return (
    <>
      <Navigation />
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          margin: "5px auto",
        }}
      >
        <h1>About</h1>
        <p>
          Welcome to my project! This is a full stack web application that I
          created to explore and improve my skills in web development. It
          showcases my passion for building interactive and responsive web apps
          using modern technologies like React, Express.js and MongoDB.
        </p>
        <p>
          You can find the source code for this project on GitHub, and feel free
          to check out my portfolio to see more of my work.
        </p>
        <ul>
          <li>
            <Link
              to='https://github.com/Abhinav-Chdhary/crispy-sniffle'
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: "blue", textDecoration: "none" }}
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              to='https://abhinav-chdhary.github.io/my-portfolio/'
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: "blue", textDecoration: "none" }}
            >
              Portfolio
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
