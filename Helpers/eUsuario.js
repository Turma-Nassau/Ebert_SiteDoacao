module.exports = {
  eUsuario: function (req, res, next) {
   
    if (req.isAuthenticated()) { 
      return next(); // passa para o próximo middleware ou rota
    }
    
    req.flash("erro_msg", "Você deve ser um usuário para acessar a página"); // exibe uma mensagem de erro usando o pacote connect-flash
    res.redirect("/"); // redireciona o usuário para uma página restrita
  } 
};
