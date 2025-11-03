export default function AllDesserts({ desserts }) {
  return (
    <section className="border border-rose-400 p-6 rounded-2xl">
      <h3 className="text-rose-400 text-2xl mb-6">All our desserts!</h3>

      <ul className="flex flex-wrap -mx-2">
        {desserts.map((dessert) => (
          <li
            key={dessert.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4 box-border"
          >
            <div className="relative rounded-xl overflow-hidden bg-[#1b2033] transition-transform duration-300 ease-in-out hover:rotate-[10deg] hover:shadow-[0_0_20px_5px_rgba(255,255,100,0.6)] cursor-pointer">
              <img
                src={dessert.image.src}
                alt={dessert.image.alt}
                className="block w-full h-auto object-cover"
              />

              {/* Title overlay */}
              <div className="absolute bottom-2 left-2 bg-black/60 border border-rose-400 text-rose-200 text-sm px-3 py-1 rounded-md backdrop-blur-sm">
                {dessert.title}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}