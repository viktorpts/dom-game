/* globals e */

function createCharacter(name, hp, dmg) {
    const character = {
        alive: true,
        name,
        maxHp: hp,
        hp,
        dmg,
        attack,
        takeDamage
    };

    const element = createCharacterCard(character);

    return {
        character,
        element
    };

    function attack(target) {
        console.log(`${character.name} attacks ${target.name} for ${character.dmg}`);
        target.takeDamage(character.dmg);
    }

    function takeDamage(incomingDmg) {
        console.log(`${character.name} took ${incomingDmg} damage`);
        character.hp = Math.max(character.hp - incomingDmg, 0);
        if (character.hp == 0) {
            character.alive = false;
        }
        element.update();
    }
}

function createCharacterCard(character) {
    const stats = {
        hp: e('span', {}, `${character.hp} / ${character.maxHp}`),
    };

    const element = e('article', { className: 'character-card' },
        e('div', { className: 'portrait' }, e('img', { src: 'assets/player.png' })),
        e('div', { className: 'description' }, 
            e('h3', {}, character.name),
            e('ul', { className: 'stats'}, 
                e('li', {}, 'HP: ', stats.hp),
                e('li', {}, 'Damage: ', e('span', {}, character.dmg)),
            )
        )
    );
    element.update = update;

    return element;

    function update() {
        stats.hp.textContent = `${character.hp} / ${character.maxHp}`;
        if (character.alive == false) {
            element.classList.add('wasted');
        }
    }
}

const player = createCharacter('Player', 100, 25);
const enemy = createCharacter('Bad Guy', 50, 10);

document.getElementById('player').appendChild(player.element);
document.getElementById('enemies').appendChild(enemy.element);

window.game = {
    player,
    enemy
};