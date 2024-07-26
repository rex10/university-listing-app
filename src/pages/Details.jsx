import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/details.css';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { university } = location.state || {};

  if (!university) {
    return <p>University data not found.</p>;
  }

  return (
    <div className="details-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h1>{university.name}</h1>
      <p><strong>Country:</strong> {university.country}</p>
      <p><strong>Domain(s):</strong> {university.domains.join(', ')}</p>
      <p><strong>Website(s):</strong></p>
      <ul>
        {university.web_pages.map((website, index) => (
          <li key={index}><a href={website} target="_blank" rel="noopener noreferrer">{website}</a></li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
