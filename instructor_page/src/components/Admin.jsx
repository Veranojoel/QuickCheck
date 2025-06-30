import { useState } from 'react';
import './css/Admin.css';

function Admin() {
  const [mode, setMode] = useState('A');

  const lists = {
    A: ['Von Alphonse L. Godinez', 'Neilross Ulysses P. Pael', 'Barack Hussein Obama II'], // Instructors
    B: ['Monkey D. Luffy', 'Sydney Bernice Sweeney', 'Goku Kakarot'], // Students
  };

  return (
    <div className="app-container">
      {/* Left Section */}
      <div className="left-panel">
        {/* Filter Section */}
        <div className="top-left-filters">
          {mode === 'A' ? (
            // Instructor Filters
            <>
              <select className="filter-select">
                <option>Department</option>
                <option>Computer Science</option>
                <option>Mathematics</option>
                <option>Engineering</option>
              </select>
              <select className="filter-select">
                <option>Rank</option>
                <option>Professor</option>
                <option>Associate Prof</option>
                <option>Assistant Prof</option>
                <option>Lecturer</option>
              </select>
            </>
          ) : (
            // Student Filters
            <>
              <select className="filter-select">
                <option>Course</option>
                <option>BSCS</option>
                <option>BSIT</option>
                <option>BSIS</option>
              </select>
              <select className="filter-select">
                <option>Year Level</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
              <select className="filter-select">
                <option>Section</option>
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
              </select>
            </>
          )}
        </div>

        {/* List Section */}
        <div className="list-view">
          <ul>
            {lists[mode].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-panel">
        <div className="right-content">
          <div className="top-buttons">
            <div className="top-button-group">
              <span>Instructors</span>
              <button
                className={`small-round-btn ${mode === 'A' ? 'active' : ''}`}
                onClick={() => setMode('A')}
              />
            </div>
            <div className="top-button-group">
              <span>Students</span>
              <button
                className={`small-round-btn ${mode === 'B' ? 'active' : ''}`}
                onClick={() => setMode('B')}
              />
            </div>
          </div>

          <div className="side-buttons">
            <button className="big-btn">Edit</button>
            <button className="big-btn">Remove/Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;