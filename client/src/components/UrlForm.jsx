import React, { useState } from 'react';
import axios from 'axios';

const UrlForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:3000/shorten', {
      original_url: originalUrl,
    });
    setShortUrl(res.data.short_url);
  };

  return (
    <div className="p-10">
      <h1 className='typewriter'>Url Shortner ⛓️‍💥</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="border p-2 w-full"
        />
        <button className="bg-blue-500 text-white px-4 py-2">Shorten</button>
      </form>
      {shortUrl && (
        <p className="mt-4">
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
    </div>
  );
};

export default UrlForm;
