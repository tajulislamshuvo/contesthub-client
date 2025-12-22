import React from 'react';
import Spinner from '../Spinner/Spinner';

const WinnerCard = ({ winner }) => {

  const inspirations = [
    "Won a ContestHub challenge through skill and dedication.",
    "Proved talent by competing and winning on ContestHub.",
    "Turned creativity into victory on ContestHub.",
    "Earned recognition by standing out among competitors.",
    "Success achieved through fair competition on ContestHub.",
    "Demonstrated excellence in a live ContestHub contest.",
    "From participation to winning — a ContestHub success story.",
    "Achievement unlocked by competing with top talents.",
    "Victory earned through effort and smart strategy.",
    "Another example of success within the ContestHub community."
  ]

  const getRandomInspiration = () => {
    return inspirations[Math.floor(Math.random() * inspirations.length)];
  };





  return (
    <div>


      <div className="bg-white rounded-xl shadow-md p-5 w-full 
                hover:shadow-lg transition
                border-t-4 border-blue-600">

        {/* Winner Label */}
        <p className="text-xs text-blue-500 font-medium mb-1">
          Contest Winner
        </p>

        {/* Email */}
        <h3 className="text-blue-700 font-semibold text-base md:text-lg break-all">
          {winner.participantEmail}
        </h3>

        {/* Inspiration */}
        <p className="text-gray-600 text-sm mt-3 italic leading-relaxed">
          “{getRandomInspiration()}”
        </p>
      </div>
    </div>
  );
};

export default WinnerCard;