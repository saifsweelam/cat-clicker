$(function () {
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
        updateCat: function (i) {
            var data = JSON.parse(localStorage.cats);
            var cat = data[i]
            cat.counter += 1
            data[i] = cat
            localStorage.cats = JSON.stringify(data)
            return cat
        }
    };

    var octopus = {
        init: function () {
            model.init()
            view.init()
        },
        getCats: function () {
            return model.getAllCats()
        },
        increment: function(i) {
            var cats = this.getCats()
            var cat = cats[i]
            var cat = model.updateCat(i)
            return cat.counter
        }
    };

    var view = {
        init: function () {
            this.sidebar = document.querySelector('aside');
            this.card = document.querySelector('.card')
            this.renderSidebar()
            this.renderPhoto(0);
        },
        renderSidebar: function () {
            var cats = octopus.getCats()
            var html = ''
            cats.forEach(function (cat) {
                html += '<div role="listitem" class="item">'
                html += `<h5>${cat.name}</h5>`
                html += `<img src="${cat.url}" alt="${cat.alt}" class="menu_img">`
                html += `</div>`
            });
            this.sidebar.innerHTML = html
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
            var cats = octopus.getCats()
            var cat = cats[i]
            var html = `<figure><img src="${cat.url}" alt="${cat.alt}" class="photo"><figcaption>${cat.name}</figcaption></figure><div><p>You clicked the photo</p><span class="counter" id="c1">${cat.counter}</span> times</div>`
            this.card.innerHTML = html
            var image = document.querySelector('.photo')

            image.addEventListener('click', function() {
                view.photoCallback(i);
            }, false)
        },
        photoCallback: function (i) {
            var text = document.querySelector('.counter');
            var cats = octopus.getCats()
            var cat = cats[i]
            counter = octopus.increment(i)
            text.textContent = cat.counter
        }
    };

    octopus.init()
})