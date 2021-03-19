$(function() {
    if (localStorage.getItem("mode") == "dark"){
        $("body").addClass("dark");
        $(".fa-moon").removeClass("far");
        $(".fa-moon").addClass("fas");
    }
    $(".dark-mode").click(()=>{
        $("body").toggleClass("dark");
        if(localStorage.getItem("mode") == "dark"){
            localStorage.setItem("mode", "light");
            $(".fa-moon").removeClass("fas");
            $(".fa-moon").addClass("far");
        } else{
            localStorage.setItem("mode", "dark");
            $(".fa-moon").removeClass("far");
            $(".fa-moon").addClass("fas");
        }
    })
});