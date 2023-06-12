let myLeads = []
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")


/*Get the leads from the localStorage - PS: JSON.parse()
Store it in a variable, leadsFromLocalStorage*/
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) //JSON.parse(text),text is the JSON string that you want to parse into a JavaScript object or value.

/*1. Check if leadsFromLocalStorage is truthy
2. If so, set myLeads to its value and call renderLeads()*/
if(leadsFromLocalStorage) { // or simply if(leadsFromLocalStorage){}
    myLeads = leadsFromLocalStorage;
    renderArray(myLeads);
}

inputBtn.addEventListener("click", function() {
    let newLead = inputEl.value //In JavaScript, the .value property is used to retrieve or set the current value of an input element, such as <input>, <textarea>, or <select>. It allows you to access the user-entered or programmatically set value of an input field.
    myLeads.push(newLead);
    inputEl.value = "";

    /*Save the myLeads array to localStorage
    PS: remember JSON.stringify(value): value: The value or object to be converted to a JSON string.
    can also be: localStorage.setItem("myLeads", JSON.stringify(myLeads))*/
    let save = JSON.stringify(myLeads)
    localStorage.setItem("myLeads", save)
    
    renderArray(myLeads);
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    renderArray(myLeads);
})


tabBtn.addEventListener("click", function() {
    // Grab the URL of the current tab! 
    chrome.tabs.query({ active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderArray(myLeads);
    })


})


function renderArray(AnArray) {
    let listItems = "";
    for(let i = 0; i < AnArray.length; i++) {
        /*method 1: 
        ulEl.innerHTML += "<li>" + myLeads[i] +"</li>" };
        */
        
        /*method 2: 
        const li = document.createElement("li");
        li.textContent = myLeads[i];
        ulEl.append(li);
        */
    
        /*method 3: use listItems to optimize method 1
        listItems += "<li>" + myLeads[i] + "</li>"
        */

        /*method 3-1: 
        listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        */

        /*method 3-2: use template string (Template literals), (`  `) and (${})
        to fomat in multiple lines and for readability */ 
        listItems +=`
        <li>
            <a target = "_blank" href = "${AnArray[i]}">
            ${AnArray[i]}</a>
        </li>`

    }
    ulEl.innerHTML = listItems;
}
