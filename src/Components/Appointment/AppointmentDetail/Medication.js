import React, { useState } from "react";

function Medication({ appointmentId, oldMedication, setOldMedication }) {
  const [medication, setMedication] = useState([]);

  const handleChange = (event, index, type) => {
    let fileArr = [];
    if (type === "old") {
      fileArr = [...oldMedication];
    } else {
      fileArr = [...medication];
    }

    fileArr[index] = {
      ...fileArr[index],
      [event.target.name]: event.target.value,
    };
    if (type === "old") {
      setOldMedication(fileArr);
    } else {
      setMedication(fileArr);
    }
  };

  return (
    <>
      <h4 className="hepta-slab mb-4">Medication</h4>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-10">
        {medication.length + oldMedication.length > 0 && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 calibre-regular thead-bg">
              <tr>
                <th
                  scope="col"
                  className="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                >
                  Medicine Name
                </th>
                <th
                  scope="col"
                  className="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                >
                  Dosage
                </th>
                <th
                  scope="col"
                  className="dark-gray-color px-6 py-3 text-left font-18 uppercase tracking-wider"
                >
                  duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {oldMedication.map((medicine, index) => (
                <tr key={index}>
                  <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                    <p>{medicine.name}</p>
                  </td>
                  <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                    <p>{medicine.type}</p>
                  </td>
                  <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                    <p>{medicine.dosage}</p>
                  </td>
                  <td className="px-6 dark-gray-color py-2 whitespace-nowrap text-left font-18">
                    <p>{medicine.duration}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Medication;
