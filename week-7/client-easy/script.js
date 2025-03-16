const backendURL = "http://localhost:3000"; // or your deployed backend

let adminToken = "";
let userToken = "";

// Admin Functions
async function adminSignup() {
  const username = document.getElementById("admin-username").value;
  const password = document.getElementById("admin-password").value;

  const res = await fetch(`${backendURL}/admin/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  alert(data.message);
  if (data.token) adminToken = data.token;
}

async function adminLogin() {
  const username = document.getElementById("admin-username").value;
  const password = document.getElementById("admin-password").value;

  const res = await fetch(`${backendURL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      username,
      password,
    },
  });

  const data = await res.json();
  alert(data.message);
  if (data.token) adminToken = data.token;
}

async function createCourse() {
  const title = document.getElementById("course-title").value;
  const description = document.getElementById("course-desc").value;
  const price = parseFloat(document.getElementById("course-price").value);
  const imageLink = document.getElementById("course-image").value;

  const res = await fetch(`${backendURL}/admin/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      title,
      description,
      price,
      imageLink,
      published: true,
    }),
  });

  const data = await res.json();
  alert(data.message);
}

async function getAllCourses() {
  const res = await fetch(`${backendURL}/admin/courses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const data = await res.json();
  const coursesDiv = document.getElementById("admin-courses");
  coursesDiv.innerHTML = "<h3>All Courses</h3>";

  data.courses.forEach(course => {
    coursesDiv.innerHTML += `
      <div class="course-card">
        <h4>${course.title}</h4>
        <img src="${course.imageLink}" alt="${course.title}" />
        <p>${course.description}</p>
        <p>Price: ₹${course.price}</p>
      </div>
    `;
  });
}

// User Functions
async function userSignup() {
  const username = document.getElementById("user-username").value;
  const password = document.getElementById("user-password").value;

  const res = await fetch(`${backendURL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  alert(data.message);
  if (data.token) userToken = data.token;
}

async function userLogin() {
  const username = document.getElementById("user-username").value;
  const password = document.getElementById("user-password").value;

  const res = await fetch(`${backendURL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      username,
      password,
    },
  });

  const data = await res.json();
  alert(data.message);
  if (data.token) userToken = data.token;
}

async function listCourses() {
  const res = await fetch(`${backendURL}/users/courses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const data = await res.json();
  const userCoursesDiv = document.getElementById("user-courses");
  userCoursesDiv.innerHTML = "<h3>Available Courses</h3>";

  data.courses.forEach(course => {
    userCoursesDiv.innerHTML += `
      <div class="course-card">
        <h4>${course.title}</h4>
        <img src="${course.imageLink}" alt="${course.title}" />
        <p>${course.description}</p>
        <p>Price: ₹${course.price}</p>
        <button onclick="purchaseCourse('${course._id}')">Purchase</button>
      </div>
    `;
  });
}

async function purchaseCourse(courseId) {
  const res = await fetch(`${backendURL}/users/courses/${courseId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const data = await res.json();
  alert(data.message);
}

async function listPurchasedCourses() {
  const res = await fetch(`${backendURL}/users/purchasedCourses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  const data = await res.json();
  const purchasedDiv = document.getElementById("purchased-courses");
  purchasedDiv.innerHTML = "<h3>Purchased Courses</h3>";

  data.purchasedCourses.forEach(course => {
    purchasedDiv.innerHTML += `
      <div class="course-card">
        <h4>${course.title}</h4>
        <img src="${course.imageLink}" alt="${course.title}" />
        <p>${course.description}</p>
      </div>
    `;
  });
}