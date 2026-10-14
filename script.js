const KEY = "ff_tournament_data";

let data = JSON.parse(
  localStorage.getItem(KEY) || '{"matches":[]}'
);

function save() {
  localStorage.setItem(KEY, JSON.stringify(data));
  render();
}

function createMatch() {
  const input = document.getElementById("matchName");
  const name = input.value.trim();

  if (!name) {
    alert("Match-এর নাম লেখো!");
    return;
  }

  data.matches.push({
    id: Date.now().toString(),
    name: name,
    teams: []
  });

  input.value = "";
  save();
}

function addTeam(id) {
  const match = data.matches.find(m => m.id === id);

  if (!match) return;

  if (match.teams.length >= 12) {
    alert("সর্বোচ্চ ১২টি টিম যোগ করতে পারবে!");
    return;
  }

  match.teams.push({
    id: Date.now().toString() + Math.random(),
    name: "New Team",
    kill: 0,
    placement: 0
  });

  save();
}

function updateTeam(matchId, teamId, field, value) {
  const match = data.matches.find(m => m.id === matchId);
  const team = match?.teams.find(t => t.id === teamId);

  if (!team) return;

  if (field === "name") {
    team.name = value;
  } else {
    team[field] = Math.max(0, Number(value) || 0);
  }

  save();
}

function deleteTeam(matchId, teamId) {
  const match = data.matches.find(m => m.id === matchId);

  if (!match) return;

  match.teams = match.teams.filter(t => t.id !== teamId);
  save();
}

function total(team) {
  return Number(team.kill) + Number(team.placement);
}

function render() {
  const select = document.getElementById("matchSelect");
  const board = document.getElementById("leaderboard");
  const admin = document.getElementById("adminArea");

  if (!select || !board || !admin) return;

  const previous = select.value;

  select.innerHTML = data.matches.map(m =>
    `<option value="${m.id}">${m.name}</option>`
  ).join("");

  if (!data.matches.length) {
    select.innerHTML = "";
    board.innerHTML = "<p>এখনো কোনো ম্যাচ তৈরি করা হয়নি।</p>";
  } else {
    select.value = data.matches.some(m => m.id === previous)
      ? previous
      : data.matches[0].id;

    const match = data.matches.find(m => m.id === select.value);

    const teams = [...match.teams].sort(
      (a, b) => total(b) - total(a)
    );

    board.innerHTML = `
      <table border="1" cellpadding="8">
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Kill</th>
          <th>Placement</th>
          <th>Total</th>
        </tr>
        ${teams.map((t, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${t.name}</td>
            <td>${t.kill}</td>
            <td>${t.placement}</td>
            <td>${total(t)}</td>
          </tr>
        `).join("")}
      </table>
    `;
  }

  admin.innerHTML = data.matches.map(m => `
    <div>
      <h3>${m.name}</h3>
      <button onclick="addTeam('${m.id}')">
        + Team যোগ করো
      </button>

      ${m.teams.map(t => `
        <div>
          <input value="${t.name}"
            onchange="updateTeam('${m.id}','${t.id}','name',this.value)"
            placeholder="Team Name">

          <input type="number" min="0" value="${t.kill}"
            onchange="updateTeam('${m.id}','${t.id}','kill',this.value)"
            placeholder="Kill">

          <input type="number" min="0" value="${t.placement}"
            onchange="updateTeam('${m.id}','${t.id}','placement',this.value)"
            placeholder="Placement">

          <strong>Total: ${total(t)}</strong>

          <button onclick="deleteTeam('${m.id}','${t.id}')">
            Delete
          </button>
        </div>
      `).join("")}
    </div>
  `).join("");
}

document.getElementById("createMatch")
  ?.addEventListener("click", createMatch);

document.getElementById("matchSelect")
  ?.addEventListener("change", render);

render();
