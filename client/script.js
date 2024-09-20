let startTime, endTime, reactionTime;

function getRandomTime() {
    return Math.random() * 4000 + 1000;
}

function showBox() {
    const box = document.getElementById('box');
    box.style.left = Math.random() * (window.innerWidth - 150) + 'px'
    box.style.top = Math.random() * (window.innerHeight - 150) + 'px'
    box.style.display = 'block';
    startTime = new Date().getTime();
}

async function saveScore() {
    const response = await fetch('/highscore', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ score: reactionTime })
    })
    const data = await response.json()
    console.log(data)
    document.querySelector('.play2').innerHTML = `<span>${data.msg}</span>`
}




function startGame() {
    document.cookie = "name=" + document.getElementById("name").value
    const box = document.getElementById('box');
    document.querySelector('.play2').innerHTML = ``
    const message = document.getElementById('message');
    document.getElementById('playAgain').style.display = 'none';
    document.getElementById('save').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    document.getElementById('message').textContent = '';
    document.getElementById('result').textContent = ``;
    box.style.display = 'none';
    message.textContent = 'Wait for the ghost to appear...';

    const randomTime = getRandomTime();
    setTimeout(() => {
        message.textContent = 'Click the ghost!';
        showBox();
    }, randomTime);
}

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('playAgain').addEventListener('click', startGame);
document.getElementById('save').addEventListener('click', saveScore);
document.getElementById('box').addEventListener('click', () => {
    endTime = new Date().getTime();
    reactionTime = (endTime - startTime) / 1000;
    document.getElementById('playAgain').style.display = 'flex';
    document.getElementById('save').style.display = 'flex';
    document.getElementById('box').style.display = 'none';
    document.getElementById('message').textContent = 'Great job!';
    document.getElementById('result').textContent = `Your reaction time is ${reactionTime} seconds.`;
});
