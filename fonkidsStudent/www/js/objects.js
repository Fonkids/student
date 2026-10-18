/*
 * $Id: objects.js Oct 9, 2023 9:41:08 AM tta2627$
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



var tests = [//V3
	{
		question: "This is the first question...?",
		resp: [
			{
				text: "A: Wrong 0-0",
				isCorrect: false
			},
			{
				text: "B: This is the right one",
				isCorrect: true
			},
			{
				text: "C: Wrong 0-2",
				isCorrect: false
			},
			{
				text: "D: Wrong 0-3",
				isCorrect: false
			}
		]
	},
	{
		question: "This is the second question...?",
		resp: [
			{
				text: "A: Wrong 1-0",
				isCorrect: false
			},
			{
				text: "B: Wrong 1-1",
				isCorrect: false
			},
			{
				text: "C: Wrong 1-2",
				isCorrect: false
			},
			{
				text: "D: This is the right one",
				isCorrect: true
			}
		]
	},
	{
		question: "This is the third question...?",
		resp: [
			{
				text: "A: This is the right one",
				isCorrect: true
			},
			{
				text: "B: Wrong 2-1",
				isCorrect: false
			},
			{
				text: "C: Wrong 2-2", 
				isCorrect: false
			},
			{
				text: "D: Wrong 2-3",
				isCorrect: false
			}			
		]
	}
];

var results = {//V1
	corrects: 0,
	answered: 0
};

var pageT = {//V3
	load: function(i) {
//		console.log("load 1");

		$("#question-" + i).text("QUESTION " + (parseInt(i) + 1) + ": " + tests[i].question);

		$("label[id|='label-radio-choice-" + i + "']").each(
			function(rI) {
				$(this).text(tests[i].resp[rI].text);
			}
		);

//		console.log("load 2");
	}
}


var pageT = {
	create: function(i) {
	
		var pageDiv = $('<div data-role="page" id="page-t-' + i + '"></div>');
		var headerDiv ='<div data-role="header" data-position="fixed" role="banner" class="ui-header ui-bar-inherit ui-header-fixed slidedown">';

		var contentDiv =
			`<h1 style="margin-left: 0; margin-right: 0; white-space: nowrap; overflow: visible;">FonkidsStudent: P1</h1><p> Hemen logeatzeko/erregistratzeko edukia egongo da. Saioa hasterakoan hurrengo pantailara (P2) joko da</p>
			<a href="#page-t-1" id="next-0" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-mini ui-btn-inline ui-corner-all" data-transition="fade">Saioa hasi</a>`;

		pageDiv.append(headerDiv, contentDiv, footerDiv);

		$(document).on(
			"pageshow", "#page-t-" + i,
			function() {
				fitVisibleAll();
			}
		);

		//		console.log("create 2");
		return pageDiv;
	},
	load: function(i) {
		//		console.log("load 1");

		$("#question-" + i).text("QUESTION " + (parseInt(i) + 1) + ": " + tests[i].question);

		$("label[id|='label-radio-choice-" + i + "']").each(
			function(rI) {
				$(this).text(tests[i].resp[rI].text);
			}
		);

		$("#prev-" + i).attr("href", "#page-t-" + (parseInt(i) - 1));
		$("#next-" + i).attr("href", "#page-t-" + (parseInt(i) + 1));
		//		console.log("load 2");
	}
};

var appSession = {//V4
	initTimestamp: null,
	locale: "en-EN",
	loadSessionPages: function() {
		//		console.log("loadSessionPages 1");  
		var pageDiv;
		for (let i in tests) {
			pageDiv = pageT.create(i);
			$("body").append(pageDiv);
			pageT.load(i);
		}

		$("#prev-0").attr("href", "#page-t-" + (tests.length - 1));
		$("#next-" + (tests.length - 1)).attr("href", "#page-t-0");

		$(".alias").text("ALIAS: " + user.alias);
		$(".initTimestamp").text("DATE: " + dateUtils.localeFormat(appSession.initTimestamp, appSession.locale));

		$("#loginDiv").hide();
		$("#continue").show();
		$("#next-frontPage").show();

		//		console.log("loadSessionPages 2");
	}
};
