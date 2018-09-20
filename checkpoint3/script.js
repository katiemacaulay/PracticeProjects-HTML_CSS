'use strict'

let clickCounter = 0;
let multiplier = 1

function updateClickCounter() {
  clickCounter = clickCounter + (1 * multiplier);
  $(".textbox").text(`You have made: $${clickCounter}`);
}

$('.musicalperformance').click(updateClickCounter);

$('.stopper').click(function(){
  Tone.Transport.stop()
})
$('.masterpiece').click(function(){
  var synth3 = new Tone.AMSynth().toMaster()
  updateClickCounter()
  let notesToPlay = []
  $('.intrument1beats').each(function(beat, spanContainer){
    notesToPlay.push([])
    $('span', spanContainer).each(function(i, span) {
      let isClicked = $(span).data('clicked')
      let note = $(span).data('note')
      if (isClicked) {
          notesToPlay[beat].push(note)
      }
    })
  })
  playNotes(notesToPlay)
});

document.querySelectorAll('#instrument1 span').forEach(function(button){
	button.addEventListener('mousedown', function(e){
    let isDisabled = $(e.target).hasClass('disabled') || $(e.target).hasClass('disableBeat');
    if(isDisabled){
      return false;
    }
		//play the note on mouse down
		synth2.triggerAttack($(e.target).data('note'))
	})
	button.addEventListener('mouseup', function(e){
    let isDisabled = $(e.target).hasClass('disabled') || $(e.target).hasClass('disableBeat');
    if(isDisabled){
      return false;
    }
		//release on mouseup
		synth2.triggerRelease()
	})
})

function disableNotes(){
  $('.la').addClass('disabled');
  $('.lowdo').addClass('disabled');
  $('.re').addClass('disabled');
  $('.highdo').addClass('disabled');
  $('.fa').addClass('disabled');
  $('.ti').addClass('disabled');
}

function disableColumn(){
  $('.beat5 > span').addClass('disableBeat');
  $('.beat5and > span').addClass('disableBeat');
  $('.beat6 > span').addClass('disableBeat');
  $('.beat6and > span').addClass('disableBeat');
  $('.beat7 > span').addClass('disableBeat');
  $('.beat7and > span').addClass('disableBeat');
  $('.beat8 > span').addClass('disableBeat');
  $('.beat8and > span').addClass('disableBeat');
}

disableNotes();
disableColumn();

function addingCoolness(){
  let addButton = $('.buyextra > button')
  addButton.click(function(){
    let cost = $(this).data('cost')
    if(cost <= clickCounter){
      let noteToEnable = $(this).data('note');
      $(`[data-note="${noteToEnable}"]`).removeClass('disabled');
      $(this).addClass('hidden');
      clickCounter = clickCounter - cost;
      $(".textbox").text(`You have made: $${clickCounter}`);
    }
  })
}
function addingAwesomeness(){
  let addBeat = $('.addColumn > button')
  addBeat.click(function(){
    let cost = $(this).data('cost')
    if(cost < clickCounter){
      let noteToEnable = $(this).data('beat');
      $(`.${noteToEnable} > span`).removeClass('disableBeat');
      $(this).addClass('hidden');
      clickCounter = clickCounter - cost;
      $(".textbox").text(`You have made: $${clickCounter}`);
    }
  })
}

function addingTeacher(){
  let addMoney = $('.increasemoney > button')
  addMoney.click(function(){
    let cost = $(this).data('cost')
    if(cost < clickCounter){
      multiplier = multiplier * 2;
      $(this).addClass('hidden');
      clickCounter = clickCounter - cost;
      $(".textbox2").text(`You are more musical!`);
      $(".textbox").text(`You have made: $${clickCounter}`);
    }
  })
}


addingCoolness();
addingAwesomeness();
addingTeacher();

$('span').click(function(){
  let isClicked = $(this).data('clicked')
  let isDisabled = $(this).hasClass('disabled') || $(this).hasClass('disableBeat')
  if(isDisabled){
    return false;
  }
  if(isClicked) {
    $(this).removeClass($(this).data('color'));
    $(this).data('clicked', false)
  }else{
    $(this).addClass($(this).data('color'));
    $(this).data('clicked', true)
  }
})
var synth2 = new Tone.AMSynth().toMaster();
var synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

function triggerSynth(note){
   return function (time) {
       synth.triggerAttackRelease(note, '8n', time)
   }
}

function playNotes(notesToPlay) {
  notesToPlay.forEach(function (notes, i) {
     console.log(notes, 0.5, i);
     Tone.Transport.schedule(triggerSynth(notes), i/2)
  })
  Tone.Transport.loopEnd = '2m'
  Tone.Transport.loop = false
  Tone.Transport.start('+0.1')
}
