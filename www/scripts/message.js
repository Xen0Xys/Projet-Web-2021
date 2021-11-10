import {zeroFilled} from "./js_utils.js";

/**
 * Message object
 * @param content Message content
 * @param sender Sender (may be any string)
 * @param timestamp Message sends timestamp
 * @constructor
 */
function Message(content, sender, timestamp){
    this.content = content;
    this.sender = sender;
    this.timestamp = timestamp;

    /**
     * Get message date (defined from timestamp)
     * @returns {Date} Date object
     */
    this.getDate = function (){
        return new Date(this.timestamp);
    };

    /**
     * Get formatted date "00h00" from timestamp
     * @returns {string} String with time format "00h00"
     */
    this.getSendingTimeString = function (){
        return (zeroFilled(this.getDate().getHours(), 2) + "h" + zeroFilled(this.getDate().getMinutes(), 2));
    };
}

export {Message};