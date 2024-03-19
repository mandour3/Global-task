

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Who Wants To Be A JavaScript Millionaire? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n you won Umrah`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(
      chalk.green(
        `ramadan kareem`
      )
    );
    process.exit(0);
  });
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'When was Ramadan imposed on Muslims?\n',
    choices: [
      'In the first year of migration.',
      'In the second year of migration.',
      'In the third year of migration.',
      'In the fourth year of migration.',
    ],
  });

  return handleAnswer(answers.question_1 === 'In the second year of migration.');
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'What is the great night in the month of Ramadan?\n',
    choices: ['Night of Decree', 'New Year', 'Arafah Day'],
  });
  return handleAnswer(answers.question_2 === 'Night of Decree');
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: `When do Muslims abstain from food in the month of Ramadan?\n`,
    choices: ['At the Fajr call to prayer', 'At the Maghrib call to prayer'],
  });

  return handleAnswer(answers.question_3 === 'At the Fajr call to prayer');
}

async function question4() {
  const answers = await inquirer.prompt({
    name: 'question_4',
    type: 'list',
    message: 'What is the ruling on smoking while fasting?\n',
    choices: [
      'His fasting is nullified',
      'His fasting is not nullified',
    ],
  });
  return handleAnswer(answers.question_4 === 'His fasting is nullified');
}

async function question5() {
  const answers = await inquirer.prompt({
    name: 'question_5',
    type: 'list',
    message:
    'What is the name of the battle of the Muslims that took place in the month of Ramadan?\n',
    choices: ['Battle of Badr', 'Battle of Uhud', 'Battle of Hunayn', 'Battle of the Trench'],
  });

  return handleAnswer(answers.question_5 === 'Battle of Badr');
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
