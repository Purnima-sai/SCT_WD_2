        let startTime;
        let elapsedTime = 0;
        let timerInterval;
        let isRunning = false;
        let lapCount = 1;

        const display = document.getElementById('display');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const lapBtn = document.getElementById('lapBtn');
        const lapsList = document.getElementById('lapsList');

        function formatTime(time) {
            let date = new Date(time);
            let hours = date.getUTCHours().toString().padStart(2, '0');
            let minutes = date.getUTCMinutes().toString().padStart(2, '0');
            let seconds = date.getUTCSeconds().toString().padStart(2, '0');
            let milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
            
            return `${hours}:${minutes}:${seconds}.${milliseconds}`;
        }

        function updateDisplay() {
            display.textContent = formatTime(elapsedTime);
        }

        function startTimer() {
            if (!isRunning) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(function() {
                    elapsedTime = Date.now() - startTime;
                    updateDisplay();
                }, 10);
                isRunning = true;
                
                startBtn.disabled = true;
                pauseBtn.disabled = false;
                resetBtn.disabled = false;
                lapBtn.disabled = false;
                
                display.classList.add('pulse');
            }
        }

        function pauseTimer() {
            if (isRunning) {
                clearInterval(timerInterval);
                isRunning = false;
                
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                
                display.classList.remove('pulse');
            }
        }

        function resetTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            elapsedTime = 0;
            lapCount = 1;
            
            updateDisplay();
            lapsList.innerHTML = '';
            
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            resetBtn.disabled = true;
            lapBtn.disabled = true;
            
            display.classList.remove('pulse');
        }

        function recordLap() {
            if (isRunning) {
                const lapTime = formatTime(elapsedTime);
                const lapItem = document.createElement('li');
                
                // Create a colorful gradient for the lap number
                lapItem.innerHTML = `
                    <span class="lap-number">Lap ${lapCount}</span>
                    <span class="lap-time">${lapTime}</span>
                `;
                
                lapsList.prepend(lapItem);
                lapCount++;
                
                // Add a temporary highlight to the new lap
                lapItem.style.animation = 'none';
                void lapItem.offsetWidth; // Trigger reflow
                lapItem.style.animation = 'fadeIn 0.5s';
            }
        }

        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        lapBtn.addEventListener('click', recordLap);

        // Initialize display
        updateDisplay();
