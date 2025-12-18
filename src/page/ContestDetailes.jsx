import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../Components/Spinner/Spinner";
import { useParams } from "react-router";

/* =======================
   Helper function (HOIST SAFE)
======================= */
function formatTime(ms) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const ContestDetailes = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState("");

  /* =======================
     Fetch contest
  ======================= */
  useEffect(() => {
    axiosSecure
      .get(`/contests/${id}`)
      .then((res) => {
        setContest(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  /* =======================
     Countdown Logic
  ======================= */
  useEffect(() => {
    if (!contest?.startTime || !contest?.endTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const start = new Date(contest.startTime).getTime();
      const end = new Date(contest.endTime).getTime();

      if (now < start) {
        setStatus("upcoming");
        setTimeLeft(formatTime(start - now));
      } else if (now >= start && now <= end) {
        setStatus("running");
        setTimeLeft(formatTime(end - now));
      } else {
        setStatus("ended");
        setTimeLeft("Contest Ended");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  if (loading) return <Spinner />;

  const {
    name,
    creatorEmail,
    description,
    image,
    instruction,
    participantsCount,
    price,
    prize,
    type,
    winner,
  } = contest;

  return (
    <div className="bg-[#f0f6ff] min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Image */}
        <img
          src={image}
          alt={name}
          className="w-full h-[350px] object-cover"
        />

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#0f1f3d]">
                {name}
              </h1>
              <p className="text-sm text-gray-600">
                Created by {creatorEmail}
              </p>
            </div>
            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700">
              {type}
            </span>
          </div>

          {/* Countdown */}
          <div className="bg-[#e2e8ff] p-4 rounded-xl text-center">
            <p className="text-sm text-gray-600">
              {status === "running" && "Contest ends in"}
              {status === "upcoming" && "Contest starts in"}
              {status === "ended" && "Status"}
            </p>
            <p className="text-xl font-bold text-[#0f1f3d]">
              {timeLeft}
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard title="Participants" value={participantsCount} />
            <InfoCard title="Entry Fee" value={`$${price}`} />
            <InfoCard title="Prize" value={`$${prize}`} />
          </div>

          {/* Description */}
          <Section title="Description">{description}</Section>

          {/* Instructions */}
          <Section title="Instructions">{instruction}</Section>

          {/* Winner */}
          {winner && (
            <div className="bg-green-100 border border-green-300 p-4 rounded-xl">
              🏆 <strong>Winner:</strong> {winner}
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            {status === "upcoming" && (
              <button
                disabled
                className="px-6 py-3 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed"
              >
                Upcoming
              </button>
            )}

            {status === "running" && (
              <button className="px-6 py-3 rounded-lg bg-[#0f1f3d] text-white hover:bg-[#1a2f5f]">
                Register & Pay
              </button>
            )}

            {status === "ended" && (
              <button
                disabled
                className="px-6 py-3 rounded-lg bg-gray-400 text-white cursor-not-allowed"
              >
                Registration Closed
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

/* =======================
   Reusable Components
======================= */
const InfoCard = ({ title, value }) => (
  <div className="bg-[#f0f6ff] p-4 rounded-xl text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold text-[#0f1f3d]">{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg font-semibold text-[#0f1f3d] mb-2">
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed">{children}</p>
  </div>
);

export default ContestDetailes;
