document.addEventListener('DOMContentLoaded', (e) => {
    toggleEditSection();
    openSearchField();
    toggleMasterDropdown();
});

let editSection = document.getElementById('edit-section');
let addEditBtn = document.getElementById('addEdit');
function toggleEditSection () {
    if (editSection.style.marginRight == '-500px') {
        openEditField();
    } else { 
        closeEditField();
    }
}

function openEditField() {
    closeDropdown('dropdown_export');
    editSection.style.marginRight = '0px';
    addEditBtn.classList.add('rightmenucategory-hover');
}

function closeEditField() {
    closeDropdown('dropdown_date');
    editSection.style.marginRight = '-500px';
    addEditBtn.classList.remove('rightmenucategory-hover');
}

let searchField = document.getElementById('searchfield');
function openSearchField () {
    searchField.classList.toggle('expandableSearchField-visible');
}

function toggleDropdown(id) {
    let button = document.getElementById(id);
    if (button.nextElementSibling.style.display != 'flex') {
        button.nextElementSibling.style.display = 'flex';
        if (id=='dropdown_date') { 
            button.style.backgroundColor = '#f9f8f8'; }
        else if (id=='dropdown_export') { 
            closeEditField();
            button.classList.add('rightmenucategory-hover');
        }
    } 
    else {
        closeDropdown(id);
    }
}

function closeDropdown(id) {
    let button = document.getElementById(id);
    button.nextElementSibling.style.display = 'none';
    if (id=='dropdown_date') { button.style.backgroundColor = 'transparent'; }
    else if (id=='dropdown_export') { button.classList.remove('rightmenucategory-hover'); }
}

let masterDropdownButton = document.getElementById('master_dropdown');
let buttonSvg = masterDropdownButton.firstElementChild;
let masterDD = document.getElementById("masterdropdown_content");
function toggleMasterDropdown () {
    masterDD.style.display == 'none' ? masterDD.style.display = 'flex' : masterDD.style.display = 'none';
    masterDropdownButton.classList.toggle('dropBtn-borderradius');
    buttonSvg.classList.toggle('rotate180');
}

masterDropdownButton.addEventListener('click', toggleMasterDropdown);

window.onclick = function(event) {
    if (!event.target.matches('.dropBtn')) {
      if (masterDD.style.display == 'flex') {
        closeMasterDropdown();
      }
    }
}

function closeMasterDropdown() {
    masterDD.style.display = 'none';
    masterDropdownButton.classList.add('dropBtn-borderradius');
    buttonSvg.classList.add('rotate180');
}