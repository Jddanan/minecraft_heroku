

/* Variables */
var Minecraft = {};
Minecraft.selectedHeight = 14;
Minecraft.selectedWidth = 23;
Minecraft.tools = new Map([
    [`shovel`, `dirt`],
    [`axe`, `tree`],
    [`pickaxe`, `stone`],
    [`shear`, `leaf`],
    [`mower`, `grass`],
]);
Minecraft.INIT_BLOCK_COUNT = new Map();     // will be automatically updated if world is changed

/* HARDCODED board MVP we left it for you to see how we previously generated our boad */
// Minecraft.world = [
//     ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
//     ["sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
//     ["sky", "sky", "sky", "sky", "sky", "sky", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
//     ["sky", "leaf", "leaf", "leaf", "sky", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
//     ["sky", "leaf", "leaf", "leaf", "sky", "sky", "sky", "cloud", "cloud", "cloud", "cloud", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
//     ["sky", "leaf", "leaf", "leaf", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
//     ["sky", "leaf", "tree", "leaf", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "leaf", "leaf", "leaf", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
//     ["sky", "sky", "tree", "sky", "sky", "sky", "sky", "sky", "stone", "sky", "sky", "sky", "sky", "leaf", "tree", "leaf", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
//     ["sky", "sky", "tree", "sky", "stone", "sky", "sky", "sky", "stone", "stone", "sky", "sky", "sky", "sky", "tree", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
//     ["sky", "sky", "tree", "sky", "stone", "stone", "sky", "stone", "stone", "stone", "sky", "sky", "stone", "sky", "tree", "sky", "sky", "sky", "sky", "sky", "sky", "sky", "sky"],
//     ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "water", "water", "water", "water", "water",],
//     ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "water", "water", "water", "water",],
//     ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
//     ["dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt", "dirt",],
// ];

/* Random world generator ! */
Minecraft.randomWorld = function () {

    Minecraft.worldRandomized = [];

    var height = Minecraft.selectedHeight;
    var width = Minecraft.selectedWidth;

    /* Init the world */
    for (var i = 0; i < height; i++) {
        Minecraft.worldRandomized[i] = [];
    }

    var waterInit = Math.floor(Math.random() * (width - 5));         // random j water init position at grass level
    var grassInit = Math.round(height / 4);                         //  i where grass will be
    var treeOneInit = waterInit;
    var treeTwoInit = waterInit;
    var stoneOneInit = waterInit;
    var stoneTwoInit = waterInit;
    var cloudInit = 0;

    while (treeOneInit >= waterInit && treeOneInit <= waterInit + 4) {        // makes sure the first tree wont build on top of water
        treeOneInit = Math.floor(Math.random() * (width - 2) + 1);                   // tree not at first and last index (for leaves)
    }
    while (treeTwoInit >= waterInit && treeTwoInit <= waterInit + 4 || (treeTwoInit >= treeOneInit - 3 && treeTwoInit <= treeOneInit + 3)) {        // makes sure the second tree wont build on top of water or first tree
        treeTwoInit = Math.floor(Math.random() * (width - 2) + 1);
    }
    while (stoneOneInit >= waterInit - 1 && stoneOneInit <= waterInit + 4 || stoneOneInit >= treeOneInit - 2 && stoneOneInit <= treeOneInit + 2 || stoneOneInit >= treeTwoInit - 2 && stoneOneInit <= treeTwoInit + 2) {
        stoneOneInit = Math.floor(Math.random() * (width - 2) + 1);
    }

    while (stoneTwoInit >= waterInit - 1 && stoneTwoInit <= waterInit + 4 || stoneTwoInit >= treeOneInit - 2 && stoneTwoInit <= treeOneInit + 2 || stoneTwoInit >= treeTwoInit - 2 && stoneTwoInit <= treeTwoInit + 2 || stoneTwoInit >= stoneOneInit - 2 && stoneTwoInit <= stoneOneInit + 3) {
        stoneTwoInit = Math.floor(Math.random() * (width - 2) + 1);
    }

    cloudInit = Math.floor(Math.random() * (width - 7));

    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            if (i > height - grassInit + 1) {
                Minecraft.worldRandomized[i][j] = `dirt`;
            } else if (i === height - grassInit + 1) {
                (j >= waterInit + 1 && j <= waterInit + 3) ? Minecraft.worldRandomized[i][j] = `water` : Minecraft.worldRandomized[i][j] = `dirt`;
            } else if (i === height - grassInit) {
                (j >= waterInit && j <= waterInit + 4) ? Minecraft.worldRandomized[i][j] = `water` : Minecraft.worldRandomized[i][j] = `grass`;
            } else if (i === height - grassInit - 1 || i === height - grassInit - 2) {
                if (j === stoneOneInit || j === stoneOneInit + 1) {
                    Minecraft.worldRandomized[i][j] = `stone`;
                } else if (j === stoneTwoInit) {
                    Minecraft.worldRandomized[i][j] = `stone`;
                } else {
                    (j === treeOneInit || j === treeTwoInit) ? Minecraft.worldRandomized[i][j] = `tree` : Minecraft.worldRandomized[i][j] = `sky`;           // add rocks here and higher
                }
            } else if (i === height - grassInit - 3) {
                if (j === stoneTwoInit || j === stoneOneInit) {
                    Minecraft.worldRandomized[i][j] = `stone`;
                } else if (j === treeOneInit || j === treeTwoInit) {
                    Minecraft.worldRandomized[i][j] = `tree`;
                } else if (j === treeOneInit - 1 || j === treeOneInit + 1 || j === treeTwoInit - 1 || j === treeTwoInit + 1) {
                    Minecraft.worldRandomized[i][j] = `leaf`;
                } else {
                    Minecraft.worldRandomized[i][j] = `sky`;
                }
            } else if (i === height - grassInit - 4) {
                if (j === treeOneInit) {
                    Minecraft.worldRandomized[i][j] = `tree`;
                } else if (j === treeOneInit - 1 || j === treeOneInit + 1 || j >= treeTwoInit - 1 && j <= treeTwoInit + 1) {
                    Minecraft.worldRandomized[i][j] = `leaf`;
                } else {
                    Minecraft.worldRandomized[i][j] = `sky`;
                }
            } else if (i === height - grassInit - 5) {
                if (j >= treeOneInit - 1 && j <= treeOneInit + 1 || j >= treeTwoInit - 1 && j <= treeTwoInit + 1) {
                    Minecraft.worldRandomized[i][j] = `leaf`;
                } else {
                    Minecraft.worldRandomized[i][j] = `sky`;
                }
            } else if (i === height - grassInit - 5 || i === height - grassInit - 6) {
                if (j >= treeOneInit - 1 && j <= treeOneInit + 1) {
                    Minecraft.worldRandomized[i][j] = `leaf`;
                } else {
                    Minecraft.worldRandomized[i][j] = `sky`;
                }
            } else if (i === 3) {
                if (j >= cloudInit + 2 && j <= cloudInit + 5) {
                    Minecraft.worldRandomized[i][j] = `cloud`;
                } else {
                    Minecraft.worldRandomized[i][j] = `sky`;
                }
            } else if (i === 2) {
                if (j >= cloudInit && j <= cloudInit + 6) {
                    Minecraft.worldRandomized[i][j] = `cloud`;
                } else {
                    Minecraft.worldRandomized[i][j] = `sky`;
                }
            } else if (i === 1) {
                j === cloudInit + 1 ? Minecraft.worldRandomized[i][j] = `cloud` : Minecraft.worldRandomized[i][j] = `sky`;
            }
            else {
                Minecraft.worldRandomized[i][j] = `sky`;
            }
        }
    }
    Minecraft.world = Minecraft.worldRandomized;     // 
}


/* Generates the world from HARDCODED board */
Minecraft.generateWorld = function (world) {

    for (var i = 0; i < world.length; i++) {
        $(`#world`).append(`<div class='row row-world justify-content-center'>`);
        for (var j = 0; j < world[0].length; j++) {
            $(`.row-world:nth-child(${i + 1})`).append(`<div class='pixel ${Minecraft.world[i][j]}'>`);
        }
    }
    $("#menu").append("<div id='shovel' class='tools'>");
    $("#menu").append("<div id='axe' class='tools'>");
    $("#menu").append("<div id='pickaxe' class='tools'>");
    $("#menu").append("<div id='shear' class='tools'>");
    $("#menu").append("<div id='mower' class='tools'>");
    $("#menu2").append("<div id='dirt' class='blocks'>");
    $("#dirt").append("<span id='counter-dirt' class='counter'>");
    $("#menu2").append("<div id='tree' class='blocks'>");
    $("#tree").append("<span id='counter-tree' class='counter'>");
    $("#menu2").append("<div id='stone' class='blocks'>");
    $("#stone").append("<span id='counter-stone' class='counter'>");
    $("#menu2").append("<div id='leaf' class='blocks'>");
    $("#leaf").append("<span id='counter-leaf' class='counter'>");
    $("#menu2").append("<div id='grass' class='blocks'>");
    $("#grass").append("<span id='counter-grass' class='counter'>");
    $(".counter").text(0);                              // Because initially user doesn't have blocks

}

/* All events listeners */
Minecraft.mouseInteractions = function () {

    $(`.pixel`).on(`mouseover`, function () {           // mouseover
        $(this).addClass(`hovered`);
        $(`.hovered`).on(`mouseout`, function () {
            $(this).removeClass(`hovered`);
        });
    });

    $(`.tools`).on(`click`, function (e) {              // Select tool and destroyable block type 
        var tool = e.target.id;
        var block = Minecraft.tools.get(tool);
        $(`.tools`).removeClass(`selected`);
        $(`.blocks`).removeClass(`selected`);
        $(`#${tool}`).addClass(`selected`);
        $(`#world`).css('cursor', `url(./images/${tool}.png),auto`);
        $(".pixel").off("click");
        $(`.${block}`).on("click", function (e) {
            $(`#sound`).attr(`src`, `./sound/${block}.ogg`);
            document.getElementById("sound").play();
            $(e.target).addClass(`sky`);
            $(e.target).removeClass(block);
            Minecraft.counterBlocks(block);
        });
    });

    $(`.blocks`).on(`click`, function (e) {             // Allow user to build blocks on sky pixels if he has enough inventory
        var block = e.target.id;
        $(`.tools`).removeClass(`selected`);
        $(`.blocks`).removeClass(`selected`);
        if (e.target.className === `counter`) {       // very proud of this fix. Prevents inventory counters from beeing selected
            block = block.split(`-`);
            block = block[1];
        }
        $(`#${block}`).addClass(`selected`);
        $(`#world`).css('cursor', 'auto');   // Here if we want to change the cursor with the block image
        // $(`#world`).css('cursor', `url(./images/${block}.png),auto`);
        $(".pixel").off("click");
        $(`.sky`).on("click", function (e) {
            if ($(`#counter-${block}`).text() > 0) {
                $(`#sound`).attr(`src`, `./sound/${block}.ogg`);
                document.getElementById("sound").play();
                $(e.target).addClass(`${block}`);
                $(e.target).removeClass(`sky`);
                Minecraft.counterBlocks(block);
            } else {
                Minecraft.warnUserAboutEmptiness(block);
            }
        });
    });
}

Minecraft.warnUserAboutEmptiness = function (block) {

    $(`#counter-${block}`).addClass(`warning`);
    setTimeout(() => {
        $(`#counter-${block}`).removeClass(`warning`);
    }, 300);
}

/* Count each initial types blocks in the 2D array */
Minecraft.initCounterBlocks = function () {

    for (var i = 0; i < Minecraft.world.length; i++) {
        for (var j = 0; j < Minecraft.world[i].length; j++) {
            var getValue = Minecraft.INIT_BLOCK_COUNT.get(Minecraft.world[i][j]);
            if (typeof getValue !== "number") {
                Minecraft.INIT_BLOCK_COUNT.set(Minecraft.world[i][j], 1);
            } else {
                Minecraft.INIT_BLOCK_COUNT.set(Minecraft.world[i][j], getValue + 1);
            }
        }
    }
    $('#startModal').removeClass(`loading`);
}

/* Count blocks with same class as targeted pixel */
Minecraft.counterBlocks = function (block) {

    var START_BLOCK = Minecraft.INIT_BLOCK_COUNT.get(block);
    var counterBlock = $(`#counter-${block}`);
    var counter = 0;
    for (i = 0; i < $(`.${block}`).length; i++) {
        counter++
    }
    counterBlock.text(START_BLOCK - counter)
}

/* Start modal + instructions */
Minecraft.startModal = function () {

    $('#startModal').addClass(`loading`);
    $('#startModal').modal({
        backdrop: 'static',
        keyboard: false
    })
    $(".continue").on("click", function () {
        $('#startModal').css(`display`, `none`); // doesn't work with the class hide
        $('.modal-content').addClass("hide");
        $(".modal-backdrop").addClass("hide");
        $('.modal-instruction').css(`display`, `none`);
        $('#instructionModal').css(`display`, `none`);
    })
    $("#instruction").on("click", function () {
        $('#instructionModal').css(`display`, `block`);
        $("#continue").addClass("hide");
        $("#instruction").addClass("hide");
        $("#textIntro").addClass("hide");

    });
};

/* Initiates the game */
Minecraft.start = function () {

    Minecraft.startModal();
    Minecraft.randomWorld();
    Minecraft.generateWorld(Minecraft.world);
    Minecraft.mouseInteractions();
    Minecraft.initCounterBlocks();
}

$(document).ready(function () {
    Minecraft.start();
});
