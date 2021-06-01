var crypto = require('crypto');
const fs = require('fs');

var start = "a" // edit if you saved latest string so it can start from your saved string.
var end = "zzzzzzz" // edit if you want to go further than that.

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

function generate(perm, type, hash) {
    var hashValue = crypto.createHash(type).update(perm).digest("hex")
    var myString = "Hash: " + hash + "\n\nDehashed string = " + perm
    var failString = "Failed to find the string for '" + hash + "'\n\nEnded at: " + perm + "\n\nSuggestion: Increase the length of 'end' inside the code."

    if(hashValue.toString() == hash)
    {
        fs.writeFileSync('Dehashed.txt', myString, (err) => {  
            if (err) throw err; 
        })
        console.log("")
        console.log("SUCCESS! CHECK DEHASHED.TXT")
        process.exit()
    } else if(perm == end) {
        fs.writeFileSync('FAIL.txt', failString, (err) => {  
            if (err) throw err; 
        })
        console.log("")
        console.log("FAIL! COULD NOT FIND YOUR HASH!")
        process.exit()
    }// else {
        //fs.writeFileSync('last.txt', 'Last combo: ' + perm, (err) => {  
          //  if (err) throw err; 
        //}) - Add this only if you want to save the last string combo after closing program. (slows process a lot)
    //}

    //console.log(perm + " : " + hashValue) - You can print out each hash but it will slow down the program a lot.
}

function looping(type, hash) {
    for(i=parseInt(start, 36); i++<=parseInt(end, 36);
        
    generate(i.toString(36), type, hash));
}

readline.question('Hash type: ', type => { // your hash type (example: md5)
    readline.question('Hash to reverse: ', hash => { // your hash (example: 47bce5c74f589f4867dbd57e9ca9f808)
        looping(type, hash)
        readline.close();
    });
});
