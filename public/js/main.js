const dropdownBars = document.querySelectorAll(".dropdownBar");

dropdownBars.forEach((el) => {
    el.addEventListener("click", showDropdownContent);
});

function showDropdownContent(e) {
    const dropdownContent =
        e.target.parentNode.querySelector(".dropdownSection");
    const titleBar = e.target.parentNode.querySelector(".titleBar");
    const arrow = e.target.parentNode.querySelector(".arrow");
    titleBar.classList.toggle('underline')
    dropdownContent.classList.toggle("hidden");
    arrow.classList.toggle('rotate180')
}

function toggleArrow(el) {
    el.classList.contains("fa-chevron-down")
        ? el.classList.replace("fa-chevron-down", "fa-chevron-up")
        : el.classList.replace("fa-chevron-up", "fa-chevron-down");
}
