import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://playground-b8b02-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shopListInDB = ref(database, "shoppingList")

const addButtonEl = document.getElementById("add-button")
const inputFieldEl = document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    console.log(inputValue)
    if(inputValue !== "")
    {
        push(shopListInDB, inputValue)
        clearInputFieldEl()
    }
})


onValue(shopListInDB, function(snapshot){

    if(snapshot.exists())
    {
        let itemsArray = Object.entries(snapshot.val())
        console.log(itemsArray)
        clearShoppingListEl()
        for(let i = 0; i < itemsArray.length; i++)
        {
            let currentItem = itemsArray[i]
            appendItemToListEl(currentItem)
        }
    }
    else
    {
        console.log('no items')
        shoppingListEl.innerHTML = `Feed me ヽ(≧Д≦)ノ`
    }

   


})


function appendItemToListEl(item)
{
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shoppingListEl.append(newEl)

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        console.log(exactLocationOfItemInDB)
        remove(exactLocationOfItemInDB)
    })
}

function clearShoppingListEl()
{
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl()
{
    inputFieldEl.value = ""
}