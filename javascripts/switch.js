// JavaScript Document

$(document).ready(function() {
    $('a.toolBut').click(function() {
        $('.Mem_ToolBar').toggle("slide", { direction: "left" }, 1000);
        if ($('.Mem_ToolBar').css('display') == 'block') {
            $("#arrowSlide").attr("src", "images/slide_lft.gif");
        }
        else {
        }

        if ($('.Mem_ToolBar').css('display') == 'none') {
            $("#arrowSlide").attr("src", "images/slide_rgt.gif");
            alert('');
        }
        else {
            ("#arrowSlide").attr("src", "images/slide_rgt.gif");
        }

    });
})