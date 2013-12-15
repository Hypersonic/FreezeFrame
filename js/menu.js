MENU = {
}


MENU.setup = function() {
    width = 500;
    height = 500;
    menuArea = document.getElementById('menuarea');
    menuArea.style.width = width;
    menuArea.style.height = height;

    menuHeader = document.getElementById('menuheader');
    menuHeader.style.position = "absolute";
    menuHeader.style.left = width/2 - 70 + 'px';
    menuHeader.style.top = 60;

    buttons = document.getElementsByClassName('menubutton');
    buttons[0].style.position = "absolute";
    buttons[1].style.position = "absolute";

    buttons[0].style.left = width/2;
    buttons[0].style.top = height/2 - 50;
    buttons[0].style.fontSize = "x-large";
    buttons[0].onclick = function() {
        MENU.play();
    };


    buttons[1].style.left = width/2 - 37;
    buttons[1].style.top = height/2 + 50;
    buttons[1].style.fontSize = "x-large";
    buttons[1].onclick = function() {
        MENU.instructions();
    };

    var instrArea = document.getElementById('instrarea');
    instrArea.style.width = width;
    instrArea.style.height = height;

    var instrHeader = document.getElementById('instrheader');
    instrHeader.style.position = "absolute";
    instrHeader.style.left = width/2 - 70 + 'px';
    instrHeader.style.top = 60;

    var back = document.getElementById('instrbutton');
    back.style.position = "absolute";
    back.style.left = 30;
    back.style.top = height - 50;
    back.onclick = function() {
        MENU.home();
    };

    var desc = document.getElementById('instrdesc');
    desc.style.position = "absolute";
    desc.style.left = width/10;
    desc.style.width = width * 4/5;
    desc.style.top = height/2 - 120;

}

MENU.play = function() {
    GAME.setup();
    document.getElementById('menuarea').style.display = "none";
    setTimeout(GAME.main, 2000);
}

MENU.home = function() {
    document.getElementById('menuarea').style.display = "block";
    document.getElementById('instrarea').style.display = "none";
}

MENU.instructions = function() {
    document.getElementById('menuarea').style.display = "none";
    document.getElementById('instrarea').style.display = "block";
}
