/*
$.ajax ({
	type:'', //get or post
	url: '', //file on the server that will handle the request
	data: {}, //only use data if sending something to the server, formatted as json
	success: function(response) {
		console.log(response); //response is stroing anything that was returned from the server
	},
	error: function(error) {
		alert('error communicating with the server');
	}
});
*/
newWord();

$("form").on("submit", function(e) {
	e.preventDefault();
	var guess = $("#guessInput").val().toLowerCase();
	$("#guessInput").val("");
	$.ajax ({
		type: "POST",
		url: 'words.php',
		data: {"guess":guess},
		success: function(response) {
			console.log(response);
			if(response == "correct") {
				$("#feedback").text("Nice");
				setTimeout(function() {
					newWord();
				}, 1000);
			} else if(response == "incorrect") {
				showAnswer();
			} else {
				$("#feedback").text("NO! Here's a hint! The word starts with " + response);
			}
		},
		error: function(error) {
			alert('error communicating with the server');
		}
	});
});

function newWord(){
	$("#feedback").text("Try this next word!");
	$.ajax ({
		type: "GET",
		url: 'words.php',
		success: function(response) {
			console.log(response);
			$("#scrambled").text(response);
		},
		error: function(error) {
			alert('error communicating with the server');
		}
	});
}

function showAnswer() {
	$.ajax ({
		type: "GET",
		url: 'words.php',
		data: {"request":"solve"},
		success: function(response) {
			console.log(response);
			$("#feedback").text("Wrong lmao. The word was " + response + ". Bask in your failure.");
			setTimeout(function() {
				newWord();
			}, 2000);
		},
		error: function(error) {
			alert('error communicating with the server');
		}
	});
}

