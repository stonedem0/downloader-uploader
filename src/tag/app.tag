app
	my-header
	my-container
		my-entrance
		my-login(if={this.state.login})
		my-files(if={this.state.files})
	script.
		this.state = {
			files: this.opts.files ? !! this.opts.files : true,
			login: this.opts.login ? !! this.opts.login : false
		}