// auth.js

// Save user data to localStorage on registration
function registerUser(event) {
  event.preventDefault();

  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  if (!username || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.some(user => user.email === email);
  if (userExists) {
    alert("User already exists. Try logging in.");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! You can now log in.");
  window.location.href = "login.html";
}

// Validate login credentials
function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert(`Welcome back, ${user.username}!`);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials. Please try again.");
  }
}
// main.js

// Load featured recipes (static for now)
document.addEventListener("DOMContentLoaded", () => {
  const recipes = [
    {
      title: "Classic Italian Pasta",
      image: "assets/images/pasta.jpg"
    },
    {
      title: "Fresh Summer Salad",
      image: "assets/images/salad.jpg"
    },
    {
      title: "Chocolate Lava Cake",
      image: "assets/images/cake.jpg"
    }
  ];

  const recipeGrid = document.querySelector(".recipe-grid");

  if (recipeGrid) {
    recipeGrid.innerHTML = "";

    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";

      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" />
        <h3>${recipe.title}</h3>
      `;

      recipeGrid.appendChild(card);
    });
  }
});