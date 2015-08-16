
var contactUsVars = {};

function onContactUsSubmit() {
	onSend();

	var url = contactUsVars.form.attr("action");

	var nameId = contactUsVars.fieldName.attr("name");
	var nameVal = contactUsVars.fieldName.val();

	var emailId = contactUsVars.fieldEmail.attr("name");
	var emailVal = contactUsVars.fieldEmail.val();

	var messageId = contactUsVars.fieldMessage.attr("name");
	var messageVal = contactUsVars.fieldMessage.val();

	var params = {};

	params[nameId] = nameVal;
	params[emailId] = emailVal;
	params[messageId] = messageVal;

	contactUsVars.progressMsg.show();

	$.ajax({
		type: "POST",
		url: url,
		data: params,
		crossDomain: true,
		success: onSendSuccess,
		error: onSendFailed,
		dataType: "json"
	});

	return false;
}

function onSend() {
	contactUsVars.sendButton.hide();
	contactUsVars.fieldName.prop("disabled", true);
	contactUsVars.fieldEmail.prop("disabled", true);
	contactUsVars.fieldMessage.prop("disabled", true);
}

function onSendSuccess() {
	contactUsVars.progressMsg.hide();
	contactUsVars.successMsg.show();
	setTimeout(resetContactUs, 3000)
}

function onSendFailed() {
	contactUsVars.progressMsg.hide();
	contactUsVars.failedMsg.show();
	setTimeout(retryContactUs, 3000)
}

function resetContactUs() {
	contactUsVars.fieldName.val("");
	contactUsVars.fieldEmail.val("");
	contactUsVars.fieldMessage.val("");

	contactUsVars.fieldName.prop("disabled", false);
	contactUsVars.fieldEmail.prop("disabled", false);
	contactUsVars.fieldMessage.prop("disabled", false);

	contactUsVars.successMsg.hide();
	contactUsVars.sendButton.show();
}

function retryContactUs() {
	contactUsVars.fieldName.prop("disabled", false);
	contactUsVars.fieldEmail.prop("disabled", false);
	contactUsVars.fieldMessage.prop("disabled", false);

	contactUsVars.failedMsg.hide();
	contactUsVars.sendButton.show();
}

$(document).ready(function () {
	contactUsVars.progressMsg = $("#contact-progress");
	contactUsVars.successMsg = $("#contact-success")
	contactUsVars.failedMsg = $("#contact-failed");
	contactUsVars.form = $("#contact-us-form");
	contactUsVars.fieldName = $("#contact-name");
	contactUsVars.fieldEmail = $("#contact-email");
	contactUsVars.fieldMessage = $("#contact-message");
	contactUsVars.sendButton = $("#contact-send-btn");

	contactUsVars.progressMsg.hide();
	contactUsVars.successMsg.hide();
	contactUsVars.failedMsg.hide();
});
