// Function to save the current state of the to-do list to localStorage
function saveList() {
  const items = [];
  document.querySelectorAll("li").forEach(li => {
      items.push({
          text: li.firstChild.textContent,
          done: li.classList.contains("done")
      });
  });
  localStorage.setItem("todoList", JSON.stringify(items));
}

// Function to load the to-do list from localStorage
function loadList() {
  const items = JSON.parse(localStorage.getItem("todoList")) || [];
  items.forEach(item => {
      const newLi = document.createElement("li");
      newLi.innerText = item.text;
      if (item.done) {
          newLi.classList.add("done");
      }
      const newButton = document.createElement("button");//add remove button back in
      newButton.innerText = "X";
      newButton.setAttribute("class", "remove");
      newLi.append(newButton);
      list.append(newLi);
  });
}

// Add new item to to-do list
const submit = document.querySelector(".submit");
const list = document.querySelector("ul"); // Define the 'list' variable
if (list) {
  submit.addEventListener("click", function(event) {
    event.preventDefault();
    const newLi = document.createElement("li");
    const newItem = document.querySelector("#item");
    newLi.innerText = newItem.value;
    if (newLi.innerText !== '') {list.append(newLi);
      
    // Add remove button
    const newButton = document.createElement("button");
    newButton.innerText = "X";
    newButton.setAttribute("class", "remove");
    newLi.append(newButton);
    newItem.value = '';}

    // Save the updated list to localStorage
    saveList();
  });

  // Remove item on clicking remove button
  list.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        event.target.parentElement.remove();
        saveList();
    }
  });

  // Cross item off list on click
  list.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("done");
        saveList();
    }
  });

  // Load the to-do list from localStorage when the page loads
  document.addEventListener("DOMContentLoaded", loadList);
}


//prevent submission of empty string