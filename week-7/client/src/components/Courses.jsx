import React, { useState } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  async function fetchCourses() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/users/courses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(response.data.courses);
    } catch (error) {
      alert('Failed to fetch courses');
      console.error(error);
    }
  }

  async function purchaseCourse(courseId) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:3000/users/courses/${courseId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data.message);
    } catch (error) {
      alert('Purchase failed');
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={fetchCourses}>Get All Courses</button>

      <div className="courses">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <img src={course.imageLink} alt={course.title} />
            <p>{course.description}</p>
            <p>₹ {course.price}</p>
            <button onClick={() => purchaseCourse(course._id)}>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
