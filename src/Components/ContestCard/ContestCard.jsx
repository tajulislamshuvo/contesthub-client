import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ContestCard = ({ contest, index }) => {
  return (

    <motion.div className="h-full" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut", }}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">

        {/* Contest Image */}
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-48 object-cover"
        />

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Name & Participants */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-[#0f1f3d]">
              {contest.name}
            </h2>
            <span className="text-sm text-gray-600 text-center bg-blue-100 px-2 py-1 rounded-full">
              {contest.participantsCount} Participants
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-4">
            {contest.description.length > 80
              ? `${contest.description.slice(0, 80)}...`
              : contest.description}
          </p>

          {/* Details Button */}
          <Link
            to={`/contest/${contest._id}`}
            className=" bg-[#e2e8ff] mt-auto text-center text-[#0f1f3d] font-semibold px-4 py-2 rounded-lg hover:bg-[#c7d6ff] transition-colors"
          >
            Details
          </Link>
        </div>
      </div>


    </motion.div>
  );
};

export default ContestCard;