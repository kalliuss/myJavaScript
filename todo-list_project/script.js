const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


function addTask(){
    if(inputBox.value === ''){
        //madde yazılmadan add derse hata verecek.
        alert("Bir kaç şey yazman gerek !")
    }
    else{
        //maddeyi ekleme bölümü
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = ""; // madde ekledikten sonra input yazılı olan değeri sıfırlar
    saveData();
}


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked"); // . toggle olduğu için basınca check olacak tekrar basınca check kalkacak.
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove(); //. çarpıya basarsak silecek
        saveData();
        
    }

},false);

// tarayıcı yenilediğimizde / kapa aç yaptığımızda görevlerin silinmemesi için;

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// saveData() ile kaydettik. 

// web-sitesni tekrar açtığımızda verileri görüntülemek için; 

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();