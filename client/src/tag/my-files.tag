my-files.card.mt-4
	.card-body
		h5.card-title Existing files
		table.table.table-hover
			tbody
				tr(each="{files}")
					td {name}
	script.

		import {fileList} from '../service/fileList.js'

		this.files = fileList.getFiles()

		console.log( this.files[0] )