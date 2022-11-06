$(".sidebar-user").click(function () {
  $(".login-window, .page-cover").addClass("enabled");
  $(".login-window").css({
    transition: "0.7s cubic-bezier(0.16,1,0.3,1)",
  });
});

$(".page-cover").click(function () {
  $(".login-window, .page-cover").removeClass("enabled");
  $(".login-window").css({
    transition: "0.1s cubic-bezier(0.6, 0, 1, 0.8)",
  });
});

$(".login-button").click(function () {
  $(
    ".login-button, .login-animation-add, .login-animation-add-scaler, .login-animation-avatar-mover, .login-animation-avatar, .burst, .anim-welcome, .anim-nickname"
  ).addClass("logining");
});
