(function($){
    $.fn.puissance = function(options)
    {
        let defauts = {
            'nb_col': 7,
            'nb_line': 6,
            'J1': 'Joueur 1',
            'J2': 'Joueur 2',
        };

        let params = $.extend(defauts, options);

        $("#container").html("<h1 id=\"title\">PUISSANCE 4</h1>\n");
        $("<div id='parameters'></div>").insertAfter("h1");
        $("<input id='player1' type='text' maxlength='9' placeholder='Nom du joueur 1' />").appendTo("#parameters");
        $("<select id='p1_color'><option selected='selected' value='yellow'>Jaune</option>" +
            "<option value='green'>Vert</option>" +
            "<option value='red'>Rouge</option>" +
            "<option value='blue'>Bleu</option>" +
            "<option value='purple'>Violet</option>" +
            "<option value='pink'>Rose</option></select><br>").insertAfter("#player1");
        // $("<label id='labelJ1' for='p1_color'>Couleur : </label>").insertAfter("#player1");
        // $("<input id='p1_color' type='color' value='#ffff00'/>").insertAfter("#labelJ1");
        $("<br><input id='player2' type='text' maxlength='9' placeholder='Nom du joueur 2'/>").insertAfter("#p1_color");
        $("<select id='p2_color'><option value='yellow'>Jaune</option>" +
            "<option value='green'>Vert</option>" +
            "<option selected='selected' value='red'>Rouge</option>" +
            "<option value='blue'>Bleu</option>" +
            "<option value='purple'>Violet</option>" +
            "<option value='pink'>Rose</option>" +
            "</select><br>").insertAfter("#player2");
        // $("<label id='labelJ2' for='p2_color'>Couleur : </label>").insertAfter("#player2");
        // $("<input id='p2_color' type='color' value='#ff0000'/>").insertAfter("#labelJ2");
        $("<br><input id='columns' type='text' maxlength='2'  placeholder='Nb line' />").insertAfter("#p2_color");
        $("<input id='lines' type='text' maxlength='2' placeholder='Nb col' />").insertAfter("#columns");
        $("<br><input id='play' type='submit' value='Jouer'/>").insertAfter("#lines");
        $("<br><input id='replay' type='submit' value='Nouvelle partie'/>").insertAfter("#play");
        $("<br><input id='undo' type='submit' value='Annuler le coup precedent' />").insertAfter("#replay");

        $('#play').on('click',function () {
            let valNameJ1 = $('#player1').val();
            let valNameJ2 = $('#player2').val();
            let nameJ1 = valNameJ1;
            let nameJ2 = valNameJ2;
            if (!valNameJ1) {
                nameJ1 = params.J1;
            }
            else {
                nameJ1 = valNameJ1;
            }

            if (!valNameJ2) {
                nameJ2 = params.J2;
            }
            else {
                nameJ2 = valNameJ2;
            }
            console.log('Nom du joueur 1 :' + nameJ1);
            console.log('Nom du joueur 2 :' + nameJ2);

            let colorJ1 = $('#p1_color').val();
            let colorJ2 = $('#p2_color').val();
            console.log('Couleur joueur 1 :' + colorJ1);
            console.log('Couleur joueur 2 :' + colorJ2);

            let lines = $('#lines').val();
            parseInt(lines);
            let nbLines = lines;
            if (!lines) {
                nbLines = params.nb_line;
            }
            else {
                nbLines = lines;
            }

            let columns = $('#columns').val();
            parseInt(columns);
            let nbColumns = columns;
            if (!columns) {
                nbColumns = params.nb_col;
            }
            else {
                nbColumns = columns;
            }

            console.log('Nombre de lignes = ' + nbLines);
            console.log('Nombre de colonnes = ' + nbColumns);

            if (colorJ1 !== colorJ2) {
                if (nameJ1 !== nameJ2) {
                    $('#play').hide();
                    $('body').append('<div id="DIV"></div>');
                    $('#DIV').append("<table></table>");
                    for (let i = 0; i < nbLines; i++) {
                        $("table").append("<tr id='" + i + "tr'></tr>");
                        for (let j = 0; j < nbColumns; j++) {
                            let td = $("<td class='none'></td>");
                            td.attr("y", i);
                            td.attr("x", j);
                            $("#" + i + "tr").append(td);
                        }
                    }
                    $("<br><span id='who_turn'>" + nameJ1 + " &agrave; toi de jouer !</span>").css('color', colorJ1).insertAfter('#undo');
                }
                else {
                    alert("Les deux joueurs ne peuvent pas avoir le meme nom !")
                }
            } else {
                alert("Les deux joueurs ne peuvent pas avoir la meme couleur !");
            }

            let player_turn = 1;

            $('td').on('click',function () {
                const x = $(this).attr('x');
                const posX = coin(x);
                console.log(posX);
                let index = posX.length - 1;
                let drop = posX.eq(index);

                function coin(i) {
                    return $('table').find(`[x="${i}"]`);
                }

                // function fix_bottom(j) {
                //     return $('table').find(`[y="${j}"]`);
                // }

                if ((player_turn % 2) === 1) {
                    while (drop && !drop.hasClass('none') && index >= 0) {
                        index--;
                        drop = posX.eq(index);
                    }

                    console.log("Au tour de " + nameJ1);
                    $('#who_turn').html(nameJ2 + ' &agrave; toi de jouer !').css('color', colorJ2);
                    drop.removeClass('none').css('background-color', colorJ1);
                    drop.addClass('full');
                }
                else {
                    while (drop && !drop.hasClass('none') && index >= 0) {
                        index--;
                        drop = posX.eq(index);
                    }

                    console.log("Au tour de " + nameJ2);
                    $('#who_turn').html(nameJ1 + ' &agrave; toi de jouer !').css('color', colorJ1);
                    drop.removeClass('none').css('background-color', colorJ2);
                    drop.addClass('full');
                }

                // RECODE

                // if ((player_turn % 2) === 1) {
                //     while (drop && !drop.hasClass('none') && index >= 1) {
                //         index--;
                //         drop = posX.eq(index);
                //     }
                //
                //     console.log("Au tour de " + nameJ1);
                //     $('#who_turn').html(nameJ2 + ' &agrave; toi de jouer !').css('color', colorJ2);
                //     drop.removeClass('none').css('background-color', colorJ1);
                //     drop.addClass('full');
                // }
                // else {
                //     while (drop && !drop.hasClass('none') && index >= 1) {
                //         index--;
                //         drop = posX.eq(index);
                //     }
                //
                //     console.log("Au tour de " + nameJ2);
                //     $('#who_turn').html(nameJ1 + ' &agrave; toi de jouer !').css('color', colorJ1);
                //     drop.removeClass('none').css('background-color', colorJ2);
                //     drop.addClass('full');
                // }

                player_turn++;
            });
        });

        $("#replay").on('click', function() {
            location.reload();
        })
    };

})(jQuery);
$("#container").puissance();