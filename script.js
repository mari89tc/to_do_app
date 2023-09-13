window.addEventListener("load", sidenVises);
function sidenVises() {
  console.log("sidenVises");
}

const localList = JSON.parse(localStorage.getItem("tasks"));
console.log("her er det", localList);

let allItems = [];
if (localList !== null) {
  allItems = localList;
  displayList();
}
document.querySelector("#addBut").addEventListener("click", addToTheList);

function addToTheList(evt) {
  evt.preventDefault();
  console.log("tilføj til listen");
  let itemInput = document.querySelector("#title").value;
  let numInput = document.querySelector("#number").value;
  console.log(itemInput);
  console.log(numInput);
  const temp = {};
  temp.id = crypto.randomUUID();
  temp.item = itemInput;
  temp.num = numInput;
  temp.done = false;
  allItems.push(temp);
  displayList();
}

function displayList() {
  document.querySelector("#showTem").innerHTML = "";
  document.querySelector("#doneTem").innerHTML = "";
  allItems.forEach((todoItem) => {
    const clone = document.querySelector("template#temOutput").content.cloneNode(true);
    clone.querySelector("#outputAll").dataset.id = todoItem.id;
    clone.querySelector("#textfield").textContent = todoItem.item;
    clone.querySelector("#numfield").textContent = todoItem.num;
    clone.querySelector("#check").checked = todoItem.done;
    clone.querySelector("#outputAll").addEventListener("click", removeClone);
    if (todoItem.done) {
      document.querySelector("#doneTem").appendChild(clone);
      localStorage.setItem("list", "");
    } else {
      document.querySelector("#showTem").appendChild(clone);
      localStorage.setItem("list", "");
    }

    function checkedFunc(evt) {
      evt.preventDefault();
      console.log("QW", evt.target);
      todoItem.done = !todoItem.done;
      displayList();
    }

    function removeClone(evt) {
      console.log("target", evt.target);
      console.log("currenttarget", evt.currentTarget);
      const theTarget = evt.target;
      if (theTarget.getAttribute("id") === "removeItem") {
        console.log(evt.currentTarget.dataset.id);

        console.log(
          "her er det",
          allItems.findIndex((e) => e.id === evt.currentTarget.dataset.id)
        );
        const index = allItems.findIndex((e) => e.id === evt.currentTarget.dataset.id);
        allItems.splice(index, 1);
      } else if (theTarget.getAttribute("id") === "check") {
        checkedFunc(evt);
      }
      displayList();
    }
  });

  localStorage.setItem("tasks", JSON.stringify(allItems));

  console.log(allItems);
}
