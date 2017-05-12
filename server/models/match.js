const mongoose = require('mongoose');

// Model
const matchSchema = new mongoose.Schema({
    title: String,
    subTitle: String,
    keywords: [String],
    createdAt: Date,
    endDate: String,
    parentMatchId: String
}, {
    timestamps: true
});

const Match = mongoose.model('Match', matchSchema);

exports.get = (callback) => {
    // Use mongoose to get all matchs in the database
    Match.find((err, matchs) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            return callback(err)

        callback(matchs); // return all matchs in JSON format
    });
};

exports.getById = (id, callback) => {
    // Use mongoose to get the match in the database
    Match.findOne({
        '_id': id
    }, (err, match) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            return callback(err)

        callback(match); // Return the match in JSON format
    });
};


// Create match and send back all matchs after creation
exports.create = (params, callback) => {
    Match.create(params, (err, match) => {
        if (err)
            return callback(err);

        callback(match);
    });
};

// Update a match
exports.update = (id, datas, callback) => {

};

// Delete a match
exports.delete = (id, callback) => {
    Match.remove({
        _id: id
    }, (err, match) => {
        if (err)
            return callback(err);

        callback(match)
    });
};
