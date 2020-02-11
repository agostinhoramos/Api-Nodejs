const Publish = require('../../models/publishModels');

//Retorna todas as publicações do banco de dados.
exports.retrieveAll = (req, res) => {
    Publish.find() // instrução principal
    .then(publish => {
        return publish; // retorna em forma de Objecto
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu um erro ao obter a lista de publicação."
        });
    });
};

// Criar e salvar nova publicação
exports.create = (req, res) => {
    if(req.isAuthenticated()){ // Verificar se o utilizador está autenticado
        // Validate request
        if(!req.body) {
            return res.status(400).send({
                message: "Preencha todos os campos obrigatórios"
            });
        }

        // Toda publicação deve ter um nome e o ID do utilizador
        const publ = new Publish({
            name: req.body.name,
            user_id: req.body.user_id
        });

        // Salvar a publicação no banco de dados
        publ.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao criar uma nova publicação."
            });
        });
        res.redirect('/dashboard');
    }
};

// Procurar uma unica publicação com o ID
exports.retrieve = (req, res) => {
    Publish.findById(req.params.id)
    .then(publish => {
        if(!publish) {
            return res.status(404).send({
                message: "Publicar não encontrado com o ID " + req.params.id
            });            
        }
        res.send(publ);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Publicar não encontrado com o ID " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Erro ao obter a publicação com o ID " + req.params.id
        });
    });
};

// Atualizar a publicação pelo ID
exports.update = (req, res) => {
    if(req.isAuthenticated()){
        // Verificar se existe valores na requisição
        
        if(!req.body) {
            return res.status(400).send({
                message: "Preencha todos os campos obrigatórios"
            });
        }

        // passar os valores da requisição para as variaveis id, name.
        var id = req.body.id;
        var name = req.body.name;

        var cdate = new Date();
        cdate = ((cdate.getMonth() > 8) ? (cdate.getMonth() + 1) : ('0' + (cdate.getMonth() + 1))) + '/' + ((cdate.getDate() > 9) ? cdate.getDate() : ('0' + cdate.getDate())) + '/' + cdate.getFullYear();

        Publish.findByIdAndUpdate(id, { 
            name: name,
            last_edition_date : cdate
        } , {new: true}, function(err, model) {
            if(!err){
                console.log('atualizado!!');
            }else{
                console.log('Erro');
            }
        });
        res.redirect('/dashboard');
    }
};

// Apagar uma unica publicação consultada pelo ID
exports.delete = (req, res) => {
    if(req.isAuthenticated()){
        Publish.findByIdAndRemove(req.params.id) // esta intrução vai apagar a publicação que tiver este ID
        .then(publ => {
            if(!publ) {
                return res.status(404).send({
                    message: "Publicação não encontrado com o ID " + req.params.id
                });
            }
            res.send({message: "Publicação apagada com sucessso!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Publicação não encontrada com ID " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Não foi possível apagar a publicação com ID " + req.params.id
            });
        });
        res.redirect('/dashboard'); // Redireciona para a pagina /dashboard se estiver autenticado!
    }else{
        res.redirect('/login'); // Redireciona /login caso não esteja autenticado!
    }
};


// Extra...
// Esta função vai receber os valores da requisição body para aumentar o feedback
exports.like = (req, res) => {
    if(req.isAuthenticated()){
        Publish.findByIdAndUpdate(req.body.id, { // identifica a publicação pelo ID
            feedback: parseInt(req.body.feedback) + 1 // aumenta o feedback da publicação
        } , {new: true}, function(err, model) {
            if(!err){
                console.log('Gosta!!');
            }else{
                console.log('Erro');
            }
        });
        res.redirect('/dashboard');
    }
};

// Esta função vai receber os valores da requisição body para diminui o feedback
exports.dislike = (req, res) => {
    if(req.isAuthenticated()){
        Publish.findByIdAndUpdate(req.body.id, { // identifica a publicação pelo ID
            feedback: parseInt(req.body.feedback) - 1 // diminui o feedback da publicação
        } , {new: true}, function(err, model) {
            if(!err){
                console.log('Não gostar!!');
            }else{
                console.log('Erro');
            }
        });
        res.redirect('/dashboard');
    }
};