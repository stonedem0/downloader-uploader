$("#btn_download").on('click', () => {
    window.open('/download');
    $("#status").empty().text("File is downloaded..");
});
    $('#upload_form').submit(() => {
        $("#status").empty().text("File is uploading...");
        $(this).ajaxSubmit({
            error: (xhr) => {
                status('Error: ' + xhr.status);
            },
            success: (response) => {
                console.log(response);
                $("#status").empty().text(response);
            }
        });
        return false;
    });
