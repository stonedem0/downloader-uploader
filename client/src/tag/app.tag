app
	my-header
	my-container
		my-entrance
		my-login-form(if='{parent.state.login}')
		my-upload(if='{parent.state.upload}')
		my-files(if='{parent.state.files}')
	script.

		import {auth} from '../service/auth.js'
		import {uploader} from '../service/uploader.js'

		this.on('mount', function () {
			console.log("Tag mounted")
		} )

		this.state = {
			files: this.opts.files ? !! this.opts.files : true,
			login: this.opts.login ? !! this.opts.login : false,
			upload: this.opts.upload ? !! this.opts.upload : false,
			login_err : this.opts.error_login ? !! this.opts.error_login : false
		};

		auth.on( 'successful', () => {
			this.state.login = false;
			this.state.upload = true;
			this.state.login_err = false;
		} )

		auth.on( 'login_err', () => {
			this.state.login_err = true;
		} )

		auth.on( 'logout', () => {
			this.state.upload = false;
		} )

		uploader.on( 'upload_start', () => {
			
		} )

		showLogin( e ){
			e.preventDefault();
			this.state.login = true;
			this.trigger( 'change' );
		};

		this.on( 'change', this.update );

		this.on( 'unmount', function() {
			this.state.off( 'change', this.update )
		} );