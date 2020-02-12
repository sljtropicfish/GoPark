const 	express         = require('express'),
      	exphbs          = require('express-handlebars'),
      	bodyParser      = require('body-parser'),
		mongoose 		= require("mongoose"),
		Park	 		= require("./models/park"),
		// Comment 		= require("./models/comment"),
		User 			= require("./models/user"),
		passport		= require("passport"),
		LocalStrategy 	= require("passport-local"),
		seedDB 		= require("./seeds");

const app = express();

// seed DB
// seedDB();

// Setup database
var url = process.env.DATABASEURL || "mongodb://localhost/gopark";
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url);


// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rustywins cutest dogs!!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware: pass currentUser to every route, must include next(), otherwise will just stop
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('main');
});

//=================
// AUTH ROUTES
//=================
// show register form
app.get("/register", function(req, res){
	res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register", {
            	message: err.message + ". Please try again!",
            	messageClass: 'alert-danger'
       	 	});
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/protected");
		});
	});
});

// show login form
app.get("/login", function(req, res){
	res.render("login");
});

// handle login post
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/protected",
		failureRedirect: "/login"
	}), function(req, res){
});

// logout route
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect("/login", {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
	}
}

app.get('/protected', (req, res) => {
    if (req.user) {
        res.render('protected');
    } else {
        res.render('login', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
});

app.get("/search", (req, res) => {
	res.render("search");	
});

app.get("/information_main", (req, res) => {
	res.render("information_main");
});

app.get("/yellowstone_info", (req, res) => {
	res.render("yellowstone_info");
});

app.get("/yosemite_info", (req, res) => {
	res.render("yosemite_info");
});


var port = process.env.PORT || 3000;
app.listen(port, function(req, res){
	console.log("Server Has Started at port " + port + "!");	
});