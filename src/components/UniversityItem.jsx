import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/universityItem.css';

const UniversityItem = ({ university, handleDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClickDelete = () => {
    setIsDeleting(true);
    // Delay the deletion to allow animation to complete
    setTimeout(() => handleDelete(university.name), 300);
  };

  return (
    <div className={`university-item ${isDeleting ? 'deleting' : ''}`}>
      <h3>{university.name}</h3>
      <p>{university.country}</p>
      <div>
        <Link to={`/details/${encodeURIComponent(university.name)}`} state={{ university }} className="details-link">View Details</Link>
        <button onClick={handleClickDelete} className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default UniversityItem;
