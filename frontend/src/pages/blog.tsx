import { Search, Calendar, User, ArrowRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "10 Football Tips to Improve Your Game",
    category: "Football",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80",
    author: "Admin",
    date: "July 2026",
    description:
      "Learn essential football techniques to improve your passing, shooting, and teamwork.",
  },
  {
    id: 2,
    title: "How to Build a Winning Cricket Team",
    category: "Cricket",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=900&q=80",
    author: "Admin",
    date: "July 2026",
    description:
      "Discover strategies for selecting players and creating a balanced cricket squad.",
  },
  {
    id: 3,
    title: "Preparing for Your First Tournament",
    category: "Tournament",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    author: "Admin",
    date: "July 2026",
    description:
      "Everything you need to know before participating in your first sports tournament.",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Hero */}
      <section className="bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">

          <h1 className="text-5xl font-black">
            Sports Blog
          </h1>

          <p className="mt-4 text-lg text-cyan-100">
               <span className="text-white font-serif ">
            Sports news, tips, tournaments and community stories.
            </span>
          </p>

          <div className="relative mx-auto mt-10 max-w-xl">

            <Search className="absolute left-4 top-3 text-gray-500" />

            <input
              type="text"
              placeholder="Search articles..."
              className="w-full rounded-full border bg-white py-3 pl-12 pr-4 text-black shadow-lg outline-none"
            />

          </div>

        </div>
      </section>

      {/* Featured Blog */}

      <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-slate-900 md:grid md:grid-cols-2">

          <img
            src={blogs[0].image}
            alt={blogs[0].title}
            className="h-80 w-full object-cover"
          />

          <div className="flex flex-col justify-center p-8">

            <span className="w-fit rounded-full bg-cyan-100 px-4 py-1 text-sm font-semibold text-cyan-700">
              Featured
            </span>

            <h2 className="mt-4 text-4xl font-bold dark:text-white">
              {blogs[0].title}
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {blogs[0].description}
            </p>

            <button className="mt-8 flex w-fit items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700">
              Read Article
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </section>

      {/* Latest Blogs */}

      <section className="mx-auto max-w-6xl px-6 pb-20">

        <h2 className="mb-10 text-4xl font-bold dark:text-white">
          Latest Articles
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {blogs.map((blog) => (

            <div
              key={blog.id}
              className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900"
            >

              <img
                src={blog.image}
                alt={blog.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  {blog.category}
                </span>

                <h3 className="mt-4 text-2xl font-bold dark:text-white">
                  {blog.title}
                </h3>

                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {blog.description}
                </p>

                <div className="mt-5 flex items-center justify-between text-sm text-gray-500">

                  <div className="flex items-center gap-2">
                    <User size={16} />
                    {blog.author}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {blog.date}
                  </div>

                </div>

                <button className="mt-6 flex items-center gap-2 font-semibold text-cyan-600 hover:text-cyan-700">
                  Read More
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Newsletter */}

      <section className="pb-20 px-6">

        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-10 text-center text-white">

          <h2 className="text-3xl font-bold">
            Never Miss a Sports Update
          </h2>

          <p className="mt-3 text-cyan-100">
            Subscribe to receive sports news, tournament announcements,
            and training tips.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl p-4 text-black outline-none"
            />

            <button className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 hover:bg-slate-100">
              Subscribe
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}