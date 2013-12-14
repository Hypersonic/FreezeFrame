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
    menuHeader.style.top = 100;

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
}

MENU.play = function() {
    GAME.setup();
    document.getElementById('menuarea').style.display = "none";
    GAME.main();
}

MENU.instructions = function() {
    alert("todo! :)"); //TODO todo
}
