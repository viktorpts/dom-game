/* globals e, game */

Object.assign(window.game, (function () {
    return {
        encounterController
    };

    function encounterController(enemySlot, player) {
        let characters = [];
        let initiative;

        enemySlot.addEventListener('click', selectTarget);

        return {
            enter,
            onPlayerAttack,
            onEnemyAttack,
            selectTarget
        };

        function onPlayerAttack() {
            enableTargetting(player);
        }

        function onEnemyAttack() {
            enableTargetting();
        }

        function selectTarget({ target }) {
            console.log(target);
            while (target && target.classList && target.classList.contains('targettable') == false) {
                target = target.parentNode;
            }
            if (target && target.classList && target.classList.contains('targettable')) {
                const selected = characters.find(e => e.element == target);
                if (selected) {
                    characters[initiative].character.attack(selected.character);
                }
                disableTargetting();
                nextTurn();
            } else {
                disableTargetting();
            }
        }

        function enableTargetting(source) {
            characters
                .filter(c => c.character.alive && c != source)
                .forEach(c => c.element.classList.add('targettable'));
        }

        function disableTargetting() {
            characters.forEach(e => e.element.classList.remove('targettable'));
        }

        function nextTurn() {
            if (player.character.alive == false) {
                game.events.onEncounterEnd(false);
            } else if (characters.filter(c => c.character.alive).length == 1) {
                game.events.onEncounterEnd(true);
            }

            do {
                initiative = (initiative + 1) % characters.length;
            } while (characters[initiative].character.alive == false );

            characters.forEach(c => c.element.classList.remove('active'));
            characters[initiative].element.classList.add('active');
            game.events.onBeginTurn(characters[initiative]);
        }

        function enter(enemies) {
            characters = [player, ...enemies];
            initiative = -1;

            nextTurn();
        }
    }
})());