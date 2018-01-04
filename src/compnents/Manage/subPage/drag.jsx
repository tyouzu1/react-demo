define("4a2ff1c", function(t, e) {
    "use strict";
    function n(t, e, n, r, v) {
        C = e,
            Y = n,
            w = r,
            i(D, H, v),
            H = Y,
            D = C,
            M = !0,
            a(Y),
            p(Y),
            u(Y),
            s(Y),
            c(),
            m(t.targetTouches),
            o(Y, w),
            f(Y, S),
            Y.setAttribute("class", "moving"),
            t.preventDefault(),
            C.addEventListener("touchmove", function(t) {
                y || (y = !0,
                    T = t.targetTouches,
                    g(T),
                    m(T),
                    f(Y, S),
                    l(),
                    d(Y, T),
                    setTimeout(function() {
                        y = !1
                    }, 30)),
                    t.preventDefault()
            }, !1),
            C.addEventListener("touchend", function(t) {
                t.preventDefault(),
                    y = !1,
                    i(C, Y, w, v)
            }, !1)
    }
    function i(t, e, n, i) {
        M && (r(e, n),
            e.setAttribute("class", ""),
        i && i(e, x(e)),
            M = !1,
            e = null,
            t = null,
            n = null)
    }
    function o(t, e) {
        t.parentNode.insertBefore(e, t),
            e.setAttribute("class", "")
    }
    function l() {
        var t, e = Math.floor((N.top + A) / A + .5);
        if (e > L) {
            t = e - L;
            var n = w.nextElementSibling;
            for (n.getAttribute("class") && n.getAttribute("class").match(/moving/) && (n = n.nextElementSibling); --t > 0; )
                n = n.nextElementSibling,
                n.getAttribute("class") && n.getAttribute("class").match(/moving/) && (n = n.nextElementSibling);
            h(w, n),
                L = e
        } else if (L > e) {
            t = L - e;
            var i = w.previousElementSibling;
            for (i.getAttribute("class") && i.getAttribute("class").match(/moving/) && (i = i.previousElementSibling); --t > 0; )
                i = i.previousElementSibling,
                i.getAttribute("class") && i.getAttribute("class").match(/moving/) && (i = i.previousElementSibling);
            i.parentNode.insertBefore(w, i),
                L = e
        }
    }
    function r(t, e) {
        t.parentNode.insertBefore(t, e),
            t.style.top = "0px",
            t.style.position = "relative",
            e.setAttribute("class", "nodis"),
            t.parentNode.insertBefore(e, t.parentNode.children[0])
    }
    function s(t) {
        A = b(t)
    }
    function u(t) {
        L = x(t)
    }
    function p(t) {
        B.minTop = 0,
            B.maxTop = t.parentNode.lastChild.offsetTop
    }
    function a(t) {
        N.top = parseInt(t.offsetTop) || 0
    }
    function c() {
        S.x = 0,
            S.y = 0
    }
    function f(t, e) {
        N.top += e.y,
            N.left += e.x,
        N.top < B.minTop && (N.top = B.minTop),
        N.top > B.maxTop && (N.top = B.maxTop),
            t.style.top = N.top + "px",
            t.style.left = "0px",
            t.style.right = "0px",
            t.style.position = "absolute"
    }
    function m(t) {
        var e = t[0];
        E.x = e.clientX,
            E.y = e.clientY
    }
    function g(t) {
        var e = t[0];
        S.x = e.clientX - E.x,
            S.y = e.clientY - E.y
    }
    function d(t, e) {
        var n = e[0];
        n.clientY <= A + 5 ? (window.scrollBy(0, -10),
            v(t, 0, -10)) : n.clientY >= window.innerHeight - A - 5 && (window.scrollBy(0, 10),
            v(t, 0, 10))
    }
    function v(t, e, n) {
        N.top += n,
            N.left += e,
        N.top < B.minTop && (N.top = B.minTop),
        N.top > B.maxTop && (N.top = B.maxTop),
            t.style.top = N.top + "px",
            l()
    }
    function x(t) {
        for (var e = t.parentNode, n = 0; n < e.children.length; n++)
            if (t.innerHTML == e.children[n].innerHTML)
                return n;
        return -1
    }
    function b(t) {
        return t.offsetHeight
    }
    function h(t, e) {
        var n = e.parentNode;
        n.lastChild == e ? n.appendChild(t) : n.insertBefore(t, e.nextSibling)
    }
    var T, y = !1, A = 42, E = {
        x: 0,
        y: 0
    }, S = {
        x: 0,
        y: 0
    }, N = {
        top: 0,
        left: 0
    }, B = {
        minTop: 0,
        maxTop: 0
    }, w = null, D = null, H = null, L = 0, Y = null, C = null, M = !1;
    e.startDrag = n
});