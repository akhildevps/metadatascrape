(() => {
    $(".spinner-grow").hide();
    reset();
})();

function submit() {
    reset();
    if (!$('#urlText').val() || $('#urlText').val() === '') {
        //warn the user
        $('#url-error').show();
        return;
    }
    $('#result').html('');
    $('.spinner-grow').show();

    $.ajax({
        url: '/scrape',
        type: 'POST',
        data: { url: $('#urlText').val() },
        success(jsonData) {
            $("#resultDiv").show();
            $('.spinner-grow').hide();
            $('#result').JSONView(jsonData);
        },
        error(err) {
            console.error('HERE error: ' + err);
        }
    });
}
function reset() {
    $(".error").hide();
    $("#resultDiv").hide();
}