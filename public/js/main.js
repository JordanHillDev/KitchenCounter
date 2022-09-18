const openAddItemsModal = document.querySelector("#openAddItemsModal");
const addItemModal      = document.querySelector("#addItemModal");
const createListBtn     = document.querySelector("#createListBtn")
const createListModal   = document.querySelector('#createListModal')
const closeModalBtns    = document.querySelectorAll(".closeBtn");
const selectCategory    = document.querySelector("#categoryFilter");
const dropdownBars      = document.querySelectorAll(".dropdownBar");
const decreaseBtns      = document.querySelectorAll('.decreaseBtn')
const increaseBtns      = document.querySelectorAll('.increaseBtn')
const submitUpdateBtns  = document.querySelectorAll('.submitInput')

if(openAddItemsModal) openAddItemsModal.addEventListener("click", openAddItemModal);
if(createListBtn)     createListBtn.addEventListener('click', openCreateListModal)
if(closeModalBtns)    closeModalBtns.forEach(el => el.addEventListener("click", closeModal))
if(selectCategory)    selectCategory.addEventListener("change", filterCategories);
if(dropdownBars)      dropdownBars.forEach(el => el.addEventListener("click", showDropdownContent));
if(decreaseBtns)      decreaseBtns.forEach(el => el.addEventListener('click', decreaseInputValue))
if(increaseBtns)      increaseBtns.forEach(el => el.addEventListener('click', increaseInputValue))
if(submitUpdateBtns)  submitUpdateBtns.forEach(el => el.addEventListener('click', updateInventory))

console.log(submitUpdateBtns[0].parentNode.action)

function openAddItemModal() {
    addItemModal.style.display = "flex";
}

function openCreateListModal() {
    createListModal.style.display = 'flex'
}

function closeModal(e) {
    const thisModal = e.target.parentNode
    thisModal.style.display = 'none'
}

function filterCategories(e) {
    const listContainer = document.querySelector("#listContainer");
    const dropdownBarsInThis = listContainer.querySelectorAll(".dropdownBar");
    const selectedValue = e.target.value;

    if (selectedValue === "all") {
        dropdownBarsInThis.forEach((el) => (el.style.display = ""));
    } else {
        const dropdownsToHide = [...dropdownBarsInThis].filter(
            (bars) => bars.id !== selectedValue
        );

        dropdownsToHide.forEach((el) => (el.style.display = "none"));
        document.querySelector(`#${selectedValue}`).style.display = "";
    }
}

function showDropdownContent(e) {
    const dropdownContent =
        e.target.parentNode.querySelector(".dropdownSection");
    const titleBar = e.target.parentNode.querySelector(".titleBar");
    const arrow = e.target.parentNode.querySelector(".arrow");

    titleBar.classList.toggle("underline");
    dropdownContent.classList.toggle("hidden");
    arrow.classList.toggle("rotate180");
}

function decreaseInputValue(e) {
    e.preventDefault()
    e.stopPropagation()
    const input = e.target.parentNode.querySelector('.numberInput')
    if(input.value > 0) {
        input.value = +input.value - 1;
    }
    timeoutInput(e)
}

function increaseInputValue(e) {
    e.preventDefault()
    e.stopPropagation()
    const input = e.target.parentNode.querySelector('.numberInput')
    input.value = +input.value + 1
    timeoutInput(e)
}

function timeoutInput(e) {
    if(!e.target.classList.contains("disabled")) {
        e.target.classList.add("disabled")
        setTimeout(() => e.target.classList.remove('disabled'), 100)
    }
}

async function updateInventory(e) {
    e.preventDefault()
    e.stopPropagation()
    const form = e.target.parentNode
    const action = form.action
    const listItem = form.parentNode.parentNode
    const numberInput = form.querySelector('.numberInput')
    const count = numberInput.value
    const itemCountSpan = listItem.querySelector('.itemCount')
    const checkmark = listItem.querySelector('.checkmark')
    console.log(checkmark)
    try {
        const response = await fetch(action, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "count": count 
            })
        })
        const data = await response.json()
        numberInput.value = 1
        itemCountSpan.textContent = data.newCount
        checkmark.classList.remove('hidden')
        setTimeout(() => checkmark.classList.add('hidden'), 2000)
    } catch (error) {
        console.log(error)
    }
}


