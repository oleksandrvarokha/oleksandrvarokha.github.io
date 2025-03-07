// TASK 20.
// Создайте массив, который эмулирует доску для крестиков - ноликов, напишите все возможные выиграшные комбинации, т.е. a[0][0], a[0][1], a[0][2] - занята первая линия, и т.д.

const out20 = document.querySelector(".out20");
const bt_startGame = document.querySelector(".start_game");
let bt_restart = document.createElement('button');
let startFunctionOnlyOneTime = 0;
let chekIf_step3_step4_done = [];
let chekIf_winCombination_done = 0;
let check_win = 10;
let step2 = 2;
let step3 = 3;
let step4 = 4;


let game = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

bt_startGame.onclick = () => {
    bt_startGame.remove();
    drawPage();
}

function drawPage() {
    for (let i = 0; i < game.length; i++) {
        for (let k = 0; k < game[i].length; k++) {
            out20.innerHTML += `<div class='game' id='id_game' game_lengthArr='${i}' game_key='${k}'><div>`;
        }
        out20.innerHTML += "<br>";
    }
    changeValue_moveUser();
}

function changeValue_moveUser() {
    const div_game = document.querySelectorAll(".game");
    let z = 0;
    for (let i = 0; i < div_game.length; i++) {

        div_game[i].onclick = function value() {

            if (z % 2) {
                if (z == 1) {
                    ai_pc_step1_part1(1, 1, 0, 0, 0, 2, 2, 0, 2, 2);
                }
                else if (z == 3) {
                    winCombination(step2);
                    ai_pc_step2_part4_mistakeUser();
                    winCombination(check_win);

                }
                else if (z == 5) {
                    winCombination(step3);
                    winCombination(check_win);
                }
                else if (z == 7) {
                    chekIf_step3_step4_done = [];
                    winCombination(step4);
                    winCombination(check_win);
                }
                else if (z == 9) {
                    craeteElement("Remis")
                }
                z++;
            }
            else {
                if (this.classList == "game") {
                    const game_lengthArr = this.getAttribute("game_lengthArr");
                    const game_key = this.getAttribute("game_key");
                    this.classList.remove('game');
                    this.classList.add('game1');
                    game[game_lengthArr][game_key] = 3;
                    z++;
                    value();
                    winCombination(check_win);
                }
            }
            add_value_4_in_arr_game();
        }
        div_game[i].setAttribute('all_lengths', i);
    }
}

function add_value_4_in_arr_game() {
    const div_game = document.querySelectorAll(".game2");
    for (i = 0; i < div_game.length; i++) {
        const game_lengthArr = div_game[i].getAttribute('game_lengthArr');
        const game_key = div_game[i].getAttribute("game_key");

        if (game[game_lengthArr][game_key] == 0) {
            game[game_lengthArr][game_key] = 4;
        }
    }
}


function ai_pc_step1_part1(a, b, c, d, e, f, g, h, l, j) {
    const id_game = document.querySelectorAll("#id_game");

    if (game[a][b] != 3) {
        add_red_squire(4, id_game);
        // let combIdGame = [0, 2, 6, 8];
        // let random = getRandomInt(0, 4);

        // if (id_game[combIdGame[random]].classList.contains('game') == true) {
        //     add_red_squire(combIdGame[random], id_game);
        // }
    }
    else if (game[c][d] == 3) {
        add_red_squire(6, id_game);
    }
    else if (game[e][f] == 3) {
        add_red_squire(8, id_game);
    }
    else if (game[g][h] == 3) {
        add_red_squire(0, id_game);
    }
    else if (game[l][g] == 3) {
        add_red_squire(2, id_game);
    }
    else {
        let combIdGame = [0, 2, 6, 8];
        let random = getRandomInt(0, 4);

        if (id_game[combIdGame[random]].classList.contains('game') == true) {
            add_red_squire(combIdGame[random], id_game);
        }
    }
}


function add_red_squire(value, id_game) {
    startFunctionOnlyOneTime++;
    if (startFunctionOnlyOneTime < 2) {
        id_game[value].classList.remove('game');
        id_game[value].classList.add('game2');
        chekIf_step3_step4_done.pop();
    }
};


function winCombination(step) {
    startFunctionOnlyOneTime = 0;
    //ai_pc_step2_part2(game[x][x], game[x][x], game[x][x], win_length(0-8), win_length(0-8)); 
    // 0 0 x
    ai_pc(0, 0, 0, 1, 0, 2, 2, 1, step);
    ai_pc(1, 0, 1, 1, 1, 2, 5, 4, step);
    ai_pc(2, 0, 2, 1, 2, 2, 8, 7, step);
    // x 0 0 
    ai_pc(0, 2, 0, 1, 0, 0, 0, 1, step);
    ai_pc(1, 2, 1, 1, 1, 0, 3, 4, step);
    ai_pc(2, 2, 2, 1, 2, 0, 6, 7, step);
    // 0
    // 0
    // x
    ai_pc(0, 0, 1, 0, 2, 0, 6, 3, step);
    ai_pc(0, 1, 1, 1, 2, 1, 7, 4, step);
    ai_pc(0, 2, 1, 2, 2, 2, 8, 5, step);
    // x
    // 0
    // 0
    ai_pc(2, 0, 1, 0, 0, 0, 0, 3, step);
    ai_pc(2, 1, 1, 1, 0, 1, 1, 4, step);
    ai_pc(2, 2, 1, 2, 0, 2, 2, 5, step);
    //  vdig_2
    ai_pc(0, 0, 1, 1, 2, 2, 8, 4, step);
    ai_pc(2, 2, 1, 1, 0, 0, 0, 4, step);
    //  dig_2
    ai_pc(0, 2, 1, 1, 2, 0, 6, 4, step);
    ai_pc(2, 0, 1, 1, 0, 2, 2, 4, step);
}

function ai_pc(a, b, c, d, e, f, x, z, step) {
    if (step == 2) {
        ai_pc_step2_part2(a, b, c, d, e, f, x, z);
    }
    if (step == 3) {
        ai_pc_step3_and_step4_part2(a, b, c, d, e, f, x, z, step);
    }
    if (step == 4) {
        ai_pc_step3_and_step4_part2(a, b, c, d, e, f, x, z, step);
    }
    if (step == 10) {
        ai_pc_check_win(a, b, c, d, e, f, x, z);
    }
}

function ai_pc_step2_part2(a, b, c, d, e, f, x, z) {
    const id_game = document.querySelectorAll("#id_game");

    if (game[a][b] == 3 && game[c][d] == 3 && game[e][f] == 0) {
        id_game[x].classList.remove('game');
        id_game[x].classList.add('game2');
    }
    else if (game[a][b] == 3 && game[c][d] == 3 && game[e][f] == 4) {
        startFunctionOnlyOneTime++;
        if (startFunctionOnlyOneTime < 2) {
            ai_pc_step2_part3_whenWeHave1RedSquare();
        }
    }
    else if (game[a][b] == 3 && game[c][d] == 0 && game[e][f] == 3) {
        id_game[z].classList.remove('game');
        id_game[z].classList.add('game2');
    }
    else if (game[a][b] == 3 && game[c][d] == 4 && game[e][f] == 3) {
        startFunctionOnlyOneTime++;
        if (startFunctionOnlyOneTime < 2) {
            ai_pc_step2_part3_whenWeHave1RedSquare();
        }
    }
}

function ai_pc_step2_part3_whenWeHave1RedSquare() {
    const id_game = document.querySelectorAll("#id_game");
    for (i = 0; i < id_game.length; i++) {
        if (id_game[i].classList.contains('game2') == true) {
            let game_key = id_game[i].getAttribute("all_lengths");

            switch (game_key) {
                case '0':
                    ai_pc_step2_part3_check_and_remove_classlist(2, 6, 8);
                    return;
                case '1':
                    ai_pc_step2_part3_check_and_remove_classlist(0, 2, 4);
                    return;
                case '2':
                    ai_pc_step2_part3_check_and_remove_classlist(0, 6, 8);
                    return;
                case '3':
                    ai_pc_step2_part3_check_and_remove_classlist(0, 4, 6);
                    return;
                case '4':
                    ai_pc_step2_part3_check_and_remove_classlist(1, 3, 5, 7);
                    return;
                case '5':
                    ai_pc_step2_part3_check_and_remove_classlist(2, 4, 8);
                    return;
                case '6':
                    ai_pc_step2_part3_check_and_remove_classlist(0, 2, 8);
                    return;
                case '7':
                    ai_pc_step2_part3_check_and_remove_classlist(4, 6, 8);
                    return;
                case '8':
                    ai_pc_step2_part3_check_and_remove_classlist(4, 6, 2, 0);
                    return;
            }
        }
    }
}

function ai_pc_step2_part3_check_and_remove_classlist(a, b, c, d, e, f, g, h) {
    const id_game = document.querySelectorAll("#id_game");
    let combination = [a, b, c, d, e, f, g, h];
    let filtered = combination.filter(function (el) {
        return el != null;
    });

    let random = Math.floor(Math.random() * filtered.length);
    let comb1 = combination[random];

    if (id_game[comb1].classList.contains('game') == true) {
        id_game[comb1].classList.remove('game');
        id_game[comb1].classList.add('game2');
    }
    else {
        for (let i = 1; i <= combination.length; i++) {
            let comb2 = combination[random + i];
            let comb3 = combination[random - i];
            if (comb2 != undefined) {
                if (id_game[comb2].classList.contains('game') == true) {
                    id_game[comb2].classList.remove('game');
                    id_game[comb2].classList.add('game2');
                    return;
                }
            }
            else if (comb2 == undefined && comb3 != undefined) {
                if (id_game[comb3].classList.contains('game') == true) {
                    id_game[comb3].classList.remove('game');
                    id_game[comb3].classList.add('game2');
                    return;
                }
            }
        }
    }
}

function ai_pc_step2_part4_mistakeUser() {
    //ai_pc_step2_part2(game[x][x], game[x][x], game[x][x], game[x][x], game[x][x]);
    ai_pc_step2_part5_mistakeUser(1, 0, 0, 1, 1, 0, 2, 1);
    ai_pc_step2_part5_mistakeUser(0, 1, 1, 2, 2, 1, 1, 2);

    ai_pc_step2_part5_mistakeUser(0, 0, 2, 1, 0, 1, 2, 0);
    ai_pc_step2_part5_mistakeUser(0, 2, 1, 0, 0, 0, 1, 2);
    ai_pc_step2_part5_mistakeUser(0, 1, 2, 2, 0, 2, 2, 1);
    ai_pc_step2_part5_mistakeUser(1, 0, 2, 2, 0, 0, 2, 1);
    ai_pc_step2_part5_mistakeUser(2, 0, 1, 2, 2, 0, 0, 1);
}

function ai_pc_step2_part5_mistakeUser(a, b, c, d, e, f, x, z) {
    if (game[a][b] == 3 && game[c][d] == 3 || game[e][f] == 3 && game[x][z] == 3) {
        startFunctionOnlyOneTime++;
        if (startFunctionOnlyOneTime < 2) {
            ai_pc_step2_part3_whenWeHave1RedSquare();
        }
    }
}


function ai_pc_step3_and_step4_part2(a, b, c, d, e, f, x, z, step) {
    const id_game = document.querySelectorAll("#id_game");
    chekIf_step3_step4_done.push(1);

    if (game[a][b] == 4 && game[c][d] == 4 && game[e][f] == 0) {
        add_red_squire(x, id_game);
    }
    else if (game[a][b] == 4 && game[c][d] == 0 && game[e][f] == 4) {
        add_red_squire(z, id_game);
    }

    if (chekIf_step3_step4_done.length == 16) {
        winCombination(step);
    }
    if (chekIf_step3_step4_done.length > 15) {
        if (game[a][b] == 3 && game[c][d] == 3 && game[e][f] == 0) {
            add_red_squire(x, id_game);
        }
        else if (game[a][b] == 3 && game[c][d] == 0 && game[e][f] == 3) {
            add_red_squire(z, id_game);
        }
    }

    if (chekIf_step3_step4_done.length == 32) {
        winCombination(step);
    }
    if (chekIf_step3_step4_done.length > 31) {
        startFunctionOnlyOneTime++;
        if (startFunctionOnlyOneTime < 2) {
            if (step == 3) {
                ai_pc_step2_part3_check_and_remove_classlist(0, 2, 6, 8);
            }
            if (step == 4) {
                ai_pc_step2_part3_check_and_remove_classlist(0, 1, 2, 3, 4, 5, 6, 7, 8);
            }
        }
    }
};

function ai_pc_check_win(a, b, c, d, e, f) {
    if (chekIf_winCombination_done < 2) {
        if (game[a][b] == 3 && game[c][d] == 3 && game[e][f] == 3) {
            chekIf_winCombination_done++;
            console.log(chekIf_winCombination_done);
            if (chekIf_winCombination_done < 2) {
                craeteElement("You win");
                console.log("You win");
                return 'finish';
            }
        }
        else if (game[a][b] == 4 && game[c][d] == 4 && game[e][f] == 4) {
            chekIf_winCombination_done++;
            console.log(chekIf_winCombination_done);
            if (chekIf_winCombination_done < 2) {
                craeteElement("You lose");
                console.log("You lose");
                return 'finish';
            }
        }
    }
}

function craeteElement(result) {
    let out = document.createElement('div');
    if (result == "You win") {
        out.innerHTML = result;
    }
    else if (result == "You lose") {
        out.innerHTML = result;
    }
    else {
        out.innerHTML = result;
    }
    out.classList.add('result');
    document.querySelector('.out20').before(out);

    bt_restart.innerHTML = "Restart game";
    bt_restart.classList.add('bt_restart');
    document.querySelector('.result').appendChild(bt_restart);
    return;
}

bt_restart.onclick = () => {
    const result = document.querySelector('.result');
    out20.innerHTML = "";
    result.remove();
    game = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    startFunctionOnlyOneTime = 0;
    chekIf_step3_step4_done = [];
    chekIf_winCombination_done = 0;

    drawPage();
}






function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


// 2players
// function changeValue_moveUser() {
//     const out20_change = document.querySelectorAll(".game");
//     let z = 0;
//     for (let i = 0; i < out20_change.length; i++) {

//         out20_change[i].onclick = function value() {
//             let game_lengthArr = this.getAttribute("game_lengthArr");
//             let game_key = this.getAttribute("game_key");
//             if (z % 2) {
//                 if (this.classList == "game") {
//                     this.classList.remove('game');
//                     this.classList.add('game2');
//                     game[game_lengthArr][game_key] = 4;
//                     z++;
//                 }
//             }
//             else {
//                 if (this.classList == "game") {
//                     this.classList.remove('game');
//                     this.classList.add('game1');
//                     game[game_lengthArr][game_key] = 3;
//                     z++;
//                 }
//             }
//         }
//     }
// }