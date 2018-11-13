const Command = require("../base/Command");


/**
 * The list of acronyms defined in data/acronym.json was transposed from the SWGoH forum. Any update there will need to make it's way into here.
 * //https://forums.galaxy-of-heroes.starwars.ea.com/discussion/154048/guide-to-the-acronyms-and-terms-of-star-wars-galaxy-of-heroes-swgoh
 */
class Acronyms extends Command {
    constructor(client) {
        super(client, {
            name: "acronyms",
            category: "Misc",
            aliases: ["acr", "acronym"],
        });
    }

    async run(client, message, [ acronym ], options) { // eslint-disable-line no-unused-vars
        const acronymsLookup = client.acronyms;
        const acronyms = Object.keys(acronymsLookup);

        if (!acronym.length) {
            return message.channel.send(message.language.get("COMMAND_ACRONYMS_INVALID", acronyms.join(", ")));
        }

        const lookupList = acronym.split("|").map(a => a.toLowerCase());
        
        const matchingItems = acronyms.filter(acr => lookupList.includes(acr.toLowerCase()));
        
        console.log(matchingItems, lookupList);


        if (!matchingItems.length) {
            return message.channel.send(message.language.get("COMMAND_ACRONYMS_NOT_FOUND", acronyms.join(", ")));
        } 
        
        const acronymMeanings = [];
        matchingItems.forEach(item => {
            acronymMeanings.push(acronymsLookup[item]);
        });

        console.log(matchingItems, acronymMeanings);

        return message.channel.send(message.language.get("COMMAND_ACRONYMS_FOUND", matchingItems, acronymMeanings));
    }
}

module.exports = Acronyms;

