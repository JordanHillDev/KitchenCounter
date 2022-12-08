const openAddItemsModal = document.querySelector("#openAddItemsModal");
const addItemModal      = document.querySelector("#addItemModal");
const createListBtn     = document.querySelector("#createListBtn");
const createListModal   = document.querySelector("#createListModal");
const closeModalBtns    = document.querySelectorAll(".closeBtn");
const selectCategory    = document.querySelector("#categoryFilter");
const dropdownBars      = document.querySelectorAll(".titleBar");
const decreaseBtns      = document.querySelectorAll(".decreaseBtn");
const increaseBtns      = document.querySelectorAll(".increaseBtn");
const submitUpdateBtns  = document.querySelectorAll(".inlineSubmit");
const submitMobileBtn   = document.querySelector('.submitInputMobile')
const radioBtns         = document.querySelectorAll(".radio");
const mobileNumInput    = document.querySelector('.numberInput')

// Event Listeners
if (openAddItemsModal) openAddItemsModal.addEventListener("click", openAddItemModal);
if (createListBtn)     createListBtn.addEventListener("click", openCreateListModal);
if (closeModalBtns)    closeModalBtns.forEach((el) => el.addEventListener("click", closeModal));
if (selectCategory)    selectCategory.addEventListener("change", filterCategories);
if (dropdownBars)      dropdownBars.forEach((el) =>el.addEventListener("click", showDropdownContent));
if (decreaseBtns)      decreaseBtns.forEach((el) => el.addEventListener("click", decreaseInputValue));
if (increaseBtns)      increaseBtns.forEach((el) =>el.addEventListener("click", increaseInputValue) );
if (submitUpdateBtns)  submitUpdateBtns.forEach((el) => el.addEventListener("click", updateInventory)); 
if (submitMobileBtn)   submitMobileBtn.addEventListener("click", updateInventoryMobile); 
if (radioBtns)         radioBtns.forEach((el) => el.addEventListener("change", selectRadioBtn));
if (mobileNumInput)    mobileNumInput.addEventListener("click", focusNumInput)



function openAddItemModal() {
    addItemModal.style.display = "flex";
}

function openCreateListModal() {
    createListModal.style.display = "flex";
}

function closeModal(e) {
    const thisModal = e.target.parentNode;
    thisModal.style.display = "none";
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
    e.stopPropagation();
    const dropdownContent =
        e.target.parentNode.querySelector(".dropdownSection");
    const titleBar = e.target.parentNode.querySelector(".titleBar");
    const arrow = e.target.parentNode.querySelector(".arrow");
    titleBar.classList.toggle("underline");
    dropdownContent.classList.toggle("hidden");
    arrow.classList.toggle("rotate180");
}

function decreaseInputValue(e) {
    e.preventDefault();
    e.stopPropagation();
    const input = e.target.parentNode.querySelector(".numberInput");
    input.value = +input.value - 1;
    timeoutInput(e);
}

function increaseInputValue(e) {
    e.preventDefault();
    e.stopPropagation();
    const input = e.target.parentNode.querySelector(".numberInput");
    input.value = +input.value + 1;
    timeoutInput(e);
}

function timeoutInput(e) {
    if (!e.target.classList.contains("disabled")) {
        e.target.classList.add("disabled");
        setTimeout(() => e.target.classList.remove("disabled"), 100);
    }
}

async function updateInventory(e) {
    e.preventDefault();
    e.stopPropagation();
    const listItem = e.target.parentNode.parentNode
    const itemName = listItem.querySelector('input[type=radio').id.split('_').join(' ');
    const form = e.target.parentNode
    const route = form.action
    const numInput = form.querySelector('input[type=number')
    const count = numInput.value;
    const checkmark = listItem.querySelector(".checkmark");
    const itemCountSpan = listItem.querySelector(".itemCount");
    const countedBySpan = listItem.querySelector(".countedBy");
    const totalDollarSpan = listItem.querySelector('.totalDollar')

    if(+itemCountSpan.innerText + +count >= 0) { //makes sure count can't go below 0
        try {
            const response = await fetch(route, {
                method: "put",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    count: count,
                }),
            });
            const data = await response.json();
            numInput.value = 1;
            itemCountSpan.textContent = data.newCount;
            totalDollarSpan.textContent = `$${data.newCount * data.price}`
            
            // Keeps correct form of "Case"
            if (
                countedBySpan.innerText === "Case" ||
                countedBySpan.innerText === "Cases"
            ) {
                data.newCount > 1
                    ? (countedBySpan.innerText = "Cases")
                    : (countedBySpan.innerText = "Case");
            }
            
            // Shows checkmark if successful
            checkmark.classList.remove("hidden");
            setTimeout(() => checkmark.classList.add("hidden"), 2000);
        } catch (error) {
            console.log(error);
        }
    }
}


async function updateInventoryMobile(e) {
    e.preventDefault();
    e.stopPropagation();
    const itemSelected = [...radioBtns].find((el) => el.checked === true);
    const itemName = itemSelected.id.split('_').join(' ') //needed for item names > 1 word
    const form = e.target.parentNode;
    const action = form.action;
    const route = action + `?itemName=${itemName}`;
    const count = mobileNumInput.value;
    const checkmark = itemSelected.parentNode.querySelector(".checkmark");
    const itemCountSpan = itemSelected.parentNode.querySelector(".itemCount");
    const countedBySpan = itemSelected.parentNode.querySelector(".countedBy");
    const totalDollarSpan = itemSelected.parentNode.querySelector('.totalDollar')
    
    if(+itemCountSpan.innerText + +count >= 0) { //makes sure count can't go below 0
        try {
            const response = await fetch(route, {
                method: "put",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    count: count,
                }),
            });
            const data = await response.json();
            mobileNumInput.value = 1;
            itemCountSpan.textContent = data.newCount;
            totalDollarSpan.textContent = `$${data.newCount * data.price}`
            
            // Keeps correct form of "Case"
            if (
                countedBySpan.innerText === "Case" ||
                countedBySpan.innerText === "Cases"
            ) {
                data.newCount > 1
                    ? (countedBySpan.innerText = "Cases")
                    : (countedBySpan.innerText = "Case");
            }
            checkmark.classList.remove("hidden");
            setTimeout(() => checkmark.classList.add("hidden"), 2000);
        } catch (error) {
            console.log(error);
        }
    }
}

function selectRadioBtn(e) {
    e.stopPropagation();
    for (radio of radioBtns) {
        radio.checked
            ? radio.parentNode.classList.add('selected')
            : radio.parentNode.classList.remove('selected');
    }
    mobileNumInput.value = 1;
}

function focusNumInput(e) {
    e.target.value = '';
}