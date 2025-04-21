export default function PaymentTable({ performances, onPaymentChange }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead className="bg-gray-100 text-left text-sm text-gray-800">
            <tr>
              <th className="p-3">Előadás címe</th>
              <th className="p-3">Fizetési állapot</th>
            </tr>
          </thead>
          <tbody>
            {performances.map((perf, index) => (
              <tr
                key={perf.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-t`}
              >
                <td className="p-3 font-medium">{perf.title}</td>
                <td className="p-3">
                  <select
                    value={perf.payment}
                    onChange={(e) => onPaymentChange(perf.id, e.target.value)}
                    className="border rounded px-3 py-1 text-sm w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="NOT_PAID">❌ Nincs fizetve</option>
                    <option value="PAID_PARTIAL">💰 Előleg fizetve</option>
                    <option value="PAID_FULL">✅ Teljesen kifizetve</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  