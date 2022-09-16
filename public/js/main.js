const dropdownBars = document.querySelectorAll(".dropdownBar");
const selectCategory = document.querySelector("#categoryFilter");
const listContainer = document.querySelector("#listContainer");
const openAddItemsModal = document.querySelector("#openAddItemsModal");
const addItemModal = document.querySelector("#addItemModal");
const closeModalBtns = document.querySelectorAll(".closeBtn");
const removeItemBtns = document.querySelectorAll(".removeItemBtn");
const removeItemModal = document.querySelector("#removeItemModal");
const removeCatBtns = document.querySelectorAll(".removeCatBtn");

dropdownBars.forEach((el) => {
    el.addEventListener("click", showDropdownContent);
});

selectCategory.addEventListener("change", filterCategories);

openAddItemsModal.addEventListener("click", openAddItemModal);

closeModalBtns.forEach((el) => {
    el.addEventListener("click", closeModal);
});

removeItemBtns.forEach((el) => {
    el.addEventListener("click", openRemoveModal);
});

deleteBtn.addEventListener("click", deleteItem);

removeCatBtns.forEach((el) => {
    el.addEventListener("click", removeCategory);
});

function showDropdownContent(e) {
    const dropdownContent =
        e.target.parentNode.querySelector(".dropdownSection");
    const titleBar = e.target.parentNode.querySelector(".titleBar");
    const arrow = e.target.parentNode.querySelector(".arrow");

    titleBar.classList.toggle("underline");
    dropdownContent.classList.toggle("hidden");
    arrow.classList.toggle("rotate180");
}

function filterCategories(e) {
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

function closeModal(e) {
    const thisModal = e.target.parentNode;
    thisModal.style.display = "none";
}

function openAddItemModal() {
    addItemModal.style.display = "flex";
}

function openRemoveModal(e) {
    e.preventDefault();
    const listId = e.target.dataset.listid;
    const itemId = e.target.dataset.itemid;

    removeItemModal.style.display = "flex";
    removeItemModal.dataset.listId = listId;
    removeItemModal.dataset.itemId = itemId;
}

async function removeCategory(e) {
    const name = e.target.dataset.catname;
    const listId = e.target.dataset.listid;
    try {
        const response = await fetch(`/dashboard/removeCategory`, {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                listId: listId,
                category: name,
            }),
        });
        const data = await response.json();
        location.reload();
    } catch (error) {
        console.log(error);
    }
}
