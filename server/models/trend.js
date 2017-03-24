const mongoose = require('mongoose');

// Model
const trendSchema = new mongoose.Schema({
    parentType: String,
    parentName: String,
    parentId: String,
    values: String,
    period: String,
}, {
    timestamps: true
});

const Trend = mongoose.model('Trend', trendSchema);

exports.get = (callback) => {
    // Use mongoose to get all trends in the database
    Trend.find((err, trends) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            return callback(err)

        callback(trends); // return all trends in JSON format
    });
};

exports.getById = (id, callback) => {
    // Use mongoose to get the trend in the database
    Trend.findOne({
        '_id': id
    }, (err, trend) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            return callback(err)

        callback(trend); // Return the trend in JSON format
    });
};

exports.getByParentId = (parentId, callback) => {
    // Use mongoose to get the trend in the database
    Trend.findOne({
        parentId: parentId
    }, (err, trend) => {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            return callback(err)

        callback(trend); // Return the trend in JSON format
    });
};


// Create trend and send back all trends after creation
exports.create = (params, callback) => {
    Trend.create(params, (err, trend) => {
        if (err)
            return callback(err);

        callback(trend);
    });
};

// Update a trend
exports.update = (id, params, callback) => {

};

// Delete a trend
exports.delete = (id, callback, callbackErr) => {
    Trend.remove({
        _id: id
    }, (err, trend) => {
        if (err)
            return callbackErr(err);

        return callback(trend)
    });
};

// Delete a trend
exports.deleteByParentId = (parentId, callback) => {
    Trend.remove({
        parentId: parentId
    }, (err, trend) => {
        if (err)
            return callback(err);
        callback(trend)
    });
};
