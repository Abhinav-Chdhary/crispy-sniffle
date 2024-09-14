import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function About() {
  return (
    <>
      <Navigation />
      <div className='p-6 font-sans mx-auto my-5 max-w-3xl'>
        <h1 className='text-4xl font-bold mb-4'>About</h1>
        <p className='mb-4 text-2xl'>
          Welcome to my project! This is a full stack web application that I
          created to explore and showcase my skills in web development. It
          showcases my predilection for building interactive and responsive web apps
          using modern technologies like React, Express.js and MongoDB.
        </p>
        <p className='mb-4 text-2xl'>
          You can find the source code for this project on GitHub, and feel free
          to check out my portfolio to see more of my work.
        </p>
        <ul className='list-disc list-inside text-2xl'>
          <li>
            <Link
              to='https://github.com/Abhinav-Chdhary/crispy-sniffle'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline hover:text-blue-700'
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              to='https://abhinav-chdhary.github.io/my-portfolio/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline hover:text-blue-700'
            >
              Portfolio
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
