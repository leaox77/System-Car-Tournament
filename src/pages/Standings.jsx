import React from 'react';

const Standings = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-accent mb-8">Standings</h1>
      <div className="space-y-12">
        {['First', 'Second', 'Third'].map((division) => (
          <div key={division} className="bg-primary/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-light mb-4">{division} Division</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4">Position</th>
                    <th className="py-3 px-4">Photo</th>
                    <th className="py-3 px-4">Car Name</th>
                    <th className="py-3 px-4">Points</th>
                    <th className="py-3 px-4">Streak</th>
                    <th className="py-3 px-4">Recent Changes</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4" colSpan="7">No data available yet.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Standings;