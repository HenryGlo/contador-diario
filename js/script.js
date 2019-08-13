$(document).ready(function () {
    $(".contador .inicio #iniciar").click(function (e) {
        event.preventDefault();
        sessionStorage.removeItem("p_base");
        if ($(".inicio input").val().length > 0) {
            $(".contenedor").show(3000).css("display", "flex");
            $(".inicio").hide(3000);
        }
        else {
            alert("Por favor agregue un monto");
        }
        var p_actual = parseInt($(".inicio input").val());
        $(".lista .presupuesto .actual").html("<p>" + p_actual + "</p>");
        $(".lista .presupuesto .restante").html("<p>" + p_actual + "</p>")
    });

    $(".contenedor .gastos #agregar").click(function (e) {
        e.preventDefault();
        if ($(".contenedor .gastos #precio").val() > parseInt($(".inicio input").val())) {
            alert("Usted ha elegido un monto mayor que su presupuesto");
            $(".contenedor .gastos #obj").val("");
            $(".contenedor .gastos #precio").val("");
        }
        else {
            if ($(".contenedor .gastos #obj").val().length > 0 && $(".contenedor .gastos #precio").val().length > 0) {
                var obj = $(".contenedor .gastos #obj").val();
                var precio = parseInt($(".contenedor .gastos #precio").val());
                $(".lista .listado").append("<div class='item'>" + "<p>" + obj + "<p>" + "<p class='precio'>" + precio + "</p>" + "</div>");
                $(".contenedor .gastos #obj").val("");
                $(".contenedor .gastos #precio").val("");
                if (sessionStorage.getItem("p_base")) {
                    p_base = sessionStorage.getItem("p_base") - precio;
                    sessionStorage.setItem("p_base", p_base);
                }
                else {
                    var p_base = parseInt($(".inicio input").val()) - precio;
                    sessionStorage.setItem("p_base", p_base);
                }
                if (sessionStorage.getItem("p_base") == 0.8 * parseInt($(".inicio input").val())) {
                    $(".lista .presupuesto .restante").css("background", "yellow");
                }
                else if (sessionStorage.getItem("p_base") >= 0.4 * parseInt($(".inicio input").val()) || sessionStorage.getItem("p_base") >= 0.3 * parseInt($(".inicio input").val()) || sessionStorage.getItem("p_base") >= 0.2 * parseInt($(".inicio input").val())) {
                    $(".lista .presupuesto .restante").css("background", "orange");
                }
                else if (sessionStorage.getItem("p_base") == 0 * parseInt($(".inicio input").val()) || sessionStorage.getItem("p_base") >= 0.1 * parseInt($(".inicio input").val())) {
                    $(".lista .presupuesto .restante").css("background", "red");
                }
                $(".lista .presupuesto .restante").html("<p>" + p_base + "</p>");
            }
            else {
                alert("Por favor agregue un objeto y un precio");
            }
        }
    });
});