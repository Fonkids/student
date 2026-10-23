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
 * 
 */
var previousPage = null;
var currentPage = null;



var headerHiztegia = [
	{
		
		mota: "info"
	
	},
	{
		
		mota: "ezarpenak" 
	}

]
var pantailenHiztegia = [
	{
		id: 0, // P1
		mota: "li", //log-in

	},
	{
		id: 1, // P2
		mota: "hm" // hasiera menua
	},
	{
		id: 2, // P3
		mota: "mp" // multiple choice
	},
	{
		id: 3, //P4
		mota: "mp" // multiple choice
	},
	{
		id: 4, // P5
		mota: "lz" // letra zopa
	},
	{
		id: 5, // P6
		mota: "mp" // multiple choice
	},
	{
		id: 6, // P7
		mota: "mp" // multiple choice
	},
	{
		id: 7, // P8
		mota: "lt" // lotu
	},
	{
		id: 8, // P9
		mota: "mp" // multiple choice
	},
	{
		id: 9, // P10
		mota: "ah" // ahorcado
	},
	{
		id: 10, // P11
		mota: "mp" // ahorcado
	},
	{
		id: 11,
		mota: "em" // emaitzak
	}


]

var lotu = [ // Letra zoparako balio du ere momentuz
    { element: "Lehen elementua", answer: "A" },
    { element: "Bigarren elementua", answer: "C" },
    { element: "Hirugarren elementua", answer: "B" }
];
  var ahorcado = [
    {
        resp: "ERANTZUNA",
        pistak: [
            {
                1: "Lehen pista",
                2: "Bigarren pista",
                3: "Hirugarren pista"
            }
        ]
    }
];

var tests = [
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

var results = {
	corrects: 0,
	answered: 0,
	answers: {}
};
var ariketak = [
	{
		mota: "li",
		enuntziatua: "hemen logeatzeko formularioa kargatuko da",
		egitura: null

	},
	{
		mota: "hm",
		enuntziatua: "hemen hasiera menua kargatuko da",
		egitura: null

	},
	{
		mota: "em",
		enuntziatua: "hemen ikaslearen emaitzak erakutsiko dira",
		egitura: null

	},
	{
		mota: "ezarpenak",
		enuntziatua: "hemen aplikazioaren ezarpenak erakutsiko dira",
		egitura: null

	},
	
	{
		mota: "info",
		enuntziatua: "hemen erabiltzailearen profilearen informazioa erakutsiko da",
		egitura: null

	},
	{
		mota: "mp",
		enuntziatua: "Galderak multiple choice formatukoak izango dira, multimedia edukia dutelarik",
		egitura: tests
	
	},
	{
		mota: "lt",
		enuntziatua: "Lotu motako ariketa izango da, multimedia edukiak elkarrekin erlazionatuz",
		egitura: lotu
	},
	{
		mota: "lz",
		enuntziatua: "Letra zopa motako ariketa",
		egitura: lotu
	},
	{
		mota: "ah",
		enuntziatua: "Ahorcado motako ariketa, pistekin",
		egitura: ahorcado
	}

]



function createFooter(i) {
    var prev = i - 1;
    var next = i + 1;
	next != pantailenHiztegia.length ? next : next = 1 // hasiera menura bueltatzeko, ez log menura

    return $('<div data-role="footer" data-position="fixed" style="padding: 5px 10px;"> <div style="display: flex; justify-content: space-between; align-items: center;">' +
        (prev >= 0
            ? '<a  href="#page-t-' + pantailenHiztegia[prev].mota + '-' + prev + '" id="prev-' + i + '" class="ui-btn ui-icon-arrow-l ui-btn-icon-left ui-mini ui-btn-inline ui-corner-all" data-transition="fade">Aurrekoa</a>'
            : ''
        ) +
		
        '<a  href="#page-t-' + pantailenHiztegia[next].mota + '-' + next + '" id="next-' + i + '" class="ui-btn ui-icon-arrow-r ui-btn-icon-right ui-mini ui-btn-inline ui-corner-all" data-transition="fade">Hurrengoa</a>' +
        '</div>'+
		'<h4 style="text-align: center; margin: 5px 0 0;">2026-2027</h4>' +
        '</div>');
}


function createContent(i) {
    const pantaila = pantailenHiztegia[i];

    const arikMota = ariketak.find(
        a => a.mota === pantaila.mota
    );

    const contentDiv = $('<div data-role="content"></div>');

    contentDiv.append(
        $('<h2></h2>').text(`P${i + 1}: ${arikMota.enuntziatua}`)
    );

    switch (pantaila.mota) {
        case "mp": // Multiple choice
            q = arikMota.egitura[0].question;
                const questionDiv = $("<div></div>");
                const answerGroup = $('<fieldset data-role="controlgroup"></fieldset>');

                questionDiv.append(
                    $("<h3></h3>").text(q)
                );

                arikMota.egitura[0].resp.forEach((answer, aIndex) => {
                    const id = `q${i}-${i}-${aIndex}`;

                    answerGroup.append(
                        $("<input>", {
                            type: "radio",
                            name: `question-${i}-${i}`,
                            id: id,
                            value: aIndex,
                            "data-question-index": i
                        }),
                        $("<label>", {
                            for: id,
                            text: answer.text
                        })
                    );
                });

                questionDiv.append(
                    answerGroup,
                    $("<button>", {
                        type: "button",
                        text: "Check answer",
                        "data-question-index": i
                    })
                        .addClass("check-answer")
                        .on("click", function() {
                            check(0);
                        }),
                    $("<p>", {
                        
                        "data-question-index": i
                    }).addClass("answer-feedback")
                );

                contentDiv.append(questionDiv);
            
            contentDiv.append(
                $("<p></p>").append(
                    $("<span></span>").addClass("res-1").text("0/0"),
                    " correct answers; ",
                    $("<span></span>").addClass("res-2").text("0.00%"),
                    " correct"
                )
            );
            break;

        case "lt": // Lotu
            arikMota.egitura.forEach((item, index) => {
                contentDiv.append(
                    $("<p></p>").text(
                        `${item.element} → ${item.answer}`
                    )
                );
            });
            break;

        case "lz": // Letra zopa
       
			arikMota.egitura.forEach((item, index) => {
				contentDiv.append(
					$("<p></p>").text(
						`${item.element} → ${item.answer}`
					)
				);
				$("<p></p>").text("Letra zopa hemen agertuko da.")
			});
            
            break;

        case "ah": // Ahorcado
            arikMota.egitura.forEach(item => {
                contentDiv.append(
                    $("<p></p>").text(item.pistak[0][1])
                );
            });
            break;

        default:
            contentDiv.append(
                $("<p></p>").text("Edukirik ez dago.")
            );
    }

    return contentDiv;
}
function createBackButton() {
    return $('<a href="#" class="ui-btn ui-icon-arrow-l ui-btn-icon-left ui-mini ui-corner-all">Atzera</a>')
        .on("click", function (event) {
            event.preventDefault();

            if (previousPage && $(previousPage).length) {
                $.mobile.changePage(previousPage, {
                    transition: "fade"
                });
            } else {
                console.log("No previous page found:", previousPage);
            }
        });
}

function createHeader(i) {
    var header = $('<div data-role="header" data-position="fixed">' +
        '<table style="width:100%; table-layout:fixed;"><tbody><tr>' +
        '<td style="text-align:left; width:33%;"></td>' +
        '<td style="text-align:center; width:34%;">Logo</td>' +
        '<td style="text-align:right; width:33%;"></td>' +
        '</tr></tbody></table></div>');

    header.find("td").first().append(
        $('<a href="#page-t-info" class="ui-btn ui-mini ui-corner-all">Info</a>')
            .on("click", saveCurrentPage)
    );

    header.find("td").last().append(
        $('<a href="#page-t-ezarpenak" class="ui-btn ui-mini ui-corner-all">Ezarpenak</a>')
            .on("click", saveCurrentPage)
    );

    return header;
}
function saveCurrentPage() {
    var activePage = $.mobile.activePage;

    if (activePage) {
        previousPage = "#" + activePage.attr("id");
    }
}
var pageHeader = {
    create: function(i) {
        var pageDiv = $('<div data-role="page" id="page-t-' +
            headerHiztegia[i].mota + '"></div>');

        var headerDiv = $('<div data-role="header">' +
            '<h1>' + headerHiztegia[i].mota + '</h1>' +
            '</div>');

        var contentDiv = $('<div data-role="content"></div>');

        if (headerHiztegia[i].mota === "info") {
            contentDiv.append(
                $('<p></p>').text("Erabiltzailearen profilearen informazioa")
            );
        } else if (headerHiztegia[i].mota === "ezarpenak") {
            contentDiv.append(
                $('<p></p>').text("Aplikazioaren ezarpenak")
            );
        }

        contentDiv.prepend(createBackButton());

        pageDiv.append(headerDiv, contentDiv);

        return pageDiv;
    }
};
var pageOrokorra = {
	create: function(i) {
		
		var pageDiv = $('<div data-role="page" id="page-t-'+pantailenHiztegia[i].mota+'-' + i + '"></div>');
		var headerDiv = createHeader(i);
		var contentDiv = createContent(i);
		var footerDiv = createFooter(i)

		pageDiv.append(headerDiv, contentDiv, footerDiv);
		return pageDiv;

	},
	
	
};

var appSession = {
	initTimestamp: null,
	locale: "en-EN",
	loadSessionPages: function() {
		if (pantailenHiztegia.length === 0) {
			return;
		}

		for (let i = 0; i < pantailenHiztegia.length; i++) {
		

			var pageDiv = pageOrokorra.create(i);
			$("body").append(pageDiv);
			pageDiv.page();
			
		}

		for (let i = 0; i < headerHiztegia.length; i++){
			var pageDiv = pageHeader.create(i);
			$("body").append(pageDiv);
			pageDiv.page();

		}

		$.mobile.changePage("#page-t-"+pantailenHiztegia[0].mota+"-0");
	}
};
