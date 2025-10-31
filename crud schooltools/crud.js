const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const badges = document.getElementById("badgetotal");
const count = document.getElementById("count");
const category = document.getElementById("category");
const btncreate = document.getElementById("btncreate");
const inputsearch = document.getElementById("inputsearch");
const btnsearch = document.getElementById("btnsearchtitle");
const btntitle = document.getElementById("btnsearchtitle");
const btncategory = document.getElementById("btnsearchcategory");
const btndelete = document.getElementById("btnDelete");
const tables = document.getElementById("tablebody");
const btnedit = document.querySelector(".btnedit");
const btndeletearry = document.getElementById("btnDelete");
const btnedits = document.getElementById("btneditss");
let nameindex;

let arry = [];
let arrayvalid = [
  "سكيتش 80 ورقه",
  "سكيتش 180 ورقه",
  "pronto7.0mm",
  "rorto 1.0mm",
  "لانش بوكس",
  "prima color",
  "برايه",
  "جلاد",
  "قلم صبوره",
  "الوان خشب",
  "prima flash med",
];
if (localStorage.getItem("products")) {
  arry = JSON.parse(localStorage.getItem("products"));
  display();
}

arrayvalid.forEach((item) => {
  const option = document.createElement("option");
  option.value = item;
  option.textContent = item;
  title.appendChild(option);
});
let cat = {
  notebook: ["سكيتش 80 ورقه", "سكيتش 180 ورقه"],
  pens: ["pronto7.0mm", "rorto 1.0mm"],
  penscolor: ["prima color", "prima flash med"],
  markers: ["قلم صبوره", "الوان خشب"],
  pencilsharpener: ["برايه"],
  cover: ["جلاد"],
};

let costs = {
  7.5: ["برايه", "الوان خشب"],
  15: ["prima flash med"],
  2.5: ["pronto7.0mm", "rorto 1.0mm"],
  8: ["قلم صبوره"],
  10: ["prima color"],
  25: ["لانش بوكس"],
  13: ["سكيتش 80 ورقه", "جلاد"],
};

isfield = true;

title.addEventListener("change", () => {
  if (arrayvalid.includes(title.value)) {
    title.classList.remove("is-invalid");
    title.classList.add("is-valid");
    if (costs["7.5"].includes(title.value)) price.value = 7.5;
    else if (costs["13"].includes(title.value)) price.value = 13;
    else if (costs["8"].includes(title.value)) price.value = 8;
    else if (costs["25"].includes(title.value)) price.value = 25;
    else if (costs["15"].includes(title.value)) price.value = 15;
    else if (costs["2.5"].includes(title.value)) price.value = 2.5;
    else if (costs["10"].includes(title.value)) price.value = 10;
    else price.value = "";
    if (price.value != "") {
      price.classList.remove("is-invalid");
      price.classList.add("is-valid");
    } else {
      price.classList.remove("is-valid");
      price.classList.add("is-invalid");
    }

    if (cat.cover.includes(title.value)) category.value = "cover";
    else if (cat.markers.includes(title.value)) category.value = "markers";
    else if (cat.notebook.includes(title.value)) category.value = "notebook";
    else if (cat.pens.includes(title.value)) category.value = "pens";
    else if (cat.pencilsharpener.includes(title.value))
      category.value = "pencilsharpener";
    else if (cat.penscolor.includes(title.value)) category.value = "pens color";
    else category.value = "";
    if (category.value != "") {
      category.classList.remove("is-invalid");
      category.classList.add("is-valid");
    } else {
      category.classList.remove("is-valid");
      category.classList.add("is-invalid");
    }
  } else {
    title.classList.remove("is-valid");
    title.classList.add("is-invalid");
  }
});

function totals() {
  let prices = +price.value;
  let taxess = +taxes.value;
  let adss = +ads.value;
  let descounts = discount.value;
  let counts = +count.value;
  if (price.value != "") {
    let subtotal = prices + taxess + adss;
    let discountvalue = subtotal * (descounts / 100);
    let result = subtotal - discountvalue;
    let text = badges.textContent;
    badges.innerHTML = "totals:" + result * counts;
    badges.classList.remove("bg-danger");
    badges.classList.add("bg-success");
  } else {
    badges.innerHTML = "totals:";
    badges.classList.remove("bg-success");
    badges.classList.add("bg-danger");
  }
}
price.addEventListener("input", totals);
taxes.addEventListener("input", totals);
ads.addEventListener("input", totals);
count.addEventListener("input", totals);
discount.addEventListener("input", totals);

btncreate.addEventListener("click", () => {
  let products = {
    name: title.value,
    priceproduct: price.value,
    taxesproduct: taxes.value,
    adsproduct: ads.value,
    discountproducts: discount.value,
    totals: badges.textContent,
    productcount: count.value,
    catproducts: category.value,
  };

  if (
    title.value.trim() !== "" &&
    price.value.trim() !== "" &&
    taxes.value.trim() !== "" &&
    ads.value.trim() !== "" &&
    discount.value.trim() !== "" &&
    count.value.trim() !== "" &&
    category.value.trim() !== ""
  ) {
    arry.push(products);
    localStorage.setItem("products", JSON.stringify(arry));
  } else {
    alert("⚠️ من فضلك املأ جميع الحقول قبل الإضافة");
  }
  clear();
  display();
});

function display() {
  let box = "";
  for (let i = 0; i < arry.length; i++) {
    box += `
<tr>
      <th scope="row">${i + 1}</th>
      <td>${arry[i].name}</td>
      <td>${arry[i].priceproduct}</td>
      <td>${arry[i].taxesproduct}</td>
      <td>${arry[i].adsproduct}</td>
      <td>${arry[i].discountproducts}%</td>
      <td>${arry[i].totals}</td>
      <td>${arry[i].productcount}</td>
      <td>${arry[i].catproducts}</td>
      <td scope="col"><button type="button" class="btn btn-warning btnedit" onclick="edit(${i})">EDIT</button></td>
      <td scope="col"><button type="button" class="btn btn-danger btndelete" onclick="remove(${i})">Warning</button></td>
    </tr>
`;
  }
  tables.innerHTML = box;
}
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  badges.textContent = "total:";
  badges.classList.add("bg-danger");
  count.value = "";
  category.value = "";
  title.value = "";
}
function edit(i) {
  title.value = arry[i].name;
  price.value = arry[i].priceproduct;
  taxes.value = arry[i].taxesproduct;
  ads.value = arry[i].adsproduct;
  discount.value = arry[i].discountproducts;
  count.value = arry[i].productcount;
  badges.textContent = arry[i].totals;
  category.value = arry[i].catproducts;
  nameindex = i;
  btncreate.classList.add("d-none");
  btnedits.classList.remove("d-none");
}
btnedits.addEventListener("click", () => {
  arry[nameindex] = {
    name: title.value,
    priceproduct: price.value,
    taxesproduct: taxes.value,
    adsproduct: ads.value,
    discountproducts: discount.value,
    totals: badges.textContent,
    productcount: count.value,
    catproducts: category.value,
  };
  localStorage.setItem("products", JSON.stringify(arry));
  display();
  clear();
  btnedits.classList.add("d-none");
  btncreate.classList.remove("d-none");
});
function remove(i) {
  arry.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(arry));
  display();
}

btnsearch.addEventListener("click", () => {
  const fields = inputsearch.value.toLowerCase();
  let box = "";
  for (let i = 0; i < arry.length; i++) {
    if (arry[i].name.toLowerCase().includes(fields)) {
      box += `
<tr>
      <th scope="row">${i + 1}</th>
      <td>${arry[i].name}</td>
      <td>${arry[i].priceproduct}</td>
      <td>${arry[i].taxesproduct}</td>
      <td>${arry[i].adsproduct}</td>
      <td>${arry[i].discountproducts}%</td>
      <td>${arry[i].totals}</td>
      <td>${arry[i].productcount}</td>
      <td>${arry[i].catproducts}</td>
      <td scope="col"><button type="button" class="btn btn-warning btnedit" onclick="edit(${i})">EDIT</button></td>
      <td scope="col"><button type="button" class="btn btn-danger btndelete" onclick="remove(${i})">Warning</button></td>
    </tr>
`;
    }
  }
  tables.innerHTML = box;
});

btncategory.addEventListener("click", () => {
  const fields = inputsearch.value.toLowerCase();
  let box = "";

  for (let i = 0; i < arry.length; i++) {
    if (arry[i].catproducts.toLowerCase().includes(fields)) {
      box += `<tr>
      <th scope="row">${i + 1}</th>
      <td>${arry[i].name}</td>
      <td>${arry[i].priceproduct}</td>
      <td>${arry[i].taxesproduct}</td>
      <td>${arry[i].adsproduct}</td>
      <td>${arry[i].discountproducts}%</td>
      <td>${arry[i].totals}</td>
      <td>${arry[i].productcount}</td>
      <td>${arry[i].catproducts}</td>
      <td scope="col"><button type="button" class="btn btn-warning btnedit" onclick="edit(${i})">EDIT</button></td>
      <td scope="col"><button type="button" class="btn btn-danger btndelete" onclick="remove(${i})">Warning</button></td>
    </tr>
`;
    }
  }
  tables.innerHTML = box;
});
btndeletearry.addEventListener("click", () => {
  localStorage.removeItem("products");
  arry = [];
  display();
});
