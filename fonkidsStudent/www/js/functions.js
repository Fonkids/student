/*
 * $Id: functions.js Oct 9, 2023 9:41:54 AM tta2627$
 * 
 * Copyright (C) 2023 Maider Huarte Arrayago
 * 
 * This file is part of TTA2627_08v3_www.zip.
 * 
 * TTA2627_08v3_www.zip is intended
 * for learning purpouses only.
 * 
 * TTA2627_08v3_www.zip is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 * 
 * TTA2627_08v3_www.zip is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details
 * <http://www.gnu.org/licenses/>.
 */


function check(i) {
	
	if (!tests[i] || Object.prototype.hasOwnProperty.call(results.answers, i)) {
		return;
	}

	var activePage = $.mobile.activePage;
	var selectedInput = activePage.find("input[data-question-index='" + i + "']:checked");
	var feedback = activePage.find(".answer-feedback[data-question-index='" + i + "']");

	if (!selectedInput.length) {
		feedback.text("Please select an answer first.");
		return;
	}

	var selectedAnswer = Number(selectedInput.val());
	if (!Number.isInteger(selectedAnswer) || !tests[i].resp[selectedAnswer]) {
		feedback.text("The selected answer is invalid.");
		return;
	}

	var isCorrect = tests[i].resp[selectedAnswer].isCorrect;
	results.answers[i] = isCorrect;
	results.answered++;

	if (isCorrect) {
		results.corrects++;
		feedback.text("Oso ondo!");
	}
	else {
		feedback.text("Oso txarto :(");
	}

	$("input[data-question-index='" + i + "']").each(function() {
		var answerIndex = Number($(this).val());
		var label = $("label[for='" + this.id + "']");

		if (tests[i].resp[answerIndex].isCorrect) {
			label.css({ "color": "white", "background-color": "rgb(100, 150, 100)" });
		}
		else if (answerIndex === selectedAnswer) {
			label.css({ "color": "white", "background-color": "darkred" });
		}

		$(this).checkboxradio("disable");
	});

	$(".answer-feedback[data-question-index='" + i + "']")
		.text(isCorrect ? "Oso ondo!" : "Oso txarto :(");
	$(".res-1").text(results.corrects + "/" + results.answered);
	$(".res-2").text((results.corrects * 100 / results.answered).toFixed(2) + "%");
	$(".check-answer[data-question-index='" + i + "']").button("disable");
}
