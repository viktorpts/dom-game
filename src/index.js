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

    function onPlayerAttack() {
        enemies.forEach(e => e.element.classList.add('targettable'));
    }
})());
