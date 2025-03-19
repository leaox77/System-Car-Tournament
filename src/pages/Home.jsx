import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Home = () => {
  const [news, setNews] = useState([]);
  const [winners, setWinners] = useState([]);
  const [champion, setChampion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNews, setNewNews] = useState({ title: '', content: '' });

  const handleAddNews = async () => {
    try {
      await axios.post('/api/news/add', newNews);
      // Refresh news after adding
      const response = await axios.get('/api/news');
      setNews(response.data);
      setNewNews({ title: '', content: '' });
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-accent">Tournament History</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded"
        >
          {isEditing ? 'View Mode' : 'Edit Mode'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-primary/20 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-light mb-4">Latest News</h2>
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="News Title"
                value={newNews.title}
                onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                className="w-full bg-dark text-white px-4 py-2 rounded"
              />
              <textarea
                placeholder="News Content"
                value={newNews.content}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                className="w-full bg-dark text-white px-4 py-2 rounded h-32"
              />
              <button
                onClick={handleAddNews}
                className="bg-accent text-dark px-4 py-2 rounded"
              >
                Add News
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {news.length > 0 ? (
                news.map((item, index) => (
                  <div key={index} className="border-b border-white/10 pb-4">
                    <h3 className="text-xl font-semibold text-accent">{item.title}</h3>
                    <p className="text-white/80">{item.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-white/80">No news available yet.</p>
              )}
            </div>
          )}
        </div>

        <div className="bg-primary/20 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-light mb-4">Recent Winners</h2>
          {winners.length > 0 ? (
            <div className="space-y-4">
              {winners.map((winner, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={winner.photo}
                    alt={winner.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-accent">{winner.name}</h3>
                    <p className="text-white/80">Race {winner.race}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/80">No winners to display yet.</p>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-light mb-6">Champion Car</h2>
        {champion ? (
          <div className="bg-primary/20 rounded-lg p-6">
            <div className="flex items-center space-x-8">
              <img
                src={champion.photo}
                alt={champion.name}
                className="w-64 h-64 object-cover rounded"
              />
              <div>
                <h3 className="text-3xl font-bold text-accent mb-2">{champion.name}</h3>
                <p className="text-xl text-white/80 mb-4">{champion.brand} - {champion.year}</p>
                <div className="space-y-2">
                  <p className="text-light">Championships: {champion.championships}</p>
                  <p className="text-light">Total Points: {champion.points}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-primary/20 rounded-lg p-6 text-center">
            <p className="text-white/80">No champion car selected yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;