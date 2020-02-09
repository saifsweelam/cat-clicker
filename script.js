/*var images = document.querySelectorAll('.photo');
var data = {};

for (var i = 1; i <= images.length; i++) {
    var img = document.querySelector(`#img${i}`);
    var txt = document.querySelector(`#c${i}`);
    data[img.getAttribute('id')] = txt;
    img.addEventListener('click', function(e) {
        increase_counter(event.target.getAttribute('id'))
    }, false);
}

function increase_counter(id) {
    var txt = data[id];
    var counter = parseInt(txt.innerText);
    counter += 1;
    txt.innerText = counter;
}*/

var cats = [
    { name: 'Andy', url: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426', alt: 'A photo of a young cat staring.', counter: 0 },
    { name: 'Sam', url: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496', alt: 'A photo of a shy cat hiding.', counter: 0 },
    { name: 'Lara', url: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454', alt: 'A photo of a lying cat', counter: 0 },
    { name: 'Stitch', url: 'https://i.ibb.co/DK4KyJr/stitch.jpg', alt: 'A photo of a beautiful cat!', counter: 0 },
    { name: 'Soska', url: "https://farm1.staticflickr.com/969/41428417955_03d64e2a02_b.jpg", alt: 'A photo of a laughing cat.', counter: 0 }
];

var sidebar = document.querySelector('aside');
var sidebar_html = '';
function addToSidebar(cat) {
    sidebar_html += '<div role="listitem" class="item">'
    sidebar_html += `<h5>${cat.name}</h5>`
    sidebar_html += `<img src="${cat.url}" alt="${cat.alt}" class="menu_img">`
    sidebar_html += `</div>`
}

var card_html
var card = document.querySelector('.card')
function viewCat(i) {
    var cat = cats[i]
    card_html = `<figure><img src="${cat.url}" alt="${cat.alt}" class="photo"><figcaption>${cat.name}</figcaption></figure><div><p>You clicked the photo</p><span class="counter" id="c1">${cat.counter}</span> times</div>`
    card.innerHTML = card_html
    var image = document.querySelector('.photo')

    image.addEventListener('click', function () {
        var text = document.querySelector('.counter');
        cat.counter += 1
        cats[i] = cat
        text.textContent = cat.counter
    }, false)
}

document.querySelector('aside');
cats.forEach(addToSidebar);
sidebar.innerHTML = sidebar_html;

var sidebar_items = document.querySelectorAll('.item');
for (var i = 0; i < sidebar_items.length; i++) {
    sidebar_items[i].addEventListener('click', (function (id) {
        return function () {
            viewCat(id);
            sidebar_items.forEach(function (item) {
                if (item.classList.contains('selected'))
                    item.classList.remove('selected');
            });
            sidebar_items[id].classList.toggle('selected');
        };
    })(i))
}

function begin() {
    viewCat(0);
    sidebar_items[0].classList.toggle('selected');
}
begin()

