document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    if (password === "abcd") {
        window.location.href = "https://style-s.vercel.app/Admin.html";
    } else {
        errorMsg.textContent = "Invalid password. Please try again.";
    }
});
