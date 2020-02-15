var model = {
    init: function () {
        localStorage.cats = JSON.stringify([
            { name: 'Andy', url: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426', alt: 'A photo of a young cat staring.', counter: 0 },
            { name: 'Sam', url: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496', alt: 'A photo of a shy cat hiding.', counter: 0 },
            { name: 'Lara', url: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454', alt: 'A photo of a lying cat', counter: 0 },
            { name: 'Stitch', url: 'https://i.ibb.co/DK4KyJr/stitch.jpg', alt: 'A photo of a beautiful cat!', counter: 0 },
            { name: 'Soska', url: "https://farm1.staticflickr.com/969/41428417955_03d64e2a02_b.jpg", alt: 'A photo of a laughing cat.', counter: 0 }
        ]);
    },
    getAllCats: function () {
        return JSON.parse(localStorage.cats);
    },
    increaseCounter: function (i) {
        var data = JSON.parse(localStorage.cats);
        var cat = data[i];
        cat.counter += 1;
        data[i] = cat;
        localStorage.cats = JSON.stringify(data);
        return cat;
    },
    modifyCat: function(i, newCat) {
        var data = JSON.parse(localStorage.cats);
        data[i] = newCat
        localStorage.cats = JSON.stringify(data);
    }
};

var octopus = {
    init: function () {
        model.init();
        view.init();
    },
    getCats: function () {
        return model.getAllCats();
    },
    increment: function (i) {
        var cats = this.getCats();
        var cat = cats[i];
        var cat = model.increaseCounter(i);
        return cat.counter;
    },
    updateCat: function(i, newCat) {
        model.modifyCat(i, newCat);
        view.renderPhoto(i)
    }
};

var view = {
    init: function () {
        this.sidebar = document.querySelector('aside');
        this.card = document.querySelector('.card');
        this.renderSidebar();
        this.renderPhoto(0);
    },
    renderSidebar: function () {
        var cats = octopus.getCats();
        var html = '';
        cats.forEach(function (cat) {
            html += '<div role="listitem" class="item">';
            html += `<h5>${cat.name}</h5>`;
            html += `<img src="${cat.url}" alt="${cat.alt}" class="menu_img">`;
            html += `</div>`;
        });
        this.sidebar.innerHTML = html;
        var sidebar_items = document.querySelectorAll('.item');
        sidebar_items[0].classList.toggle('selected');
        for (var i = 0; i < sidebar_items.length; i++) {
            sidebar_items[i].addEventListener('click', (function (id) {
                return function () {
                    view.renderPhoto(id);
                    sidebar_items.forEach(function (item) {
                        if (item.classList.contains('selected'))
                            item.classList.remove('selected');
                    });
                    sidebar_items[id].classList.toggle('selected');
                };
            })(i))
        }
    },
    renderPhoto: function (i) {
        var cats = octopus.getCats();
        var cat = cats[i];
        var html = `<figure><img src="${cat.url}" alt="${cat.alt}" class="photo"><figcaption>${cat.name}</figcaption></figure><div><p>You clicked the photo</p><span class="counter" id="c1">${cat.counter}</span> times<br><button id="admin-button">Admin</button></div>`
        this.card.innerHTML = html;
        var image = document.querySelector('.photo')

        var admin_button = document.querySelector('#admin-button')
        admin_button.addEventListener('click', function () {
            view.adminTools(i)
        }, false)

        image.addEventListener('click', function () {
            view.photoCallback(i);
        }, false)
    },
    photoCallback: function (i) {
        var text = document.querySelector('.counter');
        var counter = octopus.increment(i);
        text.textContent = counter;
    },
    adminTools: function (i) {
        if (!!document.querySelector('#admin-form')) {
            this.removeAdminTools()
        } else {
            var body = document.querySelector('body');
            body.insertAdjacentHTML('beforeend', '<div id="overlay"></div>');
            var overlay = document.querySelector('#overlay')
            overlay.addEventListener('click', function() {
                view.removeAdminTools()
            })
            var cats = octopus.getCats();
            var cat = cats[i];
            var html = '<form id="admin-form">';
            html += `<label>Name</label>`;
            html += `<input type="text" value="${cat.name}"><br>`;
            html += `<label>URL</label>`;
            html += `<input type="text" value="${cat.url}"><br>`;
            html += `<label>Counter</label>`;
            html += `<input type="text" value="${cat.counter}"><br>`;
            html += `<input type="button" value="Cancel" id="cancel">`;
            html += `<input type="submit" value="Submit">`;
            this.card.insertAdjacentHTML('beforeend', html);

            var form = document.querySelector('#admin-form')
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                view.removeAdminTools();
                var elements = form.elements;
                cat.name = elements[0].value;
                cat.url = elements[1].value;
                cat.counter = parseInt(elements[2].value);
                octopus.updateCat(i, cat);
            });

            var cancel_button = document.querySelector('#cancel');
            cancel_button.addEventListener('click', this.removeAdminTools, false)
        }
    },
    removeAdminTools: function () {
        var overlay = document.querySelector('#overlay')
        overlay.parentNode.removeChild(overlay)
        var form = document.querySelector('#admin-form');
        form.parentNode.removeChild(form);
    }
};

octopus.init()
