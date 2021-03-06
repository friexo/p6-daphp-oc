export function commentsLoader(axios) {
  $("#commentsLoaderButton").click(function () {
    const $this = $(this);
    const index = parseInt($this.val());
    const idTrick = parseInt($("#commentsLoaderButton").attr("data-id-trick"));

    axios
      .get("/trick/" + idTrick + "/comments/" + index)
      .then(function (res) {
        const comments = res.data;
        comments.forEach(layoutCard);
        $this.val(index + 5);

        if (comments.length < 5) {
          $this
            .off("click")
            .removeClass("btn-primary")
            .addClass("btn-secondary")
            .addClass("disabled")
            .text("Tout est là...");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  function layoutCard(comment) {
    const $template = $(
      document.getElementsByClassName("comment-card")[0]
    ).clone(true);
    const $img = $($template.find(".comment-user-avatar"));
    const $userName = $($template.find(".comment-username"));
    const $content = $($template.find(".comment-content"));

    $img.attr("src", "/uploads/avatars/" + comment.userAvatar);
    $userName.text(comment.userName);
    $content.text(comment.content);

    $("#comment-form-container").append($template);
  }
}
