const dropdownBars = document.querySelectorAll(".dropdownBar");
const selectCategory = document.querySelector("#selectCategory");

dropdownBars.forEach((el) => {
    el.addEventListener("click", showDropdownContent);
});

selectCategory.addEventListener("change", filterCategories);

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
    const selectedValue = e.target.value;
    if (selectedValue === "all") {
        dropdownBars.forEach((el) => (el.style.display = ""));
    } else {
        const dropdownsToHide = [...dropdownBars].filter(
            (bars) => bars.id !== selectedValue
        );

        dropdownsToHide.forEach((el) => (el.style.display = "none"));
        document.querySelector(`#${selectedValue}`).style.display = "";
    }
}
