app
	my-header
	my-container
		my-entrance
		my-login-form(if='{parent.state.login}')
		my-upload(if='{parent.state.upload}')
		my-files(if='{parent.state.files}')
	script.

		import {auth} from '../service/auth.js'

		this.on('mount', function () {
			console.log("Tag mounted")
		} )

		this.state = {
			files: this.opts.files ? !! this.opts.files : true,
			login: this.opts.login ? !! this.opts.login : false,
			upload: this.opts.upload ? !! this.opts.upload : false
		};

		auth.on( 'successful', () => {
			this.state.login = false;
			this.state.upload = true;
		} )

		auth.on( 'logout', () => {
			this.state.upload = false;
		} )

		showLogin( e ){
			e.preventDefault();
			this.state.login = true;
			this.trigger( 'change' );
		};

		enterToAccount( e ){
			e.preventDefault();
			this.state.login = false;
			this.state.upload = true;
			this.trigger( 'change' );
		}

		this.on( 'change', this.update );

		this.on( 'unmount', function() {
			this.state.off( 'change', this.update )
		} );