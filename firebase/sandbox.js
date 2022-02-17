import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
  doc,
  setDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAcdVxjesLmSjDcSiYe5ZdFnmH3CQYg3I",
  authDomain: "decbatchpractice.firebaseapp.com",
  projectId: "decbatchpractice",
  storageBucket: "decbatchpractice.appspot.com",
  messagingSenderId: "1065403766984",
  appId: "1:1065403766984:web:0808517baba630dac82dfd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Initialize
const db = getFirestore(app);
const list = document.querySelector("ul");
const form = document.querySelector("form");

const addRecipe = (recipe) => {
  let html = `
    <li>
        <div>${recipe.foodTitle}</div>
        <div>${recipe.time.toDate()}</div>
    </li>
    `;

  list.innerHTML += html;
  console.log(html);
};

async function getRecipes(db) {
  const recipesCol = collection(db, "recipes");
  const recipeSnapshot = await getDocs(recipesCol);
  const recipeList = recipeSnapshot.docs.map((recipe) => {
    console.log("getRecipes -> recipe.data()", recipe.data());
    addRecipe(recipe.data());
  });

  return recipeList;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const now = new Date();
  const recipe = {
    foodTitle: form.recipe.value,
    time: Timestamp.fromDate(now),
  };

  const docRef = await addDoc(collection(db, "recipes"), recipe);
});

const recipes = await getRecipes(db);
console.log(recipes);
