my-upload.card.mt-4
	.card-body
		h5(ondragenter="{leaveDropZone}").card-title Upload file
		//- Drop Zone
		div.p-3.text-center.drop-zone(ondrop="{drop}" ondragenter="{enterDropZone}" ondragstart="{dragstart}")
			.text-center
				input(id="file" type="file" name="file" onchange="{upload}" multiple).input-file.form-control-file
				label( for="file" ) Choose file
			p(style="color: #BDBDBD;") or drop file here
		h5(ondragenter="{leaveDropZone}").card-title.pt-3 Progress
		.progress
			.progress-bar.bg-warning(role="progressbar" ref="progress" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100")

	style(type="text/css").
		.input-file{
			display: none;
			width: 0.1px;
			height: 0.1px;
		}
		.input-file + label{
			font-size: 1.25em;
			font-weight: 700;
			color: white;
			padding:5px;
			background-color: black;
			display: inline-block;
			cursor: pointer;
		}
		.input-file:focus + label,
		.input-file + label:hover {
			background-color: #F50057;
		}
		.drop-zone{
			background-color: #F5F5F5;
			border: 2px dashed #BBDEFB;
			box-sizing: border-box;
		}
		.progress-bar{
			transition: all 1s ease-in-out .5s;
			width: 0%;
		}
		.uploading{
			width: 100%;
		}

	script.

		import {uploader} from '../service/uploader.js'

		upload(){
			uploader.start( this.refs.progress, 'uploading' );
		}

		drop( e ){
			e.preventDefault();
			uploader.start( this.refs.progress, 'uploading' );
		}

		allowDrop( e ){
			e.preventDefault();
		}


		enterDropZone( e ){
			console.log( e.type );
			let element = document.querySelector( '.drop-zone' );
			element.style.border='2px solid #BBDEFB'
		}
		leaveDropZone( e ){
			let element = document.querySelector( '.drop-zone' );
			element.style.border='2px dashed #BBDEFB'
		}
	