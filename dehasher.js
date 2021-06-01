var crypto = require('crypto');
const fs = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

function generate(perm, type, hash) {
    var hashValue = crypto.createHash(type).update(perm).digest("hex")
    var myString = "Hash: " + hash + "\n\nDehashed string = " + perm

    if(hashValue.toString() == hash)
    {
        fs.writeFileSync('Dehashed.txt', myString, (err) => {  
            if (err) throw err; 
        })
        console.log("")
        console.log("SUCCESS! CHECK DEHASHED.TXT")
        process.exit()
    } // else {
        //fs.writeFileSync('last.txt', 'Last combo: ' + perm, (err) => {  
          //  if (err) throw err; 
        //}) - Use this only if you want to save the last string combo after closing program. (slows process a lot)
    //}

    //console.log(perm + " : " + hashValue)

    // ^ You can print out each hash but it will slow down the program a lot.
}

function looping(type, hash) {
    // edit "a" if you saved latest string so it can start from your saved string. Also edit "zzzzzz" if you want to go further than that.
    for(i=parseInt("a", 36); i++<=parseInt("zzzzzz", 36);

    generate(i.toString(36), type, hash));
}

readline.question('Hash type: ', type => { // your hash type (example: md5)
    readline.question('Hash to reverse: ', hash => { // your hash (example: 47bce5c74f589f4867dbd57e9ca9f808)
        looping(type, hash)
        readline.close();
    });
});
