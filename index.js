function validate() {
    const inputAmount = document.querySelector("#autoSizingInputGroup").value;
    const inputDiscription = document.querySelector("#autoSizingInput").value;
    const inputCatagory = document.querySelector("#autoSizingSelect").value;
    if(!inputAmount){
        alert("invalid amount");
        return false;
    }
    if(!inputDiscription){
        alert("invalid discription");
        return false;
    }
    if(inputCatagory=="Choose Catagory"){
        alert("invalid catagory");
        return false;
    }
    else {
        return true;
    }
}
function showData(){
    const tbody = document.querySelector('tbody')
    let localData = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
    localData.forEach((element, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${element.amount}</td>
        <td style="white-space: normal; word-wrap: break-word;">${element.discription}</td>
        <td>${element.catagory}</td>
        <td>
            <button type="button" class="btn btn-info m-1" onclick="editData(${index})">Edit</button>
            <button type="button" class="btn btn-danger m-1" onclick="deleteData(${index})">Delete</button>
        </td>`
        tbody.appendChild(tr);
    });
}

document.onload = showData();
function handleFormSubmit(event){
    event.preventDefault();
    if(validate()==true){
        const expenseItems = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
        const amount = event.target.amount.value;
        const discription = event.target.discription.value;
        const catagory = event.target.catagory.value;

        const obj = {
            amount,
            discription,
            catagory
        }
        expenseItems.push(obj);
        localStorage.setItem("items", JSON.stringify(expenseItems));
        
        // display added data
        const tbody = document.querySelector('tbody')
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${obj.amount}</td>
        <td style="white-space: normal; word-wrap: break-word;">${obj.discription}</td>
        <td>${obj.catagory}</td>
        <td>
            <button type="button" class="btn btn-info m-1" onclick="editData(${expenseItems.length-1})">Edit</button>
            <button type="button" class="btn btn-danger m-1" onclick="deleteData(${expenseItems.length-1})">Delete</button>
        </td>`
        tbody.appendChild(tr);

        document.querySelector("#autoSizingInputGroup").value = "";
        document.querySelector("#autoSizingInput").value = "";
        document.querySelector("#autoSizingSelect").value = "Choose Catagory";
    }
}

function deleteData(index){
    let localData = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
    const tbody = document.querySelector('tbody')
    localData.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(localData));
    location.reload();
}

function editData(index){
    let localData = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
    let amountData = localData[index].amount;
    let discriptionData = localData[index].discription;
    let catagoryData = localData[index].catagory;

    document.querySelector("#autoSizingInputGroup").value = amountData;
    document.querySelector("#autoSizingInput").value = discriptionData;
    document.querySelector("#autoSizingSelect").value = catagoryData;
    
    document.querySelector('#add').style.display = 'none';
    document.querySelector('#update').style.display = 'block';
    document.querySelector('#update').addEventListener("click", () => {
        const inputAmount = document.querySelector("#autoSizingInputGroup").value;
        const inputDiscription = document.querySelector("#autoSizingInput").value;
        const inputCatagory = document.querySelector("#autoSizingSelect").value;

        localData[index].amount = inputAmount;
        localData[index].discription = inputDiscription;
        localData[index].catagory = inputCatagory;

        localStorage.setItem("items", JSON.stringify(localData));
        document.querySelector('#add').style.display = 'block';
        document.querySelector('#update').style.display = 'none';
        location.reload();
    })
}