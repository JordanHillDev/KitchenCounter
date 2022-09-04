// const removeBtns = document.querySelectorAll('.rmv-btn')

// removeBtns.forEach(el => {
//     el.addEventListener('click', removeItem)
// })

// async function removeItem() {
//     const itemId = this.parentNode.dataset.itemid
//     const listId = this.parentNode.dataset.listid
//     try {
//         const response = await fetch('dashboard/removeItem', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 itemId: itemId,
//                 listId: listId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     } catch (error) {
//         console.log(error)
//     }
// }