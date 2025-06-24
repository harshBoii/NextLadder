'use client';
import React from 'react';
import Link from 'next/link';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Online Learning",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60",
      description: "Exploring how technology is reshaping education and learning experiences.",
      link: "/blog/future-of-online-learning"
    },
    {
      id: 2,
      title: "Career Development Tips",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60",
      description: "Essential strategies for advancing your career in the digital age.",
      link: "/blog/career-development"
    },
    {
      id: 3,
      title: "Learning Success Stories",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60",
      description: "Inspiring stories of learners who transformed their lives through education.",
      link: "/blog/success-stories"
    }
  ];

  return (
    <div className="w-full h-[100vh] bg-[rgba(227,243,255,1)] px-4">
      <div className="flex justify-between items-center ml-[10vw] mb-8 mt-[2vh]">
        <div className="flex flex-wrap gap-2">
          <div
            className="px-3 py-1 text-sm rounded-full transition-colors text-sm absolute mt-[1vh]"
            style={{
              backgroundColor: 'rgba(219, 112, 147, 0.13)',
              color: 'rgba(219, 112, 147, 1)'
            }}
          >
            Blog Post
          </div>
        </div>
        <h2 className="font-sans text-4xl absolute mt-[24vh]  font-bold">Post Popular Post</h2>
        <Link 
          href="/blog"
          className="font-sans bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 mt-[5vh] transition-colors duration-300"
        >
          View All Articles
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-[15vh]">
        {/* Main Blog Card */}
        <div className=" h-[55vh] w-[40vw] mt-[3vh] ml-[10vw]">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-[41.8vh]">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60" 
                alt="Main Blog Post"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="font-sans text-2xl font-bold mb-4">The Evolution of Education Technology</h2>
              <p className="font-sans text-gray-600 mb-4">
                Discover how cutting-edge technology is revolutionizing the way we learn and teach in the modern world.
              </p>
            </div>
          </div>
        </div>

        {/* Side Blog Cards */}
        <div className="w-[35vw] mt-[3vh] flex flex-col h-[64vh] gap-15">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="flex">
                <div className="w-1/3">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <h3 className="font-sans text-xl font-semibold mb-2">{post.title}</h3>
                  <Link 
                    href={post.link}
                    className="font-sans text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
