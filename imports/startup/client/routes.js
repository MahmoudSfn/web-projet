Router.configure({
	layoutTemplate: 'layoutOne'
});

Router.route('/', {
	name:'home',
});

Router.route('/tasks', {
	name:'tasks',
});

Router.route('/groups', {
	name:'groups',
});

Router.route('/SignIn', {
	name:'connection',
});

Router.route('/SignUp', {
	name:'inscription',
});


Router.onBeforeAction(function() {

    if (!Meteor.userId()) {
		this.render("connection");
	} else {
		this.next(); 
	}


}, {
	except: [
		"connection",
		"inscription",
		"home",
		"liste"
	]
});