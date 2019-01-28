// $(document).ready(function() {
//     $('#example').DataTable();
//     $('#pl-close, .overlay').on('click', function() {
//         $('#product-cl-sec').removeClass('active');
//         $('.overlay').removeClass('active');
//         $('body').toggleClass('no-scroll')
//     });
// });
// $('.form-control').on('focus blur', function(e) {
//         $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
//     })
//     .trigger('blur');

// $(".formselect").select2({width: '100%'});
// //$(".formselect").select2();
// $('.sd-type').select2({
//     createTag: function(params) {
//         var term = $.trim(params.term);
//         if (term === '') {
//             return null;
//         }
//         return {
//             id: term,
//             text: term,
//             newTag: true // add additional parameters
//         }
//     }
// });
// $(".select-cat").select2({width: '100%'});

$(document).ready(function () { 
			
    $('#pl-close, .overlay').on('click', function () {
        $('#product-cl-sec').removeClass('active');
        $('.overlay').removeClass('active');
        $('body').toggleClass('no-scroll')
    });

    $('#productlist01').on('click', function () {
        $('#product-cl-sec').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $('body').toggleClass('no-scroll')		
    }); 
    
});

$('.form-control').on('focus blur', function (e) {
$(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
})
.trigger('blur');


$(".formselect").select2({width: '100%'});

$('.sd-type').select2({
createTag: function (params) {
var term = $.trim(params.term);

if (term === '') {
return null;
}

return {
id: term,
text: term,
newTag: true // add additional parameters
}
}
});


$(".select-cat").select2({width: '100%'});