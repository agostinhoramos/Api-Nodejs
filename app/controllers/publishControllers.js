const Publish = require('../../models/publishModels');

// Retrieve and return all publish from the database.
exports.retrieveAll = (req, res) => {
    Publish.find()
    .then(publish => {
        return publish;
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong while getting list of publish."
        });
    });
};

// Create and Save a new publ
exports.create = (req, res) => {
    if(req.isAuthenticated()){
        // Validate request
        if(!req.body) {
            return res.status(400).send({
                message: "Please fill all required field"
            });
        }

        // Create a new Publish
        const publ = new Publish({
            name: req.body.name,
            user_id: req.body.user_id
        });

        // Save publ in the database
        publ.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating new publ."
            });
        });
        res.redirect('/dashboard');
    }
};

// Find a single Publish with a id
exports.retrieve = (req, res) => {
    Publish.findById(req.params.id)
    .then(publish => {
        if(!publish) {
            return res.status(404).send({
                message: "Publish not found with id " + req.params.id
            });            
        }
        res.send(publ);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Publish not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error getting publ with id " + req.params.id
        });
    });
};

// Update a publ identified by the id in the request
exports.update = (req, res) => {
    if(req.isAuthenticated()){
        // Validate Request
        
        if(!req.body) {
            return res.status(400).send({
                message: "Please fill all required field"
            });
        }

        // Find publ and update it with the request body
        var id = req.body.id;
        var name = req.body.name;

        var cdate = new Date();
        cdate = ((cdate.getMonth() > 8) ? (cdate.getMonth() + 1) : ('0' + (cdate.getMonth() + 1))) + '/' + ((cdate.getDate() > 9) ? cdate.getDate() : ('0' + cdate.getDate())) + '/' + cdate.getFullYear();

        Publish.findByIdAndUpdate(id, { 
            name: name,
            last_edition_date : cdate
        } , {new: true}, function(err, model) {
            if(!err){
                console.log('updated!!');
            }else{
                console.log('Error');
            }
        });
        res.redirect('/dashboard');
    }
};

// Delete a publ with the specified id in the request
exports.delete = (req, res) => {
    if(req.isAuthenticated()){
        Publish.findByIdAndRemove(req.params.id)
        .then(publ => {
            if(!publ) {
                return res.status(404).send({
                    message: "publ not found with id " + req.params.id
                });
            }
            res.send({message: "publ deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "publ not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Could not delete publ with id " + req.params.id
            });
        });
        res.redirect('/dashboard');
    }else{
        res.redirect('/login');
    }
};


// Extra...
exports.like = (req, res) => {
    if(req.isAuthenticated()){
        Publish.findByIdAndUpdate(req.body.id, {
            feedback: parseInt(req.body.feedback) + 1
        } , {new: true}, function(err, model) {
            if(!err){
                console.log('liked!!');
            }else{
                console.log('Error');
            }
        });
        res.redirect('/dashboard');
    }
};

exports.dislike = (req, res) => {
    if(req.isAuthenticated()){
        Publish.findByIdAndUpdate(req.body.id, {
            feedback: parseInt(req.body.feedback) - 1
        } , {new: true}, function(err, model) {
            if(!err){
                console.log('disliked!!');
            }else{
                console.log('Error');
            }
        });
        res.redirect('/dashboard');
    }
};