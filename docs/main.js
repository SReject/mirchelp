window.onload = function () {
    var iframe = document.getElementById('content');
    var selectedNode = document.getElementsByClassName("selected")[0];
    function addCssClass(node, className) {
        var exists = node.className.split(/ /g).find(function (cls) {
            return cls === className;
        });
        if (!exists) {
            node.className = (node.className ? " " : "") + className
        }
    }
    function removeCssClass(node, className) {
        var classList = [];
        node.className.split(/ /g).forEach(function (cls) {
            if (cls !== className) {
                classList.push(cls);
            }
        });
        node.className = classList.join(" ");
    }
    document.querySelectorAll('a').forEach(function (node) {
        node.addEventListener("click", function (e) {
            e.preventDefault();
            removeCssClass(selectedNode, 'selected');
            addCssClass(node, 'selected');
            selectedNode = node;
            var href = node.getAttribute('href');
            iframe.setAttribute('src', href);
            location.hash = href.substring(2);
            window.scrollTo(0,0);
        });
    });
    if (/^#[a-z\d_]+\.html(?:#.*)?$/i.test(location.hash)) {
        var link = './' + location.hash.substring(1);
        var ele = document.querySelector('a[href="' + link + '"]');
        if (ele) {
            removeCssClass(selectedNode, 'selected');
            addCssClass(ele, 'selected');
            iframe.setAttribute('src', link);
        } else {
            location.hash = "";
        }
    }
};
