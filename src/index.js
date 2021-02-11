/* globals e, game */


Object.assign(window.game, (function () {
    const playerSlot = document.getElementById('player');
    const enemySlot = document.getElementById('enemies');

    const player = game.createCharacter('player');
    const enemies = [
        game.createCharacter('rat'),
        game.createCharacter('skeleton'),
        game.createCharacter('rat'),
    ];

    const controls = e('div', { id: 'controls' },
        e('button', { onClick: onPlayerAttack }, 'Attack')
    );

    playerSlot.appendChild(player.element);
    playerSlot.appendChild(controls);
    enemies.forEach(e => enemySlot.appendChild(e.element));

    enemySlot.addEventListener('click', selectTarget);

    function selectTarget({ target }) {
        while (target != enemySlot && target.classList.contains('targettable') == false) {
            target = target.parentNode;
        }
        if (target.classList.contains('targettable')) {
            const selected = enemies.find(e => e.element == target);
            if (selected) {
                player.character.attack(selected.character);
            }
            disableTargetting();
        } else {
            disableTargetting();
        }
    }

    function onPlayerAttack() {
        enableTargetting();
    }

    function enableTargetting() {
        enemies.filter(e => e.character.alive).forEach(e => e.element.classList.add('targettable'));
    }

    function disableTargetting() {
        enemies.forEach(e => e.element.classList.remove('targettable'));
    }
})());
