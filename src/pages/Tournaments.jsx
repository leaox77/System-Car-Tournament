import React, { useState } from 'react';
import axios from 'axios';

const Tournaments = () => {
  const [races, setRaces] = useState(Array(25).fill(null));
  const [selectedRace, setSelectedRace] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    first: '',
    second: '',
    third: '',
    lastThree: ['', '', '']
  });

  const handleSaveResults = async (raceIndex) => {
    try {
      await axios.post('/api/results/update', {
        raceNumber: raceIndex + 1,
        results: {
          top3: [editForm.first, editForm.second, editForm.third],
          bottom3: editForm.lastThree
        }
      });
      // Refresh race data
      const response = await axios.get('/api/races');
      setRaces(response.data);
      setIsEditing(false);
      setSelectedRace(null);
    } catch (error) {
      console.error('Error updating results:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-accent">Tournament Dates</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {races.map((race, index) => (
          <div key={index} className="bg-primary/20 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-light">Race {index + 1}</h2>
              <button
                onClick={() => {
                  setSelectedRace(index);
                  setIsEditing(true);
                }}
                className="bg-secondary hover:bg-secondary/80 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
            </div>

            {selectedRace === index && isEditing ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-secondary mb-2">Top 3</h3>
                  <input
                    type="text"
                    placeholder="1st Place"
                    value={editForm.first}
                    onChange={(e) => setEditForm({ ...editForm, first: e.target.value })}
                    className="w-full bg-dark text-white px-3 py-2 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="2nd Place"
                    value={editForm.second}
                    onChange={(e) => setEditForm({ ...editForm, second: e.target.value })}
                    className="w-full bg-dark text-white px-3 py-2 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="3rd Place"
                    value={editForm.third}
                    onChange={(e) => setEditForm({ ...editForm, third: e.target.value })}
                    className="w-full bg-dark text-white px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <h3 className="text-secondary mb-2">Bottom 3</h3>
                  {editForm.lastThree.map((car, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`${i + 1} from last`}
                      value={car}
                      onChange={(e) => {
                        const newLastThree = [...editForm.lastThree];
                        newLastThree[i] = e.target.value;
                        setEditForm({ ...editForm, lastThree: newLastThree });
                      }}
                      className="w-full bg-dark text-white px-3 py-2 rounded mb-2"
                    />
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSaveResults(index)}
                    className="bg-accent text-dark px-4 py-2 rounded flex-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedRace(null);
                    }}
                    className="bg-primary text-white px-4 py-2 rounded flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-secondary mb-2">Top 3</h3>
                  {race?.top3?.length > 0 ? (
                    race.top3.map((car, i) => (
                      <p key={i} className="text-white/80">{`${i + 1}. ${car}`}</p>
                    ))
                  ) : (
                    <p className="text-white/80">No results yet</p>
                  )}
                </div>
                <div>
                  <h3 className="text-secondary mb-2">Bottom 3</h3>
                  {race?.bottom3?.length > 0 ? (
                    race.bottom3.map((car, i) => (
                      <p key={i} className="text-white/80">{`${race.bottom3.length - i}. ${car}`}</p>
                    ))
                  ) : (
                    <p className="text-white/80">No results yet</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tournaments;