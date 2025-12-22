import React from 'react';
const blogPosts = [
  {
    id: 1,
    title: "How to Win Contests on ContestHub",
    excerpt:
      "Learn proven strategies to stand out and win contests on ContestHub. From creative tips to submission timing, increase your chances of becoming a winner.",
    date: "2025-12-22",
    author: "ContestHub Team",
    category: "Tips & Tricks",
    featured: true,
  },
  {
    id: 2,
    title: "Top 5 Creative Contests This Month",
    excerpt:
      "Explore the most exciting contests on ContestHub and participate to win amazing rewards. Stay ahead of the competition by knowing what’s trending.",
    date: "2025-12-20",
    author: "ContestHub Team",
    category: "Trending",
  },
  {
    id: 3,
    title: "Maximizing Your Contest Submissions",
    excerpt:
      "Tips and tricks to improve your submissions and increase your chances of winning contests. Learn about presentation, creativity, and timing.",
    date: "2025-12-18",
    author: "ContestHub Team",
    category: "Guides",
  },
  {
    id: 4,
    title: "Top 3 Mistakes Beginners Make",
    excerpt:
      "Avoid common pitfalls when joining contests on ContestHub. Learn from past winners and improve your chances of success.",
    date: "2025-12-15",
    author: "ContestHub Team",
    category: "Guides",
  },
  {
    id: 5,
    title: "Behind the Scenes of ContestHub",
    excerpt:
      "Discover how we run contests, select winners, and ensure fairness. Transparency is key to building a strong creative community.",
    date: "2025-12-12",
    author: "ContestHub Team",
    category: "Community",
  },
];

const Blog = () => {
  const featuredPost = blogPosts.find((post) => post.featured);

  // Other posts
  const otherPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16 px-6 md:px-12 rounded-b-3xl shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ContestHub Blog
        </h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Stay updated with the latest contests, tips, and success stories
          from our ContestHub community. Learn, participate, and get inspired!
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10 border-t-4 border-blue-600 hover:shadow-xl transition">
            <p className="text-xs text-blue-500 font-medium mb-1">
              {featuredPost.category}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-3">
              {featuredPost.title}
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>By {featuredPost.author}</span>
              <span>{featuredPost.date}</span>
            </div>
          </div>
        )}

        {/* Grid of Other Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition border-t-4 border-blue-600"
            >
              <p className="text-xs text-blue-500 font-medium mb-1">
                {post.category}
              </p>
              <h3 className="text-lg font-semibold text-blue-700 mb-2 hover:underline cursor-pointer">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex justify-between text-gray-400 text-xs">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;