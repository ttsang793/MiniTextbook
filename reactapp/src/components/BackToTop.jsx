import { ArrowFatLineUp } from "@phosphor-icons/react";

const BackToTop = () => {
  window.onscroll = () => {
    const topBtn = document.getElementById("back-to-top-btn");

    if (window.scrollY >= 200) {
      topBtn.classList.add("opacity-100");
      topBtn.classList.remove("opacity-0");
    }
    else {
      topBtn.classList.add("opacity-0");
      topBtn.classList.remove("opacity-100");
    }
  }

  return (
    <button id="back-to-top-btn" className="bg-pink-950 rounded-lg text-white hover:bg-pink-900 duration-150 fixed bottom-5 right-5 p-3 opacity-0" onClick={backToTop}>
      <ArrowFatLineUp size={38} weight="fill" />
    </button>
  )

  function backToTop() {
    window.scrollTo({top: 0, behavior: "smooth"});
  }
}

export default BackToTop;