#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who wants to be kinda rich \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I do not exist, lose and i die.
    i just want to see my kids
    dont let me ${chalk.bgRed('DIE')}
    
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Whats your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}

async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'is  Haskell good\n',
        choices: [
            'Yes',
            'No',
        ],
    });

    return handleAnswer(answers.question_1 == 'No');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Making a list, checking it twice').start();
    await sleep();

    if(isCorrect) {
        spinner.success({ text: `Good Job ${playerName}.`});
    } else {
        spinner.error({ text: `oh.. ${playerName} i thought better...`});
        process.exit(1);
    }
}


function winner() {
    console.clear();
    const msg = `Congrats, ${playerName} ! \n £ 100`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome();
await askName();
await question1();
await winner();