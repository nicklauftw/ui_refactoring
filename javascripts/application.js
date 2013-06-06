ValidateForm_Email// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

;(function($){
 
 $.fn.appHelp = function(args){
   var opts = $.extend({ target: '#learnMoreDlg', title: 'Learn More' }, args);
   return this.each(function() {
     var winWidth = $(window).width();
     var winHeight =$(window).height();

     $(this).click(function() {
        $(opts.target).dialog({ position: 'center', title: opts.title, 
              width: winWidth * .5, height: winHeight * 0.6 
              });
        return false;
     });
	});
 };

})(jQuery);

jQuery(document).ready(function() {
    jQuery("input").not( jQuery(":button") ).keypress(function (evt) {
      if (evt.keyCode == 13) {
        iname = jQuery(this).val();
        if (iname !== 'Submit'){
          var fields = jQuery(this).parents('form:eq(0),body').find('button, input, textarea, select');
          var index = fields.index( this );
          if ( index > -1 && ( index + 1 ) < fields.length ) {
            fields.eq( index + 1 ).focus();
          }
          return false;
        }
      }
    });

});

function addCsrfToXhr(xhr, settings) {
  var token = jQuery('meta[name="csrf-token"]').attr('content');
  if (token) xhr.setRequestHeader('X-CSRF-Token', token);
}

function check_username_value()
{
    if($("#user_username").val() == "")

    {
        $("#name_ckeck").hide();
    }
    else
    {
        $("#name_ckeck").show();
    }
}
function show_upload_area()
{
    $("#upload_area").show();
}

function check_passwordfield_value()
{
   
    if(($("#user_password").val() == "") || ($("#user_password").val().length < '6'))

    {
        $("#pass_ckeck").hide();
    }
    else
    {
        $("#pass_ckeck").show();
    }
}

function show_button(){
    if( !$("#user_username").val().match(/^\s*$/) && !$("#user_password").val().match(/^\s*$/) && !$("#user_password_confirmation").val().match(/^\s*$/) )
    {
        $("#createButton").show();
    }
    else
    {
        $("#createButton").hide();
    }
}

function validatePwd()
{
     if(($("#user_password_confirmation").val() == "") || ($("#user_password_confirmation").val().length < '6') ||($("#user_password_confirmation").val() != $("#user_password").val()))

    {
        $("#cpass_ckeck").hide();
    }
    else
    {
        
        $("#cpass_ckeck").show();
    }
    
}
//not using this code replace it with jquery
function ValidateForm_Email(user_new, user_email){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var address = document.forms[user_new].elements[user_email].value;
    if(reg.test(address) == false) {
        alert('Invalid Email Address');
        return false;
    }
    else if($("#user_first_name").val() == "") {
        alert('Please Enter First Name.');
        return false;
    }
    else if($("#user_last_name").val() == "") {
        alert('Please Enter Last Name.');
        return false;
    }
}

// HireologyUtilities
(function() {
  var popupdimdiv = null;
  var popupdiv = null;

  var create_popupdiv = function() {
    if (popupdiv == null) {
      popupdimdiv = $('<div class="on" style="z-index: 10100;"></div>');
      popupdiv = $('<div class="overOuter"></div>');
      $('<div class="olddesign"></div>').append(popupdimdiv, popupdiv).appendTo('body');
    }
  };

  var HireologyUtilities = {};
  HireologyUtilities.open_popup = function(html) {
    create_popupdiv();
    popupdimdiv.show();
    popupdiv.html(html).show();
  };

  HireologyUtilities.disableSubmitButton = function(forForm, width) {
    width = width || 129; // default parameters

    forForm.submit(function(e){
      var submit_button = $('input#submit_button');
      submit_button.attr('disabled', 'disabled');
      var loading = $('<div style="position: absolute; background: white url(/images/indicator.gif) center center no-repeat; width: ' + width + 'px; height: 43px; opacity: 0.5; -moz-opacity: 0.5; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);"></div>');
      submit_button.parent().prepend(loading);
    });
  };

  HireologyUtilities.load_and_open_popup = function(url) {
    create_popupdiv();
    popupdiv.load(url, function() {
      popupdimdiv.show();
      popupdiv.show();
    });
  };
  HireologyUtilities.hide_popup = function() {
    popupdimdiv.hide();
    popupdiv.hide();
  };
  HireologyUtilities.show_loading_animation = function(elem) {
    var parent = elem.offsetParent();
    var loading = $('<div class="loading"></div>');
    var pos = elem.position();
    loading.css('top', (pos.top + parseFloat(elem.css('margin-top'))) + 'px');
    loading.css('left', (pos.left + parseFloat(elem.css('margin-left'))) + 'px');
    loading.width(elem.outerWidth());
    loading.height(elem.outerHeight());
    parent.append(loading);
    return loading;
  };
  HireologyUtilities.send_bgchk_agreement = function(accountid) {
    $.ajax({
      url: '/accounts/' + accountid + '/send_bg_chk_agreement',
      type: 'post', beforeSend: addCsrfToXhr,
      success: function() {
        jAlert("Since this is your first background check order, we ask that you please agree to the terms set forth by our provider. You have been emailed an agreement to submit online. Your information will be processed within 48 hours, and you will be notified by email once your account is enabled to order background verification information.", 'From the Hireology Help Center:');
      }
    });
  };
  HireologyUtilities.bgchk_order_perm = function() {
    jAlert("You are currently not authorized to order confidential background verification information. Please contact your account's owner for permission.", 'From the Hireology Help Center:');
  };
  HireologyUtilities.bgchk_view_perm = function() {
    jAlert("You are currently not authorized to review confidential background verification information. Please contact your account's owner for permission.", 'From the Hireology Help Center:');
  };
  // Function for autocomplete renderItem
  HireologyUtilities.autocomplete_renderItem = function(ul, item) {
    return $("<li></li>")
      .data("item.autocomplete", item)
      .append($("<a></a>").html(item.label)) 
      .appendTo(ul);
  };

  window.HireologyUtilities = HireologyUtilities;
})();

// Search box at the top right
$(function() {
  $.widget( "Hireology.catcomplete", $.ui.autocomplete, {
    _renderMenu: function( ul, items ) {
      var that = this,
        currentCategory = "";
      $.each( items, function( index, item ) {
        if ( item.category != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
          currentCategory = item.category;
        }
        that._renderItemData( ul, item );
      });
    }
  });
  
  var autocomplete_data = null;
  var sitesearch = $('#masthead .app-search input');
  if (sitesearch.length > 0) {
    sitesearch
      .focus(function() {
        if (autocomplete_data == null) {
          var loading = HireologyUtilities.show_loading_animation($(this));
          $.get('/accounts/jobs_and_candidates', null, function(data) {
            autocomplete_data = data;
            loading.remove();
          }, 'json');
        }
      })
      .catcomplete({
        source: function(request, response) {
          var matcher = new RegExp(request.term, 'i');
          var result = [];
          if (autocomplete_data != null) {
            $.each(autocomplete_data.jobs, function() {
              if (!request.term || matcher.test(this[1])) {
                result.push({
                  id: this[0],
                  label: this[1].replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(request.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>"),
                  value: this[1],
                  category: 'Jobs'
                });
              }
            });
            $.each(autocomplete_data.candidates, function() {
              if (!request.term || matcher.test(this[1])) {
                result.push({
                  id: this[0],
                  label: this[1].replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(request.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>"),
                  value: this[1],
                  category: 'Candidates'
                });
              }
            });
          }
          response(result);
        },
        delay: 0,
        select: function(event, ui) {
          if (!ui.item || !ui.item.id)
            return false;
          else if (ui.item.category == 'Jobs')
            window.location.href = '/jobs/' + ui.item.id;
          else if (ui.item.category == 'Candidates')
            window.location.href = '/candidates/' + ui.item.id + '/edit';
        },
        open: function(event, ui) {
          $(this).catcomplete('widget').css('z-index', 40);
        },
        minLength: 0
      }).data('catcomplete')._renderItem = HireologyUtilities.autocomplete_renderItem;
  }
});

// Switching underscore from <% syntax to {{
_.templateSettings = {
  interpolate: /\{\{\=(.+?)\}\}/g,
  evaluate: /\{\{(.+?)\}\}/g
};
