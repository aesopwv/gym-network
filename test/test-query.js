console.log("post script loaded!");

_submitButton = document.getElementById("test-submit");
_form = document.getElementById("test-form");


_form.addEventListener("submit", async (event) => 
    {
    event.preventDefault();

    const input = document.getElementById("input").value;
    console.log(input);

    const response = await fetch("/test-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
    });
    console.log(`Data sent: ${input}`);

    console.log(await response.text());
    });