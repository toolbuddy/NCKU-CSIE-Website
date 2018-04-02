var UIController = (function () {

  setEventHandler = () => {

    // check if the cursor actually enter a div or not
    var isEnterDiv = false;
    // select parent element which is the overview page
    var hoverOnCardParent = document.querySelector(".overview");
    var hoverOnCardDiv = document.querySelectorAll("#hover-event");
    
    // toggle function
    var displayToFlex = function (e) {
      console.log("I hover into");
      console.log(e.target);
      if (e.target.classList.contains("overview__hover")) {
        e.target.querySelector("#hover-event").style.display = "flex";
      }
    }

    var checkEnterBlock = (e) => {
      isEnterDiv=true;
      console.log(isEnterDiv);
    }

    //var displayToNone
    // set mouseover event to the div element
    // cuz it appears on top of the overview__hover
    // so if we set mouserout to overview__hover,it will not be seen,cuz we will mouseout of the div not the overview__hover

    var displayToNone = function (e) {
      console.log("I hover out");
      console.log(e.target);
      if (isEnterDiv) {
        if(e.target.id === "hover-event"){
          e.target.style.display="none";
          isEnterDiv=false;
        }
      }
      else{
        if(e.target.classList.contains("overview__hover")){
          e.target.querySelector("#hover-event").style.display = "none";
        }
      }
    }


    // set event handler
    hoverOnCardDiv.forEach((cur) => {
      cur.addEventListener("mouseenter", checkEnterBlock);
    });
    hoverOnCardParent.addEventListener("mouseover", displayToFlex);
    hoverOnCardParent.addEventListener("mouseout", displayToNone);
  }

  return {

    init: function () {
      setEventHandler();
    }

  }
})();

UIController.init();