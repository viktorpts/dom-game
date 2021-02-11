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
            onPlayerAttack
        };

        function onPlayerAttack() {
            enableTargetting(player);
        }

        function onEnemyAttack() {
            enableTargetting();
        }

        function selectTarget({ target }) {
            while (target != enemySlot && target.classList.contains('targettable') == false) {
                target = target.parentNode;
            }
            if (target.classList.contains('targettable')) {
                const selected = characters.find(e => e.element == target);
                if (selected) {
                    player.character.attack(selected.character);
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
            initiative = (initiative + 1) % characters.length;
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