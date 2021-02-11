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

    const encounterController = game.encounterController(enemySlot, player);

    const controls = e('div', { id: 'controls' },
        e('button', { onClick: encounterController.onPlayerAttack }, 'Attack')
    );
    disableControls();

    playerSlot.appendChild(player.element);
    playerSlot.appendChild(controls);
    enemies.forEach(e => enemySlot.appendChild(e.element));

    game.events.onBeginTurn.subscribe(onBeginTurn);

    // Begin encounter as player
    encounterController.enter(enemies);

    function onBeginTurn(controller) {
        if (controller.character.ai) {
            console.log('AI controlled');
            disableControls();
            
        } else {
            console.log('Player turn');
            enableControls();
        }
    }

    function enableControls() {
        [...controls.children].forEach(c => c.disabled = false);
    }

    function disableControls() {
        [...controls.children].forEach(c => c.disabled = true);
    }
})());
