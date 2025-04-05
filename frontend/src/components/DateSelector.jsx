const availableDates = ["2025-04-18", "2025-04-25", "2025-05-02", "2025-05-09"];

export default function DateSelector({ selectedDate, setSelectedDate }) {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Válassz időpontot</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {availableDates.map((date) => {
          const formatted = new Date(date).toLocaleDateString("hu-HU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          const isSelected = selectedDate === date;

          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              type="button"
              className={`px-6 py-3 rounded-xl border font-medium transition ${
                isSelected
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:border-black"
              }`}
            >
              {formatted}
            </button>
          );
        })}
      </div>
    </section>
  );
}
