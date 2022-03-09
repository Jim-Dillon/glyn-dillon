$(document).ready(function(){
    // Show hide popover
    $(".IG-header").click(function(){
        $(this).find(".IG-dropdown").slideToggle("fast");
    });
});

$(document).on("click", function(event){
    var $trigger = $(".IG-header");
    if($trigger !== event.target && !$trigger.has(event.target).length){
        $(".IG-dropdown").slideUp("fast");
    }            
});