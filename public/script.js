const getPlayer = async () => {
    try {
        return (await fetch("https://node-server-pwd6.onrender.com/api/players")).json();
    } catch(error) {
        console.log("error");
    }
};



const showPlayer = async () => {
    let players = await getPlayer();
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

        //TODO:
        //- if click on player show details. if clicked again hide details
        //- fix formatting for the NBA players
        //- fix button
        //- add form to the list of players
        //- make cursor a basketball for creativity

        a.onclick = () => {
            const p = document.createElement("p");
            section.append(p);
            section.classList.add("players");
            
            p.innerHTML = "Position: " + player.position + "<br>" + "Team: " + player.team + "<br>" + "Nickname: " + player.nickname + "<br>" + "Skills: " + player.skills;
            
            let img = document.createElement("img");
            section.append(img);
            img.src = "https://node-server-pwd6.onrender.com/" + player.img;

            return section;
        }   
    });
};

const showAddPlayer = async () => 
{
    document.getElementById("info").classList.remove("hidden");
};

const displayPlayer = async () => 
{

}

const addPlayer = async (e) => 
{
    e.preventDefault();

    const form = document.getElementById("add-player");
    const formData = new FormData(form);
    formData.append("skills", getSkills());
    const section = document.createElement("section");

    form.append(...formData);
};

const addSkill = (e) => 
{
    e.preventDefault();
    const skillBoxes = document.getElementById("skill-boxes");
    const input = document.createElement("input");
    input.type = "text";
    skillBoxes.append(input);
};

const getSkills = () => {
    const inputs = document.querySelectorAll("#skill-boxes input");
    const skills = [];

    inputs.forEach((input)=>
    {
        skills.push(input.value);
    });

    return skills;
}




window.onload = () => 
{
    showPlayer();
    document.getElementById("add-player").onsubmit = addPlayer;
    document.getElementById("button-add").onclick = showAddPlayer;
    document.getElementById("add-skill").onclick = addSkill;
};