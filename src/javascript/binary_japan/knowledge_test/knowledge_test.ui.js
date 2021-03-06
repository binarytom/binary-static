var KnowledgeTestUI = (function () {
    "use strict";

    function createTrueFalseBox(question, showAnswer) {
        var qid = question.id;
        var trueId = qid + 'true';
        var falseId = qid + 'false';

        var $trueButton = $('<input />', {
            type: 'radio',
            name: qid,
            id: trueId,
            value: '1'
        });
        var $trueLabel = $('<label></label>', {class: 'img-holder true', for: trueId, value: '1'});
        var $trueTd = $('<td></td>').append($trueButton);

        var $falseButton = $('<input />', {
            type: 'radio',
            name: qid,
            id: falseId,
            value: '0'
        });
        var $falseLabel = $('<label></label>', {class: 'img-holder false', for: falseId, value: '0'});
        var $falseTd = $('<td></td>').append($falseButton);

        if (showAnswer) {
            if (question.answer) {
                $trueButton.prop('checked', true);
            } else {
                $falseButton.prop('checked', true);
            }
            $trueButton.attr('disabled', true);
            $falseButton.attr('disabled', true);
        }

        return [$trueTd, $falseTd];
    }

    function createQuestionRow(questionNo, question, showAnswer) {
        var $questionRow = $('<tr></tr>', {id: questionNo, class: 'question'});
        var $questionData = $('<td></td>').text(page.text.localize(question.question));
        var $questionLink = $('<a></a>', {name: question.id});
        $questionData.append($questionLink);

        var trueFalse = createTrueFalseBox(question, showAnswer);

        return $questionRow
            .append($questionData)
            .append(trueFalse[0])
            .append(trueFalse[1]);
    }

    function createQuestionTable(questions, showAnswer) {
        var $header = $('<tr></tr>');
        var $questionColHeader = $('<th></th>', {id: 'question-header', class: 'question-col'})
            .text(page.text.localize('Questions'));

        var $trueColHeader = $('<th></th>', {id: 'true-header', class: 'true-col'})
            .text(page.text.localize('True'));

        var $falseColHeader = $('<th></th>', {id: 'fasle-header', class: 'false-col'})
            .text(page.text.localize('False'));

        $header
            .append($questionColHeader)
            .append($trueColHeader)
            .append($falseColHeader);

        var $tableContainer = $('<table></table>', {id: 'knowledge-test'});

        $tableContainer.append($header);
        questions.forEach(function(question, questionNo) {
            var qr = createQuestionRow(questionNo, question, showAnswer);
            $tableContainer.append(qr);
        });

        return $tableContainer;
    }

    function createResultUI(score, time) {

        var $resultTable = $('<table></table>', { class: 'kv-pairs'});
        var $scoreRow = $('<tr></tr>').append($('<td>' + page.text.localize('Score') + '</td>')).append($('<td>'+ score + '</td>'));

        var date = new moment();
        var submitDate = moment.utc(date).format('YYYY') + page.text.localize('Year') + moment.utc(date).format('MM') + page.text.localize('Month') + moment.utc(date).format('DD') + page.text.localize('Day') + ' (' + page.text.localize('Weekday') + ')';

        var $dateRow = $('<tr></tr>').append($('<td>' + page.text.localize('Date') + '</td>')).append($('<td>'+ submitDate + '</td>'));

        $resultTable.append($scoreRow).append($dateRow);

        return $resultTable;
    }

    function createAlreadyCompleteDiv() {
        var msg = "{JAPAN ONLY}Dear customer, you've already completed the knowledge test, please proceed to next step.";
        var $completeDiv = $('<div></div>').text(page.text.localize(msg));
        return $completeDiv;
    }

    function createKnowledgeTestLink() {
        // change topbar to knowledge test link
        var $topbarmsg = $('#topbar-msg');
        if ($topbarmsg.length <= 0) {
            return;         // topbar not exist, do nothing
        }

        $topbarmsg.find('> span').removeClass('invisible');
        $topbarmsg.removeClass('invisible')
            .find('a').removeClass('invisible')
                .attr('href', page.url.url_for('/new_account/knowledge_testws')).html($('<span/>', {text: page.text.localize('{JAPAN ONLY}Take knowledge test')}));
    }

    return {
        createTrueFalseBox: createTrueFalseBox,
        createQuestionRow: createQuestionRow,
        createQuestionTable: createQuestionTable,
        createResultUI: createResultUI,
        createAlreadyCompleteDiv: createAlreadyCompleteDiv,
        createKnowledgeTestLink: createKnowledgeTestLink,
    };
}());

module.exports = {
    KnowledgeTestUI: KnowledgeTestUI,
};
