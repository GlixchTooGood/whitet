const al = (g) => {
    alert(g);
    console.error(g);
};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const r = await fetch("/api/v2/user");
        const a = await r.json();
        if (a.success) {
            const u = a.user;
            document.querySelector("#profiletrian").src = u.pfp;
            document.querySelector(".styles__headerBg___12ogR-camelCase").src = u.banner;
            document.querySelector("#profileuser").textContent = u.username;
            document.querySelector("#role").textContent = u.role;
            document.querySelector("#pfpimg").src = u.pfp;
            document.querySelector("#usernamedrop").textContent = u.username;
            document.querySelector("#opened").textContent = u.packsOpened;
            document.querySelector("#tokens").textContent = u.shells;
            document.querySelector("#trians").textContent = "0/0";
            document.querySelector("#posts").textContent = u.messages;
            document.querySelector("#likes").textContent = u.auctions;
            } 
            else {
            al(a.error);
            window.location.replace("/login")
        }
    } catch (error) {
        al("Unkown error");
        console.error(error);
    }
});
