const mongoose = require('mongoose'),
request        = require('request');

// Model
const keywordSchema = new mongoose.Schema({
    title: String,
    mid: String,
    type: String,
    twitterName: String,
    twitterAvatar: String
});

const Keyword = mongoose.model('Keyword', keywordSchema);

exports.get = (callback) => {
    // Use mongoose to get all keywords in the database
    Keyword.find((err, keywords) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            return callback(err)

        callback(keywords); // return all keywords in JSON format
    });
};

exports.getById = (id, callback) => {
    console.log("Fetching keyword by id");

    // Use mongoose to get the keyword in the database
    Keyword.findOne({
        '_id': id
    }, (err, keyword) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            return callback(err)

        callback(keyword); // Return the keyword in JSON format
    });
};


// Create keyword and send back all keywords after creation
exports.create = (title, mid, type, twitterName, callback) => {
    console.log("Creating new keyword");

    Keyword.create({
        title: title,
        mid: mid,
        type: type,
        twitterName: twitterName
    }, (err, keyword) => {
        if (err)
            return callback(err);

        callback(keyword);
    });
};

// Update a keyword
exports.update = (id, datas, callback) => {

};

// Get trend name from MID
exports.getKeywordByMid = (mid, callback) => {
    Keyword.findOne({
        'mid': mid
    }, (err, keyword) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            return callback(err)

        callback(keyword); // Return the keyword in JSON format
    });
};

// Delete a keyword
exports.delete = (id, callback) => {
    Keyword.remove({
        _id: id
    }, (err, keyword) => {
        if (err)
            return callback(err);

        console.log("Keyword supprimé : " + keyword);
        callback(keyword)
    });
};

// Set Twitter avatar URL
exports.setTwitterAvatar = (options, callback) => {
    request(`https://twitter.com/${options.twitterUsername}/profile_image?size=original`, (error, response, body) => {
        const twitterAvatarUrl = response.request.href.replace('.jpg', '_400x400.jpg');

        Keyword.update({ _id: options.id }, { $set: { twitterAvatar: twitterAvatarUrl }}, () => {
            callback();
        });
    });
};
