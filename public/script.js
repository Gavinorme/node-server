class Player {
    constructor(name, position, team, nickname, skills) {
        this.name = name;
        this.position = position;
        this.team = team;
        this.nickname = nickname;
        this.skills = skills;
    }
}
const getSomething = async () => {
    try {
        return (await fetch("api/something/")).json();
    } catch(error) {
        console.log("error");
    }
};



const showSomething = async () => {
    let players = await getSomething();
    let playersDiv = document.getElementById("player-list");
    players.forEach((player) => {
        const section = document.createElement("section");
        playersDiv.append(section);

        const  a = document.createElement("a");
        a.href = "#";
        section.append(a);

        const h3 = document.createElement("h3");
        h3.innerHTML = player.name;
        a.append(h3);

        a.onclick = () => {
            const p = document.createElement("p");
            section.append(p);
            p.innerHTML = "Position: " + player.position + "<br>" + "Team: " + player.team + "<br>" + "Nickname: " + player.nickname + "<br>" + "Skills: " + player.skills;
            // li.innerHTML = player.img;
            return section;
        }    
    });
    
};




window.onload = () => showSomething();