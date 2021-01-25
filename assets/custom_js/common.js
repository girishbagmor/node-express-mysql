const postData = (url, data) => {
    var BASE_URL = ""
    return new Promise((resolve, reject) => {

        $.ajax({
            url: BASE_URL + url,
            method: "POST",
            data: data,
            dataType: "JSON",
            success: function(result) {
                resolve(result)
            },
            error: (request, status, error) => {
                toastMessage(error.msg, "e");
            }
        });
    })
}

const toastMessage = (msg, type, option = {}) => {
    if (type === "e") {
        var message_tye = "error";
    } else if (type === "s") {
        var message_tye = "success";
    }

    if (option.element) {
        $(option.element).notify(msg, message_tye);
    } else {
        $.notify(msg, message_tye);
    }

}