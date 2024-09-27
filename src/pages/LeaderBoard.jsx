import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
const apiUrl = import.meta.env.VITE_API_URL;

export default function LeaderBoard() {
  const [leaders, setLeaders] = useState([]);

  const getListOfTopScorers = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/leaderboardList`, {
        method: "GET",
      });
      const data = await response.json();
      setLeaders(data.slice(0, 7));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListOfTopScorers();
  }, []);

  return (
    <>
      <Navigation />
      <div className='max-w-4xl mx-auto my-10 p-4 bg-gray-800 text-white rounded-lg shadow-lg mb-9'>
        <h1 className='text-4xl font-bold mb-4 text-center'>LeaderBoard</h1>
        {leaders.length > 0 ? (
          <ul className='space-y-4'>
            {leaders.map((leader, index) => (
              <li
                key={index}
                className='flex justify-between bg-gray-700 p-4 rounded-md shadow-md'
              >
                <span className='text-xl font-semibold'>{leader.username}</span>
                <span className='text-xl text-yellow-400'>
                  {leader.highScore}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-lg text-gray-400'>
            Please come back later
          </p>
        )}
      </div>
    </>
  );
}
