// const editMasterBtn = document.querySelectorAll('.editMasterBtn')

// editMasterBtn.forEach(el => {
//     el.addEventListener('click', getEditMaster)
// })

// async function getEditMaster() {
//     const listId = this.parentNode.dataset.listId
//     try {
//         const response = await fetch('dashboard/editMaster', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'listIdFromJSFile': listId
//             })
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }