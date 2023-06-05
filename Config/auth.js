// Carregando módulos
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const Admin = require("../models/Usuario");

// Exportando módulo com a estratégia de autenticação
module.exports = function (passport) {

    // Definindo a estratégia de autenticação local
    passport.use(new LocalStrategy({
        usernameField: 'email', // Nome do campo de e-mail no formulário de login
        passwordField: 'senha', // Nome do campo de senha no formulário de login
        passReqToCallback: true // Passa o objeto req para o callback
    }, (req, email, senha, done) => {

        // Busca o administrador com o email informado no formulário de login
        Admin.findOne({ where: { email: email } })
            .then((admin) => {

                // Se não encontrar o administrador, retorna uma mensagem de erro e chama o callback com false
                if (!admin) {
                    req.flash("erro_msg", "Essa conta não existe");
                    return done(null, false, { mensagem: 'Essa conta não existe' });
                }

                // Compara a senha informada no formulário com a senha do administrador encontrado
                bcrypt.compare(senha, admin.senha)
                    .then((res) => {

                        // Se as senhas coincidirem, chama o callback com o administrador encontrado
                        if (res) {
                            return done(null, admin);
                        } else {
                            // Senão, retorna uma mensagem de erro e chama o callback com false
                            req.flash("erro_msg", "Senha incorreta!");
                            return done(null, false, { mensagem: 'Senha incorreta' });
                        }
                    })
                    .catch((err) => {
                        // Em caso de erro, chama o callback com o erro
                        return done(err);
                    });
            })

    }));

    // Serializa o administrador para salvar na sessão
    passport.serializeUser((admin, done) => {
        done(null, admin.id); // Salva apenas o id do administrador na sessão
    });

    // Desserializa o administrador para buscar da sessão
    passport.deserializeUser(function (id, done) {
        Admin.findOne({ where: { id: id } }).then((admin) => {
            done(null, admin); // Busca o administrador pelo id na base de dados e chama o callback com o administrador encontrado
        }).catch((err) => {
            done(err, null); // Em caso de erro, chama o callback com o erro
        });
    })

};

