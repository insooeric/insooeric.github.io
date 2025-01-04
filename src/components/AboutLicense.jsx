import UpArrowIcon from "../svgs/UpArrowIcon";
import PuzzleGame from "./PuzzleGame";

const AboutLicense = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCodepenClick = () => {
    window.open("https://codepen.io/desandro", "_blank");
  };

  return (
    <>
      <h2>License</h2>
      <div className="divider" />
      <div className="terms-policies-content">
        Apache License
        <br /> Version 2.0, January 2004
        <br />
        http://www.apache.org/licenses/
        <br />
        <br />
        <div className="description">
          TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION <br />
          are usually applied in various github projects, but not in here.
          <br />
          HUGE DISCLAIMER THAT I&apos;M GONNA TALK ABOUT ANYTHING BEYOND THIS
          POINT.
          <br />
          LITERALLY ANYTHING. SO YOU MAY SKIP IT.
          <br />
          <br />
          1. Definitions. <br />
          <p>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>The word APACHE Stands for
            &quot;All Programmers Appreciate Code, However Excessive&quot; This
            joke is a playful reinterpretation of the word &quot;Apache,&quot;
            which is commonly associated with the Apache Software Foundation and
            its popular web server software. - Gemini
          </p>
          <br />
          2. Grant of Copyright License. <br />
          <p>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>You probably wondered if
            I&apos;m really going to mention the real policy on this page, but I
            won&apos;t. It&apos;s going to be too long and boring to read; I
            guarantee that you&apos;d find it more worthwhile to take a nap
            instead. Lowkey, I believe those bloody long policy documents exist
            to be skipped, though some might say, &quot;iT&apos;S ReAlLy
            iMpOrTaNt tO ReAd wOrD By wOrD, LiNe bY LiNe, AnD FuLlY UnDeRsTaNd
            wHaT YoU&apos;rE DoInG. &quot; And sure, yeah, I agree when it comes
            to dealing with some serious documents. But let&apos;s be honest. We
            mindlessly consent to 90% of those Terms and Policies without
            reading them. I mean... at least I do.
          </p>
          <br />
          3. Grant of Patent License. <br />
          <p>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>Hello, everyone! This is
            Professor ChatGPT, your guide to the fascinating worlds of
            technology, creativity, and critical thinking. With expertise
            spanning AI, coding, and digital innovation, I’m here to ignite your
            curiosity. Let’s learn, explore, and create together in this dynamic
            journey of discovery. Remember, questions are the key to growth! -
            Mr. ChatGPT
          </p>
          <br />
          4. Redistribution. <br />
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>Let&apos;s talk about some fun
          facts here. Did you know?
          <ol>
            <li>
              Octopus Revenge: Octopuses throw objects, including shells and
              silt, at each other when annoyed—like underwater tantrums.
            </li>
            <li>
              Chicken T-Rex: Chickens are the closest living relatives to T-Rex.
              Imagine Jurassic Park but with a giant chicken running after you.
              Terrifying, yet oddly delicious?
            </li>
            <li>
              Sloth’s Bathroom Break: Sloths climb down trees once a week to
              poop. This takes so long it’s their most dangerous activity,
              making them easy prey. Nature, why?
            </li>
            <li>
              Dolphin Nicknames: Dolphins call each other by unique whistles,
              essentially having names. Somewhere in the ocean, there’s a
              dolphin named Steve annoying his friends.
            </li>
            <li>
              Banana DNA Drama: Around 50% of a banana’s DNA matches humans. So
              technically, if we merge two bananas, we could create a
              human-banana hybrid. Wake up evolution? You gotta work! 🍌🍌
            </li>
          </ol>
          <br />
          5. Submission of Contributions. <br />
          <p>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>Oh hey, nice job! You made all
            the way down to here! I have nothing much to give you other than
            compliment, but if you&apos;re down, here is a cool game I found in{" "}
            <span
              onClick={handleCodepenClick}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              🚀HERE🚀
            </span>
          </p>
        </div>
      </div>

      <div className="game-container">
        <PuzzleGame />
      </div>

      <div className="scroll-top" onClick={handleScrollToTop}>
        <UpArrowIcon />
      </div>
    </>
  );
};

export default AboutLicense;
