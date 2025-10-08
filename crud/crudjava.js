var DivceName= document.getElementById("DeviceName");
var Divceprice= document.getElementById("DevicePrice");
var Divcemodel= document.getElementById("DeviceModel");
var Divcetype= document.getElementById("DeviceType");
var taxs=document.getElementById("Devicetaxs");
var ads=document.getElementById("Deviceads");
var descound=document.getElementById("Devicedescound");
var total=document.getElementById("Devicetotal");
var addproduct=document.getElementById("add");
var updateproduct=document.getElementById("update")
var table = document.getElementById("tablebody");
var alertname=document.getElementById("alertname")
var alert1=document.getElementsByClassName("alert")
var Devicelist=[];

if(localStorage.getItem("products")){
    Devicelist=JSON.parse(localStorage.getItem('products'));
    seenresult()
}

var searchInput=document.getElementById("search");

  function adddivces(){
    if(validationname()&&validationmodel()&&validationtype()){
       var Product={
          name:DivceName.value,
          price:Divceprice.value,
          taxss:taxs.value,
          adss:ads.value,
          descounds:descound.value,
          totals:total.textContent,
          model:Divcemodel.value,
          type:Divcetype.value,
    };
      Devicelist.push(Product);
      localStorage.setItem('products',JSON.stringify(Devicelist));
     
      seenresult();
      clearForm();
      alert1[0].classList.add("d-none");
    }
   else{
     alert1[0].classList.remove("d-none");
   }
       
}
var box;
function seenresult(){
     var box = "";
  for (var i = 0; i < Devicelist.length; i++) {
    box += `
          <tr>
              <th class="text-danger" scope="col">${i}</th>
              <td>${Devicelist[i].name}</td>
              <td>${Devicelist[i].price}</td>
              <td>${Devicelist[i].model}</td>
              <td>${Devicelist[i].type}</td>
              <td>${Devicelist[i].descounds}</td>
              <td>${Devicelist[i].adss}</td>
              <td>${Devicelist[i].totals}</td>
              <td>${Devicelist[i].taxss}</td>
              <td>
                <button class="btn btn-warning" onclick="editProduct(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn btn-danger" onclick="removeproduct(${i})"><i class="fa-solid fa-trash"></i></button>
                
              </td>
            </tr>
        `;
  }
    table.innerHTML=box;
}
function clearForm(){
    DivceName.value="";
    Divceprice.value="";
    Divcemodel.value="";
    Divcetype.value="";
}
function removeproduct(i) {
    Devicelist.splice(i,1);
    localStorage.setItem('products',JSON.stringify(Devicelist));
    seenresult();
}


function search(){
  var searchplace=searchInput.value.toLowerCase();
  box="";
  for(var i=0;i<Devicelist.length;i++){
    if(Devicelist[i].name.toLowerCase().includes(searchplace)){
      box+=`
        <tr>
              <th scope="row">${i}</th>
              <td>${Devicelist[i].name}</td>
              <td>${Devicelist[i].price}</td>
              <td>${Devicelist[i].model}</td>
              <td>${Devicelist[i].type}</td>
              <td>${Devicelist[i].descounds}</td>
              <td>${Devicelist[i].adss}</td>
              <td>${Devicelist[i].totals}</td>
              <td>${Devicelist[i].taxss}</td>
              <td>
                <button class="btn btn-warning"onclick="editProduct(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn btn-danger" onclick="removeproduct(${i})"><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>
      `;
    }
   
  }
   table.innerHTML=box;
}
var nameindex;
function editProduct(i){
  DivceName.value=Devicelist[i].name;
  Divceprice.value=Devicelist[i].price;
  Divcemodel.value=Devicelist[i].model;
  Divcetype.value=Devicelist[i].type;
   nameindex=i;
 addproduct.classList.add("d-none")
 updateproduct.classList.remove("d-none");
}
function updatedvices(){
Devicelist[nameindex]={
         name:DivceName.value,
          price:Divceprice.value,
          model:Divcemodel.value,
          type:Divcetype.value,
}
 localStorage.setItem('products',JSON.stringify(Devicelist));
seenresult()
clearForm();
  addproduct.classList.remove("d-none");
  updateproduct.classList.add("d-none");
}
function validationname(){
  var regex=/^(computer|laptop|playstation|harddisk|mouse|keyboard|rams)$/;
 var value=  DivceName.value.toLowerCase();
  if(regex.test(value)){
    DivceName.classList.remove("is-invalid");
    DivceName.classList.add("is-valid");
      alert1[1].classList.add("d-none")
      return true;
  }else{
    DivceName.classList.add("is-invalid");
    DivceName.classList.remove("is-valid");
      alert1[1].classList.remove("d-none");
      return false;
  }
}
function validationprice(){
  var regex=/^[1-9][0-9]{2,5}$/
  var pricevalue=Divceprice.value;
  if(regex.test(pricevalue)){
    Divceprice.classList.remove("is-invalid");
    Divceprice.classList.add("is-valid");
    alert1[2].classList.add("d-none");
    return true
  }else{
     Divceprice.classList.add("is-invalid");
    Divceprice.classList.remove("is-valid");
    alert1[2].classList.remove("d-none");
    return false
  }
}
function validationmodel(){
  var model={
    2018:["ps3","ddr3","hhd"],
    2019:["ps4","hp","dell","renovo","ssd","ddr3","electronic"],
    2020:["ps4","hp","dell","renovo","ssd","ddr3","usb"],
    2021:["ps4","hp","dell","renovo","ssd","ddr3","usb"],
    2022:["ps4","hp","dell","renovo","ssd","ddr3","m4"],
    2023:["ps4","hp","dell","renovo","ssd","ddr4","m4"],
    2024:["ps5","hp","dell","renovo","ssd","ddr4","belouthuth"],
    2025:["ps5","hp","dell","renovo","ssd","ddr4","belouthuth"],
  };
  var model1=Divcemodel.value;
  var type=Divcetype.value.toLowerCase();
  var modelsence=model[model1];
  if(modelsence.includes(type)){
    Divcemodel.classList.remove("is-invalid");
    Divcemodel.classList.add("is-valid");
    alert1[4].classList.add("d-none");
    return true
  }else{
    Divcemodel.classList.add("is-invalid");
    Divcemodel.classList.remove("is-valid");
    alert1[4].classList.remove("d-none");
    return false
  }
}
function validationtype(){
var VALIDNAME={
  computer: ["hp", "dell", "renovo"],
  laptop: ["hp", "dell", "renovo"],
  playstation: ["ps3", "ps4", "ps5"],
  harddisk: ["hhd","ssd"],
  rams:["ddr3","ddr4"],
  keyboard:["m4","usb"],
  mouse:["belouthuth","usb"]
};
var name=DivceName.value.toLowerCase();
var type=Divcetype.value.toLowerCase();
var allowed=VALIDNAME[name]
if(allowed.includes(type)){
   Divcetype.classList.remove("is-invalid");
    Divcetype.classList.add("is-valid");
    alert1[3].classList.add("d-none");
    return true
}else{
   Divcetype.classList.add("is-invalid");
    Divcetype.classList.remove("is-valid");
    alert1[3].classList.remove("d-none");
    return false
}
}
function gettotal(){
  if(Divceprice.value!=''){
    var value=(+Divceprice.value+ +taxs.value+ +ads.value)- +descound.value;
    total.innerHTML="Total:" + value;
    total.style.background="#040";
  }else{
    total.innerHTML="Total:"+"";
    total.style.background="rgba(230, 65, 65, 1)";
  }
    
}

