<script>
  import Pusher from "pusher-js";

  import "@fontsource/inter";
  let count = 0;
  let val = "";
  let quote = "";
  let pusher = new Pusher("76f8d754429d0de93874", { cluster: "ap2" });
  let cacheChannel = pusher.subscribe("cache-quote");

  cacheChannel.bind("newQuote", (data) => {
    quote = data;
  });

  cacheChannel.bind("pusher:cache_miss", function () {
    fetch("/cachemiss", { method: "POST" });
  });

  cacheChannel.bind("pusher:subscription_count", (data) => {
    count = data.subscription_count;
  });
  async function quoteFn() {
    if (val.trim() !== "") {
      const rawResponse = await fetch("/quote", {
        method: "POST",
        body: JSON.stringify({ val }),
        headers: {
          "content-type": "application/json",
        },
      });
    }

    const content = await rawResponse;

    console.log(content);
  }
</script>

<main>
  <h1>Broadcast Your Words!</h1>

  <form on:submit|preventDefault on:submit={() => (val = "")}>
    <!-- svelte-ignore a11y-autofocus -->
    <input
      autofocus
      type="text"
      bind:value={val}
      required
      placeholder="Type here..."
    />
    <button on:click={quoteFn}>Speak to the world!</button>
  </form>
  <p>Check the message the person before you sent!</p>
  <h2>"{quote}"</h2>
  <p id="count">Number of users connected : {count}</p>
</main>

<style>
  :global(body) {
    background: #fbda61;
    background: -webkit-linear-gradient(to left, #fbda61, #ff5acd);
    background: linear-gradient(to left, #fbda61, #ff5acd);
  }
  main {
    font-family: Inter, Montserrat, "sans-serif";
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    /* height: 60vh; */
    align-items: center;
    margin: 10vh 0;
    overflow: hidden;
  }
  input {
    font-size: 3rem;
    border: none;
    max-width: 90vw;
    margin: 20px;
    background-color: transparent;
    outline: none;
    text-align: center;
  }
  p {
    margin-top: 10vh;
  }
  h2 {
    font-size: 5rem;
    max-width: 90vw;
    word-wrap: break-word;
    font-style: italic;
    margin: 1px;
  }
  main > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    align-items: center;
  }
  button {
    width: 50%;
    padding: 1em 2em;
    border: none;
    border-radius: 10px;
    font-size: 1.5rem;
    margin-top: 2vh;
    background: #ffca58;
    background: -webkit-linear-gradient(to left, #ffca58, #8b49ff);
    background: linear-gradient(to left, #ffca58, #8b49ff);
    box-shadow: 12px 9px 21px -1px rgba(0, 0, 0, 0.25);
  }
  button:active {
    box-shadow: inset 12px 9px 21px -1px rgba(0, 0, 0, 0.25);
  }
  h1 {
    position: fixed;
    bottom: 0;
    right: 20px;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 800px) {
    h1 {
      display: none;
    }
    #count {
      position: fixed;
      bottom: 0;
    }
  }
</style>
