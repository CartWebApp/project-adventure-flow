document.addEventListener('DOMContentLoaded', () => {
    const dialogues = [
        "Rich dude ded",
        "He left his treasure to whoever finds it",
        "I need money",
        "I am dedicated to fight my way to the money",
        "I am too weak and must train first",
        "I will train every day",
        "You see an old man walking the streets"
    ];
    class Character {
        constructor(name, health, attack, defense) {
            this.name = name;
            this.health = health;
            this.attack = attack;
            this.defense = defense;
        }

        takeDamage(damage) {
            const actualDamage = Math.max(0, damage - this.defense); // Damage can't go below 0
            this.health -= actualDamage;
            return actualDamage;
        }

        // Method to perform an attack on another character
        attackOpponent(opponent) {
            const damage = this.attack; // Base damage from the character
            const damageDealt = opponent.takeDamage(damage);
            return damageDealt;
        }
    }
    const player1 = new Character("Swordsman-great", 100, 25, 10);
    const player2 = new Character("Swordsman-short", 100, 15, 5);
    const player3 = new Character("mage-wand", 80, 25, 5);
    const player4 = new Character("mage-staff", 80, 30, 5);
    const enemy1 = new Character('Goblin', 50, 5, 5);

    const branchDialogues = {
        mage: [
            "The class of mage has strong long ranged abilities",
            "But you will not be able to use every type of magic",
            "You must choose between two weapons"
        ],
        swordsman: [
            "The class of swordsman has very powerful close range abilities",
            "But depending on your weapon you will have to choose speed or damage",
            "You must choose between two weapons"
        ],
        evil: [
            "Go away old dude, or else ima give you a freaking packet yo! He gets sad and runs away crying.",
            "You continue your training, and an evil man apears! I see that you're heart is evil. Work for me, I can help you become stronger.",
            "You agree to work for him. You chose two different weapons."
        ],
        short_sword: [
            "filler",//skips first line
            "Great choice",
            "I shall now lead you to a place to advance your skills",
            "Your mentor leads you to an academy to train you",
            "You practice the art of quick and agile attacks",
            "While your their you find a fellow classmate named Link",
            "You become friends and start to train together",
            "Epic training montage",
            "You are ready your mentor says",
            "There is nothing more I can teach you",
            "I'm afraid to leave though",
            "The world outside of what I know i don't know if I can handle it",
            "At that moment you see someone walking towards you",
            "Dad?",
            "Yo we need the money man go and leave us you'll be fine cuh",
            "Filled with motivation you set out with your friend saying goodbye to your mentor and family"
        ],
        great_sword: [
            "filler",//skips first line
            "Fantastic choice",
            "I shall now lead you to a place to advance your skills",
            "Your mentor leads you to an academy to train you",
            "You practice the art of huge devastating attacks",
            "While your their you find a fellow classmate named Link",
            "You become friends and start to train together",
            "Epic training montage",
            "You are ready your mentor says",
            "There is nothing more I can teach you",
            "I'm afraid to leave though",
            "The world outside of what I know i don't know if I can handle it",
            "At that moment you see someone walking towards you",
            "Dad?",
            "Yo we need the money man go and leave us you'll be fine cuh",
            "Filled with motivation you set out with your friend saying goodbye to your mentor and family"

        ],
        evil_magic: [
            "Great choice",
            "You can now destroy people from long range",
            "Training time",
            "Evil training montage",
            "You now need to pick a way to get to train"
        ],
        evil_scythe: [
            "Great choice",
            "You can now demolish people from close-mid range",
            "Training time",
            "Evil training montage",
            "You now need to pick a way to get to train"
        ],
        evil_trainingOne: [
            "You start to train by beating up criminals",
            "You get praised as a hero",
            "Still committed murder so police are called",
            "Police are called on you and they find you",
            "You gotta find a place to hide!"
        ],
        evil_trainingTwo: [
            "You decide to beating up poor homeless people 🔥",
            "No one really cares",
            "You go out and find mentor",
            "He tells you, Good stuff young blood",
            "The mentor introduces you to his other student",
            "Sat Ann",
            "You will have my pupil accompany you to the treasure"
        ],
        evil_trainingThree: [
            //skip
            "You decide to train by fighting anyone who crosses your path.",
            "The cops are being called on you.",
            "You start to notice an alarming amount of cops.",
            "They now chase you."
        ],
        evil_hidingSewers: [
            //skip
            "You run back to the saftey of the sewers",
            "You hide in"
        ],
        evil_hidingSewersDrink: [
            "Why would you drink that?",
            "You really drank sewer water?",
            "I MIGHT have to kill you now",
            "Naaaaaaaaaaaaaaaah"
        ],
        evil_hidingSewersRun: [
            "As you start to run away, you find your mentor!",
            "Good stuff young blud",
            "The mentor introduces you to his other student",
            "Sat Ann",
            "You will have my pupil accompany you to the treasure",
            "Its time to go off and find the tresure!",
            "Now you have to pick how to get there...",
            () => evil_showTravelChoices() // Add call to evil_showTravelChoices
        ],
        evil_hidingCorpse: [
            "You decide to hide under all the people you have defeated",
            "You wait there all day and night",
            "Once you notice that the coast is clear, you run back to the base",
            "You find your mentor, and he introduces you to his other student",
            "Sat Ann",
            "You will have my pupil accompany you to the tresure",
            "Its time to go off and find the tresure!",
            "Now you have to pick how to get there...",
            () => evil_showTravelChoices() // Add call to evil_showTravelChoices
        ],
        evil_travelFlight: [
            "you see this sea monster, the Kraken...",
            "He is trying to shoot you guys down from the sky.",
            "If you are specialized in dark magic, you are easily able to take him down due to your range",
            "...but if you picked the scythe... you’re gonna have a bad time."
        ],
        evil_travelFlightMagic: [
            "You defeat the boss with ease",
        ],
        evil_travelFlightScythe: [
            "You have defeated boss!",
            "You are very much hurt though..",
            "You decide to rest up for the night and head to the treasure in the morning",
            "As you travel by land, you are going through the forest...",
            "...and you encounter a group of heavily armored, and geared up bandits.",
            "As you inspect their armor, you realize that they have the treasure!",
            "You realize, that you must fight them for this treasure.",
        ],
        evil_travelLand: [
            "As you travel by land",
            "you make your way through the forest.",
            "Suddenly, a group of bandits appears.",
            "They're heavily armored and fully geared up",
            "You take a closer look...",
            "...and realize—they have the treasure",
            "There's no way around it.",
            "You'll have to fight them for it."
        ],
        mage_wand: [
            "filler",//skips this line
            "Your mentor brings you to an academy for magic.",
            "You begin practicing the art of quick and precise spellcasting.",
            "You meet a fellow mage in practice named Tessa Gray",
            "You start talking and become friends",
            "Epic training montage together",
            "You are ready your mentor says",
            "There is nothing more I can teach you",
            "I'm afraid to leave though",
            "The world outside of what I know i don't know if I can handle it",
            "At that moment you see someone walking towards you",
            "Dad?",
            "Yo we need the money man go and leave us you'll be fine cuh",
            "Filled with motivation you set out with your friend saying goodbye to your mentor and family"

        ],
        mage_staff: [
            "filler",//skips this line
            "Your mentor brings you to an academy for magic.",
            "You begin practicing the art of powerful and devastating spells.",
            "You meet a fellow mage in practice named Tessa Gray",
            "You start talking and become friends",
            "Epic training montage together",
            "You are ready your mentor says",
            "There is nothing more I can teach you",
            "I'm afraid to leave though",
            "The world outside of what I know i don't know if I can handle it",
            "At that moment you see someone walking towards you",
            "Dad?",
            "Yo we need the money man go and leave us you'll be fine cuh",
            "Filled with motivation you set out with your friend saying goodbye to your mentor and family"
        ],
        seaTravel: [
            "filler",
            "You are introduced to some pirates who will help you to the treasure",
            "They only request that you help on the ship when needed",
            "You set off for the treasure with you ally saying goodbye to your mentor and Dad",
            "You are at seas for a while with no problems",
            "The captain approaches you and says",
            "We are running out of food we need more is their any way you can help us",
            "If your a mage you are able to conjure food right if not we can just hunt"

        ],
        landTravel: [
            "filler",
            "You find some people who look like they know wat their doing and approach them",
            "You find out that these people are land pirates and are willing to help you traverse the mountains to get to the treasure",
            "You set off with them and start to make your way to the treasure",
            "fight somewhere here",
            "more fighting",
            "eat the people you fought since your low on food",
            "get over the mountains",
            "Find cool weapon",
            "Make your way to the vault",
            "puzzle",
            "You make your way into the vault",
            "You see the treasure infront of you",
            "You see a human shaped figure standing infront of the treasure",
            "Its the old man who died the same old man whos treasure you were after",
            "He starts explaining how he has to make sure you are worthy of his fortune",
            "You notice hundreds of bodies around the vault",
            "You fight",
            "He is giving you trouble and is about to kill you",
            "But then your mentor comes in and saves you at the last second",
            "2v1 ez",
            "You two grab your treasure and start heading home",
            "You've made it home with little to no problems but you realize that there is someone standing outside of your house",
            "You and your mentor approach him",
            "Battle",
            "Now that you have defeated the final challenge what will you do with the treasure"
        ],
        conjure: [
            "filler",
            "Wow thats incredible we don't even have to stop for food now",
            "You make sure everyone is fed and no stops are necessary",
            "We're going to make it to the treasure by tomorrow at this rate",
            "You start to hear a rumbling below you",
            "Everyone starts freaking out",
            "A Kraken appears next to the ship and starts crushing the ship with its tentacles",
            "What do you do"
        ],
        weakKraken: [
            "filler",
            "You are able to defeat the Kraken after a barrage of attacks",
            "Many people on the ship are dead but the ship has not sustained much damage",
            "You talk to the captain and he is still determined to get you to the treasure",
            "You set sail and head for the treasure",
            "You arrive and say bye to your pirate friends",
            "You walk towards the vault and see its defended by a puzzle",
            "Good job you now enter the vault",
            "You see the treasure infront of you",
            "You see a human shaped figure standing infront of the treasure",
            "Its the old man who died the same old man whos treasure you were after",
            "He starts explaining how he has to make sure you are worthy of his fortune",
            "You notice hundreds of bodies around the vault",
            "You fight",
            "He is giving you trouble and is about to kill you",
            "But then Tessa comes in and saves you at the last second",
            "2v1 ez",
            "You two grab your treasure and start heading home",
            "You've made it home with little to no problems but you realize that there is someone standing outside of your house",
            "You and Tessa approach him",
            "Battle",
            "Now that you have defeated the final challenge what will you do with the treasure"
        ],
        powerKraken: [
            "filler",
            "You defeat the Kraken in one huge blow",
            "It took a while to charge up that attack during that time the Kraken destroyed most the ship",
            "No one died though",
            "You talk to the captain",
            "We can reapir it but it will take time",
            "You are forced to pause your adventure and wait for the ship to be repaired",
            "Once the ship is repaired you head towards the treasure",
            "You arrive with no problems along the way you say goodbye to the pirates who helped you and head for the vault",
            "You arrive at the vault and see someone standing infront of it",
            "You aqpproach him",
            "I am the guard for this treasure you must pass me before you get what you desire",
            "Boss fight",
            "once defeated puzzle to solve",
            "Enter the vault",
            "You see the treasure infront of you",
            "You see a human shaped figure standing infront of the treasure",
            "Its the old man who died the same old man whos treasure you were after",
            "He starts explaining how he has to make sure you are worthy of his fortune",
            "You notice hundreds of bodies around the vault",
            "You fight",
            "He is giving you trouble and is about to kill you",
            "But then Tessa comes in and saves you at the last second",
            "2v1 ez",
            "You two grab your treasure and start heading home",
            "You've made it home with little to no problems but you realize that there is someone standing outside of your house",
            "You and Tessa approach him",
            "Battle",
            "Now that you have defeated the final challenge what will you do with the treasure"
        ],
        islandFood: [
            "filler",
            "Theres an island nearby we can get there before nightfall",
            "After 2 hours you arrive at the island",
            "You realize you and Link are the only people strong enough to hunt",
            "You two set out on the island to search for food",
            "On your search you find three things",
            "Berries, monkeys, or a huge monkey boss",
            "You think about it and realize that you have to choose its a higher risk higher reward situation"
        ],
        berries: [
            "filler",
            "You and Link pick berries for everyone",
            "You head back with enough berries for everyone",
            "You give everyone there share",
            "Uh Oh",
            "These berries are deadly and kill half the crew who ate first",
            "You realize that someone is on the island and standing infront of a door",
            "You ask them what their doing",
            "Defending the treasure of course",
            "Can you give it to me",
            "No",
            "battle",
            "puzzle",
            "You make your way into the vault",
            "You see the treasure infront of you",
            "You see a human shaped figure standing infront of the treasure",
            "Its the old man who died the same old man whos treasure you were after",
            "He starts explaining how he has to make sure you are worthy of his fortune",
            "You notice hundreds of bodies around the vault",
            "You fight",
            "He is giving you trouble and is about to kill you",
            "But then Link comes in and saves you at the last second",
            "2v1 ez",
            "You two grab your treasure and start heading home",
            "You've made it home with little to no problems but you realize that there is someone standing outside of your house",
            "You and link approach him",
            "Battle",
            "Now that you have defeated the final challenge what will you do with the treasure"
        ],
        monkey: [
            "filler",
            "Battle",
            "Head back with monkey meat",
            "Some get sick from it everyones okay though",
            "You realize that someone is on the island and standing infront of a door",
            "You ask them what their doing",
            "Defending the treasure of course",
            "Can you give it to me",
            "No",
            "battle",
            "puzzle",
            "You make your way into the vault",
            "You see the treasure infront of you",
            "You see a human shaped figure standing infront of the treasure",
            "Its the old man who died the same old man whos treasure you were after",
            "He starts explaining how he has to make sure you are worthy of his fortune",
            "You notice hundreds of bodies around the vault",
            "You fight",
            "He is giving you trouble and is about to kill you",
            "But then Link comes in and saves you at the last second",
            "2v1 ez",
            "You two grab your treasure and start heading home",
            "You've made it home with little to no problems but you realize that there is someone standing outside of your house",
            "You and link approach him",
            "Battle",
            "Now that you have defeated the final challenge what will you do with the treasure"
        ],
        monkeyBoss: [
            "filler",
            "Battle",
            "Head back with huge dead monkey",
            "Feed everyone with some extra",
            "It was delicous and you had no problems",
            "You realize that someone is on the island and standing infront of a door",
            "You ask them what their doing",
            "Defending the treasure of course",
            "Can you give it to me",
            "No",
            "battle",
            "puzzle",
            "You make your way into the vault",
            "You see the treasure infront of you",
            "You see a human shaped figure standing infront of the treasure",
            "Its the old man who died the same old man whos treasure you were after",
            "He starts explaining how he has to make sure you are worthy of his fortune",
            "You notice hundreds of bodies around the vault",
            "You fight",
            "He is giving you trouble and is about to kill you",
            "But then Link comes in and saves you at the last second",
            "2v1 ez",
            "You two grab your treasure and start heading home",
            "You've made it home with little to no problems but you realize that there is someone standing outside of your house",
            "You and link approach him",
            "Battle",
            "Now that you have defeated the final challenge what will you do with the treasure"
        ],
        end4_death: [
            "You rush in to confront Luci Four, trying to stop his betrayal...",
            "He turns to you slowly, grinning.",
            "With a flick of his finger, a blinding laser hits your chest.",
            "You fall to the ground, vision fading.",
            "You died trying to stop your mentor. The treasure remains behind.",
            "End 4: Death."
        ],
        end5_betrayal: [
            "You and Sat Ann fight together.",
            "Luci Four escapes in the chaos, never to be seen again.",
            "Sat Ann looks around, shaken but alive.",
            "You both made it through... barely.",
            "End 5: Betrayed by your evil mentor, but you survived."
        ],
        evil_treasureSplit: [
            "Sat Ann nods at you.",
            "\"You kept your word. Respect.\"",
            "You split the treasure evenly.",
            "Both of you walk off into the distance.",
            "You may see each other again... maybe.",
            "Ending: Evil allies."
        ],
        evil_treasureStealFail: [
            "You try to walk off with the loot.",
            "Sat Ann draws his gun and shoots without hesitation.",
            "Your greed got you killed.",
            "End 4: Death."
        ],
        evil_treasureStealFight: [
            "Sat Ann glares, but you move first.",
            "You both clash violently.",
            "You barely manage to win.",
            "Sat Ann falls, defeated.",
            "You escape with 25% of the treasure: $250 billion.",
            "Was it worth it?"
        ],
        evil_fightShrek: [
            "You face Shrek, the big, strong, and scary boss.",
            "He asks why you are on his island.",
            "You explain you are looking for the treasure.",
            "Shrek says, 'You gotta get past me first!'",
            "You and your allies prepare for battle.",
            "After a tough fight, you defeat Shrek.",
            "Behind him lies the treasure, but a puzzle blocks your way."
        ],
        evil_puzzleSolved: [
            "You solve the puzzle and the treasure vault opens.",
            "Mr. Rich appears, but your mentor shoots him in the head.",
            "You must decide whether to avenge Mr. Rich or go along with your mentor's plan."
        ],
        evil_avengeRich: [
            "You confront your mentor for killing Mr. Rich.",
            "A fierce battle ensues.",
            "Your mentor zaps you with his laser finger.",
            "You die trying to stop him.",
            "End 4: Death."
        ],
        evil_followMentor: [
            "You decide to follow your mentor's plan.",
            "You and your mentor claim the treasure and start heading home.",
            "On the way, a man tries to steal the treasure but is defeated by your mentor.",
            "A large group of bandits appears, and your mentor tries to leave you and Sat Ann to fight them."
        ],
        evil_betrayedByMentor: [
            "You and Sat Ann fight off the bandits while your mentor escapes.",
            "You never see Luci Four again.",
            "End 5: Betrayed by your evil mentor."
        ],
        evil_teamUpWithSatAnn: [
            "You and Sat Ann team up to fight the bandits.",
            "After a grueling battle, you both emerge victorious but severely injured.",
            "As you walk back, another group of bandits appears, drawn by the power of your scythe.",
            "You fight valiantly but are overwhelmed by their numbers.",
            "End 4: Death."
        ],
        evil_splitTreasure: [
            "You and Sat Ann split the treasure evenly.",
            "You part ways, open to seeing each other again.",
            "Ending: Evil allies."
        ],
        evil_stealTreasure: [
            "You try to take all the treasure for yourself.",
            "Sat Ann draws his gun and demands his share.",
            "You fight Sat Ann and barely manage to win.",
            "You escape with 25% of the treasure: $250 billion.",
            "Was it worth it?"
        ]
    };


    let currentDialogueIndex = 0;
    let currentBranch = null;
    let isTyping = false;
    const typingSpeed = 0;
    const typingAudio = new Audio('/assets/sounds/talking-three.mp3');

    const dialogueElement = document.getElementById('dialogue');
    const nextBtn = document.getElementById('next-btn');
    const optionBtns = document.getElementById('option-btns');
    const imageContainer = document.getElementById('image-container');

    const button = document.getElementById("mage-btn");
    const image = document.getElementById("image-container");

    document.getElementById('mage-btn').addEventListener('click', () => {
        if (isTyping) return;

        currentBranch = 'mage';
        updateChoicesSidebar('Mage yay!');
        currentDialogueIndex = 0;
        optionBtns.style.display = 'none';
        nextBtn.style.display = 'block';
        imageContainer.style.display = 'block'; // Ensure the image is visible
        imageContainer.src = "/assets/char/moistWizard.png"; // Set the mage image
        typeText(branchDialogues.mage[currentDialogueIndex]);
    });

    document.getElementById('mage-btn').addEventListener('mouseover', () => {
        imageContainer.src = "/assets/char/moistWizard.png"; // Change image on hover
    });

    document.getElementById('mage-btn').addEventListener('mouseout', () => {
        imageContainer.src = "/assets/char/moist.png";
    });

    function typeText(text, callback) {
        if (!text || typeof text !== 'string') {
            console.error("Invalid text provided to typeText:", text);
            return;
        }
        isTyping = true;
        dialogueElement.innerHTML = ''; // Use innerHTML to support HTML tags
        let charIndex = 0;

        typingAudio.loop = true;
        typingAudio.play();

        const interval = setInterval(() => {
            if (charIndex < text.length) {
                dialogueElement.innerHTML += text[charIndex]; // Append characters with HTML support
                charIndex++;
            } else {
                clearInterval(interval);
                typingAudio.pause();
                typingAudio.currentTime = 0;
                isTyping = false;
                if (callback) callback();
            }
        }, typingSpeed);
    }

    nextBtn.addEventListener('click', () => {
        if (isTyping) return;

        currentDialogueIndex++;

        if (currentBranch) {
            if (!branchDialogues[currentBranch]) {
                console.error(`Invalid branch: ${currentBranch}`);
                return;
            }

            if (currentDialogueIndex >= branchDialogues[currentBranch].length) {
                nextBtn.style.display = 'none';
                optionBtns.style.display = 'block'; // Show options for the next step

                // Show appropriate choices based on the current branch
                if (['evil_trainingOne', 'evil_trainingTwo', 'evil_trainingThree'].includes(currentBranch)) {
                    showRunawayChoices();
                } else if (currentBranch === 'evil_hidingSewers') {
                    showSewerChoices();
                } else if (currentBranch === 'evil_hidingCorpse') {
                    evil_showTravelChoices();
                } else if (currentBranch === 'evil_travelFlight') {
                    showBattleKrakenChoices();
                } else if (currentBranch === 'evil_travelFlightMagic' || currentBranch === 'evil_travelFlightScythe') {
                    showSatAnnChoices();
                } else if (currentBranch === 'evil_followMentor') {
                    showTreasureChoices();
                } else if (currentBranch === 'evil_puzzleSolved') {
                    showMentorChoices();
                }
            } else {
                typeText(branchDialogues[currentBranch][currentDialogueIndex], () => {
                    // Trigger specific events based on dialogue index
                    if (currentBranch === 'mage' && currentDialogueIndex === 2) {
                        showWeaponChoices();
                    } else if (currentBranch === 'swordsman' && currentDialogueIndex === 2) {
                        showSwordsmanWeaponChoices();
                    } else if (currentBranch === 'evil' && currentDialogueIndex === branchDialogues.evil.length - 1) {
                        showEvilWeaponChoices();
                    } else if (currentBranch === 'evil_hidingSewersRun' && currentDialogueIndex === branchDialogues.evil_hidingSewersRun.length - 1) {
                        evil_showTravelChoices();
                    }
                });
            }
        } else {
            if (currentDialogueIndex >= dialogues.length) {
                nextBtn.style.display = 'none';
                typeText("Choose your path:", () => {
                    optionBtns.style.display = 'block';
                    image.src = "/assets/char/moist.png"; // Set the image to one specific image
                });
            } else {
                typeText(dialogues[currentDialogueIndex]);
            }
        }
    });

    document.getElementById('swordsman-btn').addEventListener('click', () => {
        if (isTyping) return;

        currentBranch = 'swordsman';
        updateChoicesSidebar('Swordsman yay!');
        currentDialogueIndex = 0;
        optionBtns.style.display = 'none';
        nextBtn.style.display = 'block';
        imageContainer.style.display = 'block'; // Ensure the image is visible
        imageContainer.src = "/assets/char/moistSword.png"; // Set the swordsman image
        typeText(branchDialogues.swordsman[currentDialogueIndex]);
    });

    document.getElementById('swordsman-btn').addEventListener('mouseover', () => {
        imageContainer.src = "/assets/char/moistSword.png"; // Change image on hover
    });

    document.getElementById('swordsman-btn').addEventListener('mouseout', () => {
        imageContainer.src = "/assets/char/moist.png";
    });
    document.getElementById('evil-btn').addEventListener('click', () => {
        if (isTyping) return;

        currentBranch = 'evil';
        updateChoicesSidebar('You were meant to destroy the sith not join it(Evil yay!)');
        currentDialogueIndex = 0;
        optionBtns.style.display = 'none';
        nextBtn.style.display = 'block';
        imageContainer.style.display = 'block'; // Ensure the image is visible
        imageContainer.src = "/assets/char/moistSad.png"; // Set the evil path image
        typeText(branchDialogues.evil[currentDialogueIndex]);
    });

    document.getElementById('evil-btn').addEventListener('mouseover', () => {
        imageContainer.src = "/assets/char/moistSad.png"; // Change image on hover
    });

    document.getElementById('evil-btn').addEventListener('mouseout', () => {
        imageContainer.src = "/assets/char/moist.png";
    });

    function showWeaponChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = '';

        const staffBtn = document.createElement('button');
        staffBtn.textContent = 'Choose the Staff';
        staffBtn.addEventListener('click', () => {
            typeText('You chose the Staff!', () => {
                currentBranch = 'mage_staff';
                updateChoicesSidebar('Chose the Staff for powerful spells');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const wandBtn = document.createElement('button');
        wandBtn.textContent = 'Choose the Wand';
        wandBtn.addEventListener('click', () => {
            typeText('You chose the Wand!', () => {
                currentBranch = 'mage_wand';
                updateChoicesSidebar('Chose the Wand for quick spellcasting');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(staffBtn);
        optionBtns.appendChild(wandBtn);
    }

    function showBattleKrakenChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = '';

        const powerBtn = document.createElement('button');
        powerBtn.textContent = 'You chose to charge up a big attack';
        powerBtn.addEventListener('click', () => {
            typeText('You chose to charge up a big attack', () => {
                currentBranch = 'powerKraken';
                updateChoicesSidebar('Chose to charge up a big attack against the Kraken');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const weakBtn = document.createElement('button');
        weakBtn.textContent = 'You chose to spam weak attacks';
        weakBtn.addEventListener('click', () => {
            typeText('You chose to spam weak attacks', () => {
                currentBranch = 'weakKraken';
                updateChoicesSidebar('Chose to spam weak attacks against the Kraken');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(powerBtn);
        optionBtns.appendChild(weakBtn);
    }

    function showEndings() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = '';

        const selfishBtn = document.createElement('button');
        selfishBtn.textContent = 'You chose to take the money all for yourself';
        selfishBtn.addEventListener('click', () => {
            typeText('You chose to take the money all for yourself', () => {
                currentBranch = 'end1';
                updateChoicesSidebar('Chose to keep the treasure for yourself');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const familyBtn = document.createElement('button');
        familyBtn.textContent = 'You chose to share with your family';
        familyBtn.addEventListener('click', () => {
            typeText('You chose to share with your family', () => {
                currentBranch = 'end2';
                updateChoicesSidebar('Chose to share the treasure with your family');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const everyoneBtn = document.createElement('button');
        everyoneBtn.textContent = 'You chose to share with everyone you know';
        everyoneBtn.addEventListener('click', () => {
            typeText('You chose to share with everyone you know', () => {
                currentBranch = 'end3';
                updateChoicesSidebar('Chose to share the treasure with everyone');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(selfishBtn);
        optionBtns.appendChild(familyBtn);
        optionBtns.appendChild(everyoneBtn);
    }

    function showEvilTrainingChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = ''; // Clear previous options

        const evilTrainOne = document.createElement('button');
        evilTrainOne.textContent = 'Defeat criminals for practice';
        evilTrainOne.addEventListener('click', () => {
            typeText('You chose to defeat criminals for practice!', () => {
                currentBranch = 'evil_trainingOne';
                updateChoicesSidebar('Chose to train by defeating criminals');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
                typeText(branchDialogues.evil_trainingOne[currentDialogueIndex]); // Start the selected branch
            });
        });

        const evilTrainTwo = document.createElement('button');
        evilTrainTwo.textContent = 'Destroy poor helpless people 🔥';
        evilTrainTwo.addEventListener('click', () => {
            typeText('You chose to destroy poor helpless people! (That\'s pretty evil)', () => {
                currentBranch = 'evil_trainingTwo';
                updateChoicesSidebar('Chose to train by destroying helpless people');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
                typeText(branchDialogues.evil_trainingTwo[currentDialogueIndex]); // Start the selected branch
            });
        });

        const evilTrainThree = document.createElement('button');
        evilTrainThree.textContent = 'Defeat anyone you see';
        evilTrainThree.addEventListener('click', () => {
            typeText('You chose to defeat anyone you see!', () => {
                currentBranch = 'evil_trainingThree';
                updateChoicesSidebar('Chose to train by defeating anyone in your path');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
                typeText(branchDialogues.evil_trainingThree[currentDialogueIndex]); // Start the selected branch
            });
        });

        optionBtns.appendChild(evilTrainOne);
        optionBtns.appendChild(evilTrainTwo);
        optionBtns.appendChild(evilTrainThree);
    }

    function showRunawayChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = ''; // Clear previous options

        const runSewersBtn = document.createElement('button');
        runSewersBtn.textContent = 'Run to the sewers';
        runSewersBtn.addEventListener('click', () => {
            typeText('You chose to run to the sewers!', () => {
                currentBranch = 'evil_hidingSewers';
                updateChoicesSidebar('Chose to hide in the sewers');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const runCorpseBtn = document.createElement('button');
        runCorpseBtn.textContent = 'Hide under the corpses';
        runCorpseBtn.addEventListener('click', () => {
            typeText('You chose to hide under the corpses!', () => {
                currentBranch = 'evil_hidingCorpse';
                updateChoicesSidebar('Chose to hide under the corpses');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(runSewersBtn);
        optionBtns.appendChild(runCorpseBtn);
    }

    function showSewerChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = ''; // Clear previous options

        const drinkBtn = document.createElement('button');
        drinkBtn.textContent = 'Drink the sewer water';
        drinkBtn.addEventListener('click', () => {
            typeText('You chose to drink the sewer water!', () => {
                currentBranch = 'evil_hidingSewersDrink';
                updateChoicesSidebar('Chose to drink the sewer water');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const runSewersBtn = document.createElement('button');
        runSewersBtn.textContent = 'Run through the sewers';
        runSewersBtn.addEventListener('click', () => {
            typeText('You chose to run through the sewers!', () => {
                currentBranch = 'evil_hidingSewersRun';
                updateChoicesSidebar('Chose to run through the sewers');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(runSewersBtn);
        optionBtns.appendChild(drinkBtn);
    }

    function evil_showTravelChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = ''; // Clear previous options

        const evilLandBtn = document.createElement('button');
        evilLandBtn.textContent = 'Travel by Land'; // Improved text clarity
        evilLandBtn.addEventListener('click', () => {
            typeText('You chose to travel by land!', () => {
                currentBranch = 'evil_landTravel';
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const evilSkyBtn = document.createElement('button');
        evilSkyBtn.textContent = 'Travel by Sky'; // Improved text clarity
        evilSkyBtn.addEventListener('click', () => {
            typeText('You chose to travel by sky!', () => {
                currentBranch = 'evil_travelFlight';
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(evilLandBtn);
        optionBtns.appendChild(evilSkyBtn);
    }

    function showTravelChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = ''; // Clear previous options

        const landBtn = document.createElement('button');
        landBtn.textContent = 'Travel by Land';
        landBtn.addEventListener('click', () => {
            typeText('You chose to travel by land!', () => {
                currentBranch = 'landTravel';
                updateChoicesSidebar('Chose to travel by land');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const seaBtn = document.createElement('button');
        seaBtn.textContent = 'Travel by Sea';
        seaBtn.addEventListener('click', () => {
            typeText('You chose to travel by sea!', () => {
                currentBranch = 'seaTravel';
                updateChoicesSidebar('Chose to travel by sea');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(landBtn);
        optionBtns.appendChild(seaBtn);
    }

    function showHuntChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = ''; // Clear previous options

        const berriesBtn = document.createElement('button');
        berriesBtn.textContent = 'Pick Berries';
        berriesBtn.addEventListener('click', () => {
            typeText('You chose to pick berries for everyone!', () => {
                currentBranch = 'berries';
                updateChoicesSidebar('Chose to pick berries for food');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const monkeyBtn = document.createElement('button');
        monkeyBtn.textContent = 'Fight Monkeys';
        monkeyBtn.addEventListener('click', () => {
            typeText('You chose to fight a bunch of monkeys for food!', () => {
                currentBranch = 'monkey';
                updateChoicesSidebar('Chose to fight monkeys for food');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const monkeyBossBtn = document.createElement('button');
        monkeyBossBtn.textContent = 'Fight Monkey Boss';
        monkeyBossBtn.addEventListener('click', () => {
            typeText('You chose to fight one big monkey for food!', () => {
                currentBranch = 'monkeyBoss';
                updateChoicesSidebar('Chose to fight the monkey boss for food');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(berriesBtn);
        optionBtns.appendChild(monkeyBtn);
        optionBtns.appendChild(monkeyBossBtn);
    }

    function showFoodChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = ''; // Clear previous options

        const huntBtn = document.createElement('button');
        huntBtn.textContent = 'Hunt';
        huntBtn.addEventListener('click', () => {
            typeText('You chose to find an island and hunt for food!', () => {
                currentBranch = 'islandFood';
                updateChoicesSidebar('Chose to hunt for food');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const conjureBtn = document.createElement('button');
        conjureBtn.textContent = 'Conjure';
        conjureBtn.addEventListener('click', () => {
            typeText('You conjure food for everyone!', () => {
                currentBranch = 'conjure';
                updateChoicesSidebar('Chose to conjure food using magic');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(huntBtn);
        optionBtns.appendChild(conjureBtn);
    }

    function showSwordsmanWeaponChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = '';

        const speedWeaponBtn = document.createElement('button');
        speedWeaponBtn.textContent = 'Short Sword';
        speedWeaponBtn.addEventListener('click', () => {
            typeText('You chose the Short Sword!', () => {
                currentBranch = 'short_sword';
                updateChoicesSidebar('Chose the Short Sword for speed');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const damageWeaponBtn = document.createElement('button');
        damageWeaponBtn.textContent = 'Great Sword';
        damageWeaponBtn.addEventListener('click', () => {
            typeText('You chose the Great Sword!', () => {
                currentBranch = 'great_sword';
                updateChoicesSidebar('Chose the Great Sword for damage');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(speedWeaponBtn);
        optionBtns.appendChild(damageWeaponBtn);
    }

    function showEvilWeaponChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = '';

        const darkMagicBtn = document.createElement('button');
        darkMagicBtn.textContent = 'Dark Magic';
        darkMagicBtn.addEventListener('click', () => {
            typeText('You chose the Dark Magic!', () => {
                currentBranch = 'evil_magic';
                updateChoicesSidebar('Chose Dark Magic for ranged attacks');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const cursedSwordBtn = document.createElement('button');
        cursedSwordBtn.textContent = 'Scythe';
        cursedSwordBtn.addEventListener('click', () => {
            typeText('You chose the Scythe!', () => {
                currentBranch = 'evil_scythe';
                updateChoicesSidebar('Chose the Scythe for close-mid range attacks');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(darkMagicBtn);
        optionBtns.appendChild(cursedSwordBtn);
    }

    function showPuzzle() {
        var rows = 5;
        var columns = 5;

        var currTile;
        var otherTile;

        var turns = 0;

        // Create a close button for the puzzle menu
        const closePuzzleBtn = document.createElement('button');
        closePuzzleBtn.textContent = 'Close Puzzle';
        closePuzzleBtn.style.position = 'absolute';
        closePuzzleBtn.style.top = '10px';
        closePuzzleBtn.style.right = '10px';
        closePuzzleBtn.addEventListener('click', () => {
            document.getElementById('board').style.display = 'none'; // Hide the puzzle board
            closePuzzleBtn.style.display = 'none'; // Hide the close button
        });

        document.body.appendChild(closePuzzleBtn); // Add the button to the document

        window.onload = function () {
            document.getElementById('board').style.display = 'block'; // Ensure the board is visible
            closePuzzleBtn.style.display = 'block'; // Ensure the close button is visible

            //initialize the 5x5 board
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < columns; c++) {
                    //<img>
                    let tile = document.createElement("img");
                    tile.src = "./icons/blank2.jpg";

                    //DRAG FUNCTIONALITY
                    tile.addEventListener("dragstart", dragStart); //click on image to drag
                    tile.addEventListener("dragover", dragOver);   //drag an image
                    tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
                    tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
                    tile.addEventListener("drop", dragDrop);       //drop an image onto another one
                    tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

                    document.getElementById("board").append(tile);
                }
            }

            //pieces
            let pieces = [];
            for (let i = 1; i <= rows * columns; i++) {
                pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
            }
            pieces.reverse();
            for (let i = 0; i < pieces.length; i++) {
                let j = Math.floor(Math.random() * pieces.length);

                //swap
                let tmp = pieces[i];
                pieces[i] = pieces[j];
                pieces[j] = tmp;
            }

            for (let i = 0; i < pieces.length; i++) {
                let tile = document.createElement("img");
                tile.src = "./images/" + pieces[i] + ".jpg";

                //DRAG FUNCTIONALITY
                tile.addEventListener("dragstart", dragStart); //click on image to drag
                tile.addEventListener("dragover", dragOver);   //drag an image
                tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
                tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
                tile.addEventListener("drop", dragDrop);       //drop an image onto another one
                tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

                document.getElementById("pieces").append(tile);
            }
        }

        //DRAG TILES
        function dragStart() {
            currTile = this; //this refers to image that was clicked on for dragging
        }

        function dragOver(e) {
            e.preventDefault();
        }

        function dragEnter(e) {
            e.preventDefault();
        }

        function dragLeave() {

        }

        function dragDrop() {
            otherTile = this; //this refers to image that is being dropped on
        }

        function dragEnd() {
            if (currTile.src.includes("blank")) {
                return;
            }
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;

            turns += 1;
            document.getElementById("turns").innerText = turns;
        }
        function startCombat(player, enemy, onCombatEnd) {
            // Hide the next button and show the combat options
            nextBtn.style.display = 'none';
            optionBtns.style.display = 'block';
            optionBtns.innerHTML = ''; // Clear previous options

            // Display initial combat status
            typeText(`Combat started! You are fighting ${enemy.name}.`, () => {
                updateCombatStatus();
                playerTurn();
            });

            function updateCombatStatus() {
                dialogueElement.innerHTML += `<br><br>${player.name}: ${player.health} HP<br>${enemy.name}: ${enemy.health} HP`;
            }

            function playerTurn() {
                typeText("It's your turn! Choose an attack:", () => {
                    optionBtns.innerHTML = ''; // Clear previous options

                    const basicAttackBtn = document.createElement('button');
                    basicAttackBtn.textContent = 'Basic Attack';
                    basicAttackBtn.addEventListener('click', () => {
                        performAttack(player, enemy, 'Basic Attack', 10, () => {
                            if (enemy.health <= 0) {
                                endCombat(true);
                            } else {
                                enemyTurn();
                            }
                        });
                    });

                    const specialAttackBtn = document.createElement('button');
                    specialAttackBtn.textContent = 'Special Attack';
                    specialAttackBtn.addEventListener('click', () => {
                        performAttack(player, enemy, 'Special Attack', 20, () => {
                            if (enemy.health <= 0) {
                                endCombat(true);
                            } else {
                                enemyTurn();
                            }
                        });
                    });

                    optionBtns.appendChild(basicAttackBtn);
                    optionBtns.appendChild(specialAttackBtn);
                });
            }

            function enemyTurn() {
                typeText(`It's ${enemy.name}'s turn!`, () => {
                    performAttack(enemy, player, 'Enemy Attack', 15, () => {
                        if (player.health <= 0) {
                            endCombat(false);
                        } else {
                            playerTurn();
                        }
                    });
                });
            }

            function performAttack(attacker, defender, attackName, damage, callback) {
                const actualDamage = Math.max(0, damage - defender.defense);
                defender.health -= actualDamage;

                typeText(`${attacker.name} used ${attackName} and dealt ${actualDamage} damage!`, () => {
                    updateCombatStatus();
                    callback();
                });
            }

            function endCombat(playerWon) {
                optionBtns.style.display = 'none';
                typeText(playerWon ? 'You have won the combat!' : 'You have been defeated!', () => {
                    onCombatEnd(playerWon);
                });
            }
        }

    }
    // Array to store all choices made
    const choicesMade = [];

    // Function to update the sidebar with choices
    function updateChoicesSidebar(choice) {
        // Add the new choice to the array
        choicesMade.push(choice);

        // Get the sidebar list element
        const choicesList = document.getElementById('choices-list');

        // Create a new list item for the choice
        const listItem = document.createElement('li');
        listItem.textContent = choice;

        // Append the new choice to the list
        choicesList.appendChild(listItem);
    }

    function showMentorChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = ''; // Clear previous options

        const avengeBtn = document.createElement('button');
        avengeBtn.textContent = 'Avenge Mr. Rich';
        avengeBtn.addEventListener('click', () => {
            typeText('You chose to avenge Mr. Rich!', () => {
                currentBranch = 'evil_avengeRich';
                updateChoicesSidebar('Chose to avenge Mr. Rich');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const followBtn = document.createElement('button');
        followBtn.textContent = 'Follow your mentor';
        followBtn.addEventListener('click', () => {
            typeText('You chose to follow your mentor!', () => {
                currentBranch = 'evil_followMentor';
                updateChoicesSidebar('Chose to follow your mentor');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(avengeBtn);
        optionBtns.appendChild(followBtn);
    }

    function showTreasureChoices() {
        nextBtn.style.display = 'none';
        optionBtns.style.display = 'block';
        optionBtns.innerHTML = ''; // Clear previous options

        const splitBtn = document.createElement('button');
        splitBtn.textContent = 'Split the treasure with Sat Ann';
        splitBtn.addEventListener('click', () => {
            typeText('You chose to split the treasure with Sat Ann!', () => {
                currentBranch = 'evil_splitTreasure';
                updateChoicesSidebar('Chose to split the treasure with Sat Ann');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        const stealBtn = document.createElement('button');
        stealBtn.textContent = 'Take the treasure for yourself';
        stealBtn.addEventListener('click', () => {
            typeText('You chose to take the treasure for yourself!', () => {
                currentBranch = 'evil_stealTreasure';
                updateChoicesSidebar('Chose to take the treasure for yourself');
                currentDialogueIndex = 0;
                optionBtns.style.display = 'none';
                nextBtn.style.display = 'block';
            });
        });

        optionBtns.appendChild(splitBtn);
        optionBtns.appendChild(stealBtn);
    }
});
