let list_tugas = [""];

const output_element = document.querySelector("#output");

function renderTasks() {
  output_element.innerHTML = "";
  list_tugas.forEach((value, index) => {
    const p_elm = document.createElement("p");
    p_elm.textContent = value;

    p_elm.addEventListener("click", () => {
      list_tugas.splice(index, 1);
      renderTasks();
    });

    output_element.appendChild(p_elm);
  });
}

renderTasks();

const formulir = document.querySelector("form");

formulir.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const obj = Object.fromEntries(formData);

  if (obj.tugas) {
    list_tugas.push(obj.tugas);
    renderTasks();
  }

  e.target.reset();
});