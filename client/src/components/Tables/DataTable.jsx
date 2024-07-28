const dummyData = [
  {
    date: "2021-10-01",
    transactionId: "123456",
    program: "Free Clothes",
    amount: 1000,
    invoice: "INV-123456",
  },
  {
    date: "2021-10-02",
    transactionId: "123457",
    program: "Free Clothes",
    amount: 2000,
    invoice: "INV-123457",
  },
  {
    date: "2021-10-03",
    transactionId: "123458",
    program: "Free Clothes",
    amount: 3000,
    invoice: "INV-123458",
  },
  {
    date: "2021-10-04",
    transactionId: "123459",
    program: "Free Clothes",
    amount: 4000,
    invoice: "INV-123459",
  },
  {
    date: "2021-10-05",
    transactionId: "123460",
    program: "Free Clothes",
    amount: 5000,
    invoice: "INV-123460",
  },
  {
    date: "2021-10-06",
    transactionId: "123461",
    program: "Free Clothes",
    amount: 6000,
    invoice: "INV-123461",
  },
  {
    date: "2021-10-07",
    transactionId: "123462",
    program: "Free Clothes",
    amount: 7000,
    invoice: "INV-123462",
  },
  {
    date: "2021-10-08",
    transactionId: "123463",
    program: "Free Clothes",
    amount: 8000,
    invoice: "INV-123463",
  },
  {
    date: "2021-10-09",
    transactionId: "123464",
    program: "Free Clothes",
    amount: 9000,
    invoice: "INV-123464",
  },
  {
    date: "2021-10-10",
    transactionId: "123465",
    program: "Free Clothes",
    amount: 10000,
    invoice: "INV-123465",
  },
];
export default function DataTable({ data, headers, headerKeys }) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      scope="col"
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                      key={index}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.transactionId}>
                    {headers.map((header, index) => (
                      <td
                        className="px-6 py-4 whitespace-nowrap text-center"
                        key={index}
                      >
                        {item[headerKeys[header]]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
