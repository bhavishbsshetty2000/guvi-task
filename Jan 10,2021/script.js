fetch(
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
)
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    userdata(data);
  });

var userdata = (users) => {
  const listele = document.getElementById("list");
  const paginationele = document.getElementById("pageno");

  let currentpg = 1;
  let previouspage = 1;
  let rows = 10;

  let displaypg = (items, wrapper, rowsperpage, page) => {
    wrapper.innerHTML = "";
    page--;

    let start = rowsperpage * page;
    let end = start + rowsperpage;
    let paginatedItems = items.slice(start, end);

    console.log(paginatedItems);

    for (let i = 0; i < paginatedItems.length; i++) {
      let item =
        "Id:" +
        paginatedItems[i].id +
        "\n Name:" +
        paginatedItems[i].name +
        "\nEmail:" +
        paginatedItems[i].email;
      let itemele = document.createElement("div");
      itemele.classList.add("item");
      itemele.innerText = item;

      wrapper.appendChild(itemele);
    }
  };

  let paginationBar = (items, wrapper, rowsperpage) => {
    wrapper.innerHTML = "";
    let pageCount = Math.ceil(items.length / rowsperpage);
    console.log(items.length);
    for (let i = 0; i < pageCount + 1; i++) {
      let btn = PaginationButton(i, items);

      wrapper.appendChild(btn);
    }
  };

  function PaginationButton(page, items) {
    let button = document.createElement("button");
    if (page === 0) {
      button.innerText = "PREVIOUS";
    } else if (page === 1) {
      button.innerText = "FIRST";
    } else {
      button.innerText = page;
    }

    if (currentpg == page) button.classList.add("active");

    button.addEventListener("click", function () {
      if (page != 0) {
        currentpg = page;
      } else {
        if (currentpg > 1) currentpg = currentpg - 1;
        else currentpg = 1;
      }
      // console.log(currentpg, previouspage);

      displaypg(items, listele, rows, currentpg);

      let currentbtn = document.querySelector(".pagenum button.active");

      currentbtn.classList.remove("active");

      button.classList.add("active");
    });

    return button;
  }

  displaypg(users, listele, rows, currentpg);
  paginationBar(users, paginationele, rows);
};
