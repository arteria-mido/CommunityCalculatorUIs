let currentView = "presentation";
document.addEventListener('DOMContentLoaded', (e) => {
    toggleGlider();
    collapseSidebar();
    addDropdownClickListenerFilter();
    openMasterDropdown();
});
let glider = document.getElementById("glider");
let underglider = document.getElementById("underglider");
let outerglider = document.getElementById("outerglider");

let kpiContainer = document.getElementsByClassName('kpiContainer');
setKpiHighlight();

function toggleGlider() {
    if (underglider.style.width == '0px') {
        underglider.style.width = '120px';
        glider.style.backgroundColor = '#f06a6a';
        changeGliderSVGcolor('#ffffff');
    } else {
        underglider.style.width = '0px';
        glider.style.backgroundColor = 'transparent';
        changeGliderSVGcolor('#000000');
    }
}

function changeGliderSVGcolor (color) {
    glider.style.color = color;
    Array.from(glider.childNodes).forEach(e => {
        if (e.tagName == "svg") {
            e.style.stroke = color;
        }
    });
}
glider.addEventListener("click", toggleGlider);


let mainSidebar = document.getElementById("sidebar");
let expandBtn = document.getElementById("expandSidebar");
function collapseSidebar () {
    if (mainSidebar.style.marginLeft == '0px') {
        mainSidebar.style.marginLeft = '-300px';
        expandBtn.style.display = 'block';

    }  else {
        mainSidebar.style.marginLeft = '0px';
        expandBtn.style.display = 'none';
    } 
}

document.getElementById("collapseMenu").addEventListener('click', collapseSidebar);
document.getElementById("expandMenu").addEventListener('click', collapseSidebar);

function toggleDropdown(id) {
    let button = document.getElementById(id);
    let buttons = ["dropdwn_1", "dropdwn_2", "dropdwn_3"];
    buttons.forEach(b => {
        if (b == id) {
            if (button.nextElementSibling.style.display != 'block') {
                button.nextElementSibling.style.display = 'block';
                button.style.backgroundColor = '#f9f8f8';
                let collapsed = buttons.filter(button => button != id);
                collapsed.forEach(c => {
                    let toCollapse = document.getElementById(c);
                    if (toCollapse.nextElementSibling.style.display == 'block') {
                        toCollapse.nextElementSibling.style.display = 'none';
                        toCollapse.style.backgroundColor = 'transparent';
                    }
                });
            } else {
                button.nextElementSibling.style.display = 'none';
                button.style.backgroundColor = 'transparent';
            }
        }
    });
}

// click outside will close dropdown for switch view and reorder
window.onclick = function (e) {
    if (!e.target.matches('.dd')) {
        let dropdowns = document.getElementsByClassName('rightMenuDropdown-content');
        Array.from(dropdowns).forEach(d => {
            if (!d.classList.contains('notclose') && d.style.display == 'block') {
                d.style.display = 'none';
                d.previousElementSibling.style.backgroundColor = 'transparent';
            }
        })
    };
}

function addDropdownClickListenerFilter() {
    let dropdownBtns = document.getElementsByClassName('rightMenuBtn');
    Array.from(dropdownBtns).forEach(ddB => { 
        addCloseDropdownClass(ddB);
        Array.from(ddB.children).forEach(child => { addCloseDropdownClass(child); });
        if (ddB.firstElementChild.hasChildNodes()) {
            Array.from(ddB.firstElementChild.children).forEach(c => { addCloseDropdownClass(c); });
        }
    });
}

function addCloseDropdownClass(element) {
    if (!element.classList.contains('dd')) { element.classList.toggle('dd') ;}
}

function moveCharttoTop(chartcontainer) {
    // document.getElementById('charts-collection').classList.add('col');
    cOriginal.setSize(null);
    cSummer.setSize(null);
    cDark.setSize(null);
    cHay.setSize(null);
    if (currentView != 'overview') {
        let targetChart = document.getElementById(chartcontainer);
        targetChart.parentNode.insertBefore(targetChart, targetChart.parentNode.firstChild);
    }
}

let sideContent = document.getElementById('side-content');
let chartsCollection = document.getElementById('charts-collection');
let chartsContainer = document.getElementById('charts-container');
let rightPanel = document.getElementById('rightPanel');

function switchView(view) {
    currentView = view;

    if (view == 'presentation') {
        sideContent.style.visibility = 'visible';
        chartsCollection.style.width = '62%';
        rightPanel.classList.add('autowidth');
        resetKpiHighlight();
        setKpiHighlight();

        removeFromReorderList();
        if (chartsContainer.classList.contains('overviewView')) {
            chartsContainer.classList.remove('overviewView');
        }
        
        if (rightPanel.firstElementChild.id == 'kpiSection_main') {
            rightPanel.removeChild(rightPanel.firstElementChild);
        }
        Array.from(chartsContainer.children).forEach(c => {
            if (c.id === 'communityChart') {chartsContainer.removeChild(c); }
            // c.classList.add('autowidth');
            adjustChartSizeonViewChange(c);
        });
    }
    else if (view == 'overview' || view == 'expanded') {
        chartsCollection.style.width = '100%';
        sideContent.style.visibility = 'hidden';
        resetKpiHighlight();
        if (rightPanel.firstElementChild.id != 'kpiSection_main') { cloneSidepanel();}
        reshuffleCharts();
        addToReorderList();
        
        if (view == 'overview') {
            chartsContainer.classList.add('overviewView');
            Array.from(chartsContainer.children).forEach(c => {
                c.classList.add('upscaled-chart-size');
            });
        } else {
            chartsContainer.classList.remove('overviewView');
            Array.from(chartsContainer.children).forEach(c => {
                adjustChartSizeonViewChange(c);
            });
        }
        communityChart = Highcharts.chart('communityChart', Highcharts.merge(chartOptions, original));
    }
}

function reshuffleCharts() {
    let unitC = document.getElementById('unit-chart');
    let buildingC = document.getElementById('building-chart');
    let bProdC = document.getElementById('building_prod-chart');
    chartsContainer.insertBefore(buildingC, bProdC);
    chartsContainer.insertBefore(unitC, buildingC);
}

let reorderBtn = document.getElementById('dropdwn_3');
let listItem = reorderBtn.nextElementSibling;
function addToReorderList() {
    if (listItem.children.length == 3) {
        let newDropdownItem = document.createElement('div');
        newDropdownItem.innerHTML = 'Community';
        let newClasses = ['viewOption', 'row', 'aligned-centre'];
        newClasses.forEach(cl => {
            newDropdownItem.classList.add(cl);
        });
        newDropdownItem.addEventListener('click', moveCharttoTop('communityChart'));
        listItem.insertBefore(newDropdownItem, listItem.firstElementChild);
    }
}

function removeFromReorderList() {
    if (listItem.children.length > 3) {
        console.log(listItem.firstElementChild);
        listItem.removeChild(listItem.firstElementChild);
        console.log(listItem.children);
    }
}

function adjustChartSizeonViewChange (element) {
    element.classList.remove('upscaled-chart-size');
    element.classList.add('uniform-chart-size');
}

function resetKpiHighlight () {
    Array.from(kpiContainer).forEach(c => {
        if (c.classList.contains('highlight')) {c.classList.remove('highlight')}
    });
}

function setKpiHighlight () {
    Array.from(kpiContainer).forEach(c => {
    c.addEventListener('click', () => { c.classList.toggle('highlight'); })
    })
}

function cloneSidepanel () {
    let chartsContainer = document.getElementById('charts-container');
    let rightPanel = document.getElementById('rightPanel');
    let communityChart = document.createElement('div');
    communityChart.id = 'communityChart';
    chartsContainer.insertBefore(communityChart, chartsContainer.firstChild);

    let analytical = document.getElementById('analytical');
    let cloneKpi = analytical.lastElementChild.cloneNode(true);
    cloneKpi.id = 'kpiSection_main';
    let kpi = cloneKpi.firstElementChild;
    kpi.id = 'kpi_main';
    kpi.classList.remove('col');
    kpi.classList.remove('flex');
    kpi.style.display = 'grid';
    rightPanel.style.width = '100%';
    kpi.classList.add('kpiGrid');

    rightPanel.insertBefore(cloneKpi, rightPanel.firstElementChild);
    setKpiHighlight();
}

function updateChartSize () {
    if (communityChart) { communityChart.reflow();}
    cOriginal.reflow();
    cSummer.reflow();
    cDark.reflow();
    cHay.reflow();
}

function openMasterDropdown() {
    let masterDD = document.getElementById("masterDropdown_content");
    masterDD.style.display == 'none' ? masterDD.style.display = 'flex' : masterDD.style.display = 'none';

    let button = document.getElementsByClassName('dropdownBtn')[0];
    button.firstElementChild.classList.toggle('rotate180');
}

let masterDropdown = document.getElementById('master_dropdown');
masterDropdown.addEventListener('click', openMasterDropdown);
let button = masterDropdown.firstElementChild;
button.addEventListener('click', openMasterDropdown);
button.firstElementChild.addEventListener('click', openMasterDropdown);


