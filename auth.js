var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models').User;
var bcrypt = require('bcrypt');

module.exports.setupLocalAuth = function () {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!require('./models').checkPasswordValidity(user.password, password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                console.log(user);
                return done(null, user);
            });
        }
    ));
};

module.exports.setupAuthRoutes = function (app) {

    app.get('/login', (req, res) => {
        res.render('auth/login');
    });

    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    );

    app.get('/register', (req, res) => {
        res.render('auth/register');
    });

    app.post('/register',  async (req, res)=> {
        console.log(req.body);
        var username = req.body.username;
        var password = req.body.password;
        
        var ExistingUser = await User.findOne({ username:username });
        console.log(ExistingUser);

        if(ExistingUser !== null) {
            req.flash('User already exists');
            res.redirect('/register');
        } else {
            User.create({username: username, password: bcrypt.hashSync(password, 4)});
            req.flash('New User Created!');
            res.redirect('/login');
        }

    });

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
      });
};
