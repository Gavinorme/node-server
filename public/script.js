const getPlayer = async () => {
    try {
        // return (await fetch("https://node-server4.onrender.com/api/player")).json();
        return (await fetch("api/player")).json();
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
            img.src = "https://node-server4.onrender.com/" + player.img;

            return section;
        }   
    });
};

// const showAddPlayer = async () => 
// {
//     document.getElementById("info").classList.remove("hidden");
// };

const displayDetails = async (player) => 
{
    const playerDetails = document.getElementById("player-details");
    playerDetails.innerHTML = "";

    const h3 = document.createElement("h3");
    h3.innerHTML = player.name;
    playerDetails.append(h3);

    const dLink = document.createElement("a");
    dLink.innerHTML = " &#x2715;";
    playerDetails.append(dLink);
    dLink.id = "delete-link";

    const eLink = document.createElement("a");
    eLink.innerHTML = "&#9998;";
    playerDetails.append(eLink);
    dLink.id = "edit-link";

    const p = document.createElement("p");
    p.innerHTML = player.team;
    playerDetails.append(p);

    const ul = document.createElement("ul");
    playerDetails.append(ul);
    console.log(player.skills);
    player.skills.forEach((skill) => {
        const li = document.createElement("li");
        ul.append(li);
        li.innerHTML = skill;
    });

    eLink.onclick = (e) => {
        e.preventDefault();
        document.querySelector(".dialog").classList.remove("transparent");
        document.getElementById("add-player").innerHTML = "Edit Player";
    };
    dLink.onclick = (e) => {
        e.preventDefault();
        //delete player
    };
    populateEditForm(player);
};

const addPlayer = async (e) => 
{
    e.preventDefault();

    // const form = document.getElementById("add-player");
    // const formData = new FormData(form);
    // formData.append("skills", getSkills());
    // const playerDetails = document.getElementById("player-details");

    // playerDetails.append(...formData);

    const form = document.getElementById("add-player");
    const formData = new FormData(form);
    formData.append("skills", getSkills());

    let response;

    //new player
    if(form._id.value == -1) {
        formData.delete("_id");
        console.log(...formData);
    
    response = await fetch("/api/players", {
        method: "POST",
        body: formData,
    });
    }
    if(response.status != 200) {
        console.log("Error contacting server");
        return;
    }

    document.querySelector(".dialog").classList.add("transparent");
    resetForm();
    showPlayer();
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

const resetForm = () => {
    const form = document.getElementById("add-player");
    form.reset();
    form._id = "-1";
    document.getElementById("skill-boxes").innerHTML = "";
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("second-title").innerHTML = "Add your Favorite Player";
    resetForm();
};


window.onload = () => 
{
    showPlayer();
    document.getElementById("add-player").onsubmit = addPlayer;
    document.getElementById("add-link").onclick = showHideAdd;

    // document.getElementById("button-add").onclick = showAddPlayer;
    document.getElementById("add-skill").onclick = addSkill;

    document.querySelector(".close").onclick = () => {
        document.querySelector(".dialog").classList.add("transparent");
    };
};