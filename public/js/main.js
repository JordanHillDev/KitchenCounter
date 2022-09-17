const openAddItemsModal = document.querySelector("#openAddItemsModal");
const addItemModal      = document.querySelector("#addItemModal");
const createListBtn     = document.querySelector("#createListBtn")
const createListModal   = document.querySelector('#createListModal')
const closeModalBtns    = document.querySelectorAll(".closeBtn");
const selectCategory    = document.querySelector("#categoryFilter");
const dropdownBars      = document.querySelectorAll(".dropdownBar");

if(openAddItemsModal) openAddItemsModal.addEventListener("click", openAddItemModal);
if(createListBtn)     createListBtn.addEventListener('click', openCreateListModal)
if(closeModalBtns)    closeModalBtns.forEach(el => el.addEventListener("click", closeModal))
if(selectCategory)    selectCategory.addEventListener("change", filterCategories);
if(dropdownBars)      dropdownBars.forEach(el => el.addEventListener("click", showDropdownContent));


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








