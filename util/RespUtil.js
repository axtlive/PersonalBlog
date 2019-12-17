function writeResult(status, msg, data) {
    // console.log(JSON.stringify({status, msg, data}));
    return JSON.stringify({status, msg, data})
}

module.exports.writeResult = writeResult;