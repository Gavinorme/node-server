const getSomething = async () => {
    try {
        return (await fetch("api/something/")).json();
    } catch(error) {
        console.log("error");
    }
};

const showSomething = async () => {
    let somethings = await getSomething();
    let somethingsDiv = document.getElementById("something-list");
    somethings.forEach((something) => {
        const section = document.createElement("section");
        somethingsDiv.append(section);

        const  a = document.createElement("a");
        a.href = "#";
        section.append(a);

        const h3 = document.createElement("h3");
        h3.innerHTML = something.name;
        a.append(h3);

        a.onclick = () => {
            const somethingDetails = document.getElementById("something-details");
            somethingDetails.innerHTML = "";
            const p = document.createElement("p");
            somethingDetails.append(p);
            p.innerHTML = something.descript;
        }
    });
};


window.onload = () => showSomething();