const chalk = require('chalk')
const conventionalCommit = require('conventional-commit-types') 
const path = require('path')
const fs = require('fs')

let localTails = []
try {
    localTails = JSON.parse(fs.readFileSync(path.resolve(__dirname, './tails.json'),"utf-8")) || []
} catch {
}

const conventionalCommitTypes = conventionalCommit.types
const headerLength = function(answers) {
    return (
      answers.type.length + 2 + (answers.scope ? answers.scope.length + 2 : 0)
    );
};
const maxSummaryLength = function(answers) {
    const maxHeaderWidth = 100
    return maxHeaderWidth - headerLength(answers);
};

const prompter = (cz, commit) => {
    const types = Object.keys(conventionalCommitTypes)
    const longest = types.reduce((longest, cur) => longest > cur.length ? longest : cur.length)
    const choices = types.map((type, key) => {
        return {
          name: (type + ':').padEnd(longest) + ' ' + conventionalCommitTypes[type].description,
          value: type
        };
    });
    cz.prompt([
        {
            type: 'list',
            name: 'type',
            message: "Select the type of change that you're committing:",
            choices,
            // default: conventionalCommit
        },
        {
            type: 'input',
            name: 'scope',
            message:
              'What is the scope of this change (e.g. component or file name): (press enter to skip)',
            filter: function(value) {
              return value.trim()
            }
        },
        {
            type: 'input',
            name: 'subject',
            message: function(answers) {
              return (
                'Write a short, imperative tense description of the change (max ' +
                maxSummaryLength(answers) +
                ' chars):\n'
              );
            },
            validate: function(subject, answers) {
              var filteredSubject = subject.trim();
              return filteredSubject.length == 0
                ? 'subject is required'
                : filteredSubject.length <= maxSummaryLength(answers)
                ? true
                : 'Subject length must be less than or equal to ' +
                  maxSummaryLength(answers) +
                  ' characters. Current length is ' +
                  filteredSubject.length +
                  ' characters.';
            },
            transformer: function(subject, answers) {
              var filteredSubject = subject.trim()
              var color =
                filteredSubject.length <= maxSummaryLength(answers)
                  ? chalk.green
                  : chalk.red;
              return color('(' + filteredSubject.length + ') ' + subject);
            },
            filter: function(subject) {
              return subject.trim()
            }
          },
          {
            type: 'checkbox',
            name: 'selectedTails',
            when: () => !!localTails.length,
            choices: localTails,
            message: 'Check the Tails needed for your commit:\n',
          },
          {
            type: 'input',
            name: 'tails',
            when: answers => !answers.selectedTails?.length,
            message: 'Tails (e.g. Jira ID or issue ID):\n',
            validate: function(input) {
              if (!input) {
                return 'Must specify message, otherwise, just use a normal commit message';
              } else {
                return true;
              }
            }
          },
    ]).then((answers) => {
        // parentheses are only needed when a scope is present
        const scope = answers.scope ? '(' + answers.scope + ')' : '';

        let tails = answers.tails?.split(',') || []
        tails = tails.map(i => i.trim())
        // Hard limit this line in the validate
        const head = answers.type + scope + ': ' + answers.subject + ' ' + tails.join(' ');
        commit(head)
        const tailsPath = path.resolve(__dirname, './tails.json')
        fs.writeFile(tailsPath, JSON.stringify([...tails, ...localTails]), 'utf-8', err => {
            if (err) {
              console.log('Cz tails error');
            }
        })
    })
}
module.exports = {
    prompter,
}