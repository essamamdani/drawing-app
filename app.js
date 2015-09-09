/**
 * Created by essamamdani on 08/09/15.
 */
var color = $(".selected").css("backgroundColor"),
    $canvas = $("canvas"),
    context = $canvas[0].getContext("2d"),
    lastevent,
    mousedown = false;


function changeColor() {
    var newColor = $(".newColors").map(function () {
        return $(this).val();
    }).get().join(", ");
    $("#newColor").css("background-color", "rgb(" + newColor + ")");
}

$(".controls").on("click", "li", function () {
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");
    color = $(this).css("backgroundColor");
});

$("#revealColorSelect").click(function () {
    changeColor();
    $("#colorSelect").toggle();
});

$(".newColors").change(changeColor);

$("#addNewColor").click(function () {
    var $newColorRow = $("<li></li>");
    $(".controls ul").append($newColorRow);
    $newColorRow.css("background-color", $("#newColor").css("background-color"));
    $newColorRow.click();
});


$canvas.mousedown(function (e) {
    lastevent = e;
    mousedown = true;
}).mousemove(function (e) {
    if (mousedown) {
        context.beginPath();
        context.moveTo(lastevent.offsetX, lastevent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.closePath();
        context.strokeStyle = color;
        context.stroke();
        lastevent = e;
    }
}).mouseup(function () {
    mousedown = false;
}).mouseleave(function () {
    $canvas.mouseup();
});

$("#downloadbtn").on("click", function () {
    var dt = $canvas[0].toDataURL("image/png");
    window.location.href = "data:application/octet-stream" + dt.split(";")[1];

});
