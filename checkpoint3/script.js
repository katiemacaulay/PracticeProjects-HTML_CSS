'use strict'

let clickCounter = 0;

$('.musicalperformance').click(function(){
  clickCounter++;
  $(".textbox").text(`You have made: $${clickCounter}`);
  buttonCheck;
// });

$('.stopper').click(function(){
  Tone.Transport.stop()
})
$('.masterpiece').click(function(){
  var synth3 = new Tone.AMSynth().toMaster()
  clickCounter++;
  let notesToPlay = []
  $(".textbox").text(`You have made: $${clickCounter}`);
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
		//play the note on mouse down
		synth2.triggerAttack($(e.target).data('note'))
	})
	button.addEventListener('mouseup', function(e){
		//release on mouseup
		synth2.triggerRelease()
	})
})

$('span').click(function(){
  let isClicked = $(this).data('clicked')
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
     Tone.Transport.schedule(triggerSynth(notes), i)
  })
  Tone.Transport.loopEnd = '2m'
  Tone.Transport.loop = false
  Tone.Transport.start('+0.1')
}
