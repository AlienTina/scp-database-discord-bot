const htmlToText = require('html-to-text');
const fs = require('fs');
const scraper = require('website-scraper');


const del = require('del');


const path = require('path');

const directory = 'scp';

var htmlFile;


async function scrape(options) {
  const txtDel = await del(['scp.txt']);

  console.log('Deleted files and directories:\n', txtDel.join('\n'));
  // with async/await
  const result = await scraper(options);

  function readModuleFile(path, callback) {
    try {
      var filename = require.resolve(path);
      fs.readFile(filename, 'utf8', callback);
    } catch (e) {
      callback(e);
    }
  }
  readModuleFile('./scp/index.html', function (err, words) {
    htmlFile = words;
    const text = htmlToText.fromString(htmlFile);
    edit = text.split('Description');
    edit2 = edit[1].split('Creator');

    console.log(edit2[0]);
    edit3 = edit2[0].split('--');
    edit4 = edit3[0].split('esoteric-class')
    fs.appendFile('scp.txt', 'Description' + edit4[0].split('«')[0], function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  });

  const scpDelete = await del(['scp']);

  console.log('Deleted files and directories:\n', scpDelete.join('\n'));
}

const { Client, Attachment } = require('discord.js');

const client = new Client();

client.once('ready', () => {
  console.log('Ready!');
});

const { prefix, token } = require('./config.json');

client.on('message', message => {
  var args = message.content.split(/ +/);
  const command = args.shift().toLowerCase();

  if (command == prefix + 'scp') {
    const options = {
      urls: ['http://www.scp-wiki.net/scp-' + args[0]],
      directory: './scp',
    };
    async function send() {
      await scrape(options);

      function readModuleFile(path, callback) {
        try {
          var filename = require.resolve(path);
          fs.readFile(filename, 'utf8', callback);
        } catch (e) {
          callback(e);
        }
      }
      readModuleFile('./scp.txt', function (err, words) {
        textArray = words.match(/[\s\S]{1,2000}/g);
        textArray.forEach(text => {
          message.channel.send(text);
        });
      });
    }
    send();
  }

});

client.login(token)
