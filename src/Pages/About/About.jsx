import about from "../../assets/About/about.jpg"
const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">About Product Hunt</h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        
        <div className="md:w-1/2">
          <img
            src={about}
            alt="Product Hunt Illustration"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        
        <div className="md:w-1/2">
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold">Product Hunt</span> is a modern platform for discovering and sharing the latest tech products, tools, and apps. Users can explore new innovations, give feedback, and upvote their favorite products.
          </p>

          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Our mission is to bring new ideas to the spotlight and help makers gain recognition for their work. If you're passionate about technology and startups, <span className="text-orange-500 font-semibold">Product Hunt</span> is the perfect place for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
