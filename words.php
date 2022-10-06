<?php

include "wordlist.php";
session_start();

if($_SERVER["REQUEST_METHOD"] === "GET") {
	if(isset($_GET["request"]) && $_GET["request"] == "solve") {
		echo ($words[$_SESSION["randomIndex"]]);
	} else {
		$_SESSION["numGuesses"] = 0;
		$_SESSION["randomIndex"] = rand(0, count($words)-1);
		$word = ($words[$_SESSION["randomIndex"]]);
		echo str_shuffle($word);
	}
} else if($_SERVER["REQUEST_METHOD"] === "POST") {
	$_SESSION["numGuesses"] += 1;
	$guess = strtolower($_POST["guess"]);
	$word = strtolower($words[$_SESSION["randomIndex"]]);
	if(strcmp($guess, $word)===0) {
		echo "correct";
	} else {
		if($_SESSION["numGuesses"] == 1) {
			echo substr($words[$_SESSION["randomIndex"]], 0, 2);
		} else {
			echo "incorrect";
		}
	}
}