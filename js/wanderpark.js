/*********************************/
document.body.style.margin = "auto";
document.body.style.top = "auto";
document.body.style.backgroundColor = "black";
//document.body.style.width = `${window.innerWidth}`+"px";
//document.body.style.height = `${window.innerHeight}`+"px";
console.log(window.innerWidth, window.innerHeight);
/**********************************/
const area = document.createElement("div");
area.style.margin = "auto";
area.style.top = "auto";
area.style.backgroundColor = "rgba(250,250,250,0.3)";
//area.style.width = `${window.innerWidth-800}` + "px";
//area.style.height = `${window.innerHeight}` + "px";
document.body.appendChild(area);
/**********************************/

let mouseX = 0;
let mouseY = 0;

class Movement {
    get keep_following() {
        return this._keep_following;
    }
    set keep_following(state) {
        this._keep_following = state;
    }
    constructor(ball_number) {
        this.ball_number = ball_number;
        this.current_ballsX = new Int32Array(ball_number);
        this.current_ballsY = new Int32Array(ball_number);
        this.current_ballsVelX = new Int32Array(ball_number);
        this.current_ballsVelY = new Int32Array(ball_number);
        this.mouseX = 0;
        this.mouseY = 0;
        this._keep_following = false;
        this._keep_avoiding = false;
        this.init_follow();
        this.follow();
        console.log("Inside Constructor");
    }

    init_follow() {
        this._keep_following = true;
        const balls = document.querySelectorAll(".ball");
        for (var i = 0; i < balls.length; i++) {
            balls[i].remove();
        }
        for (var i = 0; i < this.ball_number; i++) {
            var ball = document.createElement("div");
            var ball_radius = window.innerHeight/40;
            ball.classList.add("ball");
            ball.style.backgroundColor = "white";
            ball.style.top = `${-ball_radius}px`;//`${window.innerHeight/2-7}`+"px";
            ball.style.left = `${-ball_radius}px`;//`${window.innerWidth/2-7}`+"px";
            ball.style.width = `${ball_radius*2}px`;
            ball.style.height = `${ball_radius*2}px`;
            ball.style.borderRadius =`${ball_radius}px`;
            ball.style.position = "absolute";

            document.body.appendChild(ball);
            document.body.style.backgroundColor = "rgb(88,88,165)";//color
        }


        document.addEventListener("mousemove", (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });
    }

    follow() 
    {
        this._followAnimationFrame = requestAnimationFrame(() => this.follow(this));
        const balls = document.querySelectorAll(".ball");

        if (balls.length != 0) {
            const first_ball = balls[0];
            this.current_ballsX[0] += (this.mouseX - this.current_ballsX[0]) * 0.1;
            this.current_ballsY[0] += (this.mouseY - this.current_ballsY[0]) * 0.1;
            balls[0].style.transform = `translate(${this.current_ballsX[0]}px, ${this.current_ballsY[0]}px)`;


            for (var i = 1; i < this.ball_number; i++) {
                this.current_ballsX[i] += (this.current_ballsX[i-1] - this.current_ballsX[i]) * 0.1;
                this.current_ballsY[i] += (this.current_ballsY[i-1] - this.current_ballsY[i]) * 0.1;
                balls[i].style.transform = `translate(${this.current_ballsX[i]}px, ${this.current_ballsY[i]}px)`;
            }
        }
    }
    stop_follow()
    //stop(_this)
    {
        console.log("StopFollow", this._keep_following);
        this._keep_following = false;
        const balls = document.querySelectorAll(".ball");
        for (var i = 0; i < balls.length; i++) {
            balls[i].remove();
        }
        cancelAnimationFrame(this._followAnimationFrame);
        console.log("StoppedFollow?");
    }

    init_avoid()
    {
        this._keep_avoiding = true;
        const balls = document.querySelectorAll(".ball");
        if (balls.length == 0) {
            for (var i = 0; i < this.ball_number; i++) {
                var ball = document.createElement("div");
                var ball_radius = window.innerHeight/40;
                ball.classList.add("ball");
                ball.style.backgroundColor = "white";
                ball.style.top = `${-ball_radius}px`;//`${window.innerHeight/2-7}`+"px";
                ball.style.left = `${-ball_radius}px`;//`${window.innerWidth/2-7}`+"px";
                ball.style.width = `${ball_radius*2}px`;
                ball.style.height = `${ball_radius*2}px`;
                ball.style.borderRadius =`${ball_radius}px`;
                ball.style.position = "absolute";
                document.body.appendChild(ball);
                document.body.style.backgroundColor = "rgb(176,83,95)";//color
            }
            const balls = document.querySelectorAll(".ball");
        }
        document.addEventListener("mousemove", (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });
    }

    avoid() {
        this._avoidAnimationFrame = requestAnimationFrame(() => this.avoid(this));
        const balls = document.querySelectorAll(".ball");

        if (balls.length != 0) {
            const first_ball = balls[0];
            var distance = Math.sqrt((this.mouseX - this.current_ballsX[0])**2+(this.mouseY - this.current_ballsY[0])**2);
            var intensity = Math.max(Math.min(10 * (-distance+2000)/1000.0,100), 0) * 0.1;
            var cutoff_distance = 500;
            
            if (distance > cutoff_distance) {
                this.current_ballsVelX[0] += 8 *(Math.random() - 0.5);
                this.current_ballsVelY[0] += 8 * (Math.random() - 0.5);
                this.current_ballsVelX[0] *= 0.9;//2 *(Math.random() - 0.5);
                this.current_ballsVelY[0] *= 0.9;
                this.current_ballsX[0] += this.current_ballsVelX[0];
                this.current_ballsY[0] += this.current_ballsVelY[0];
            } else {
                this.current_ballsVelX[0] = -5 * Math.sign(this.mouseX - this.current_ballsX[0]) * intensity;
                this.current_ballsVelY[0] = -5 * Math.sign(this.mouseY - this.current_ballsY[0]) * intensity;
                this.current_ballsVelX[0] *= 0.9;//2 *(Math.random() - 0.5);
                this.current_ballsVelY[0] *= 0.9;
                this.current_ballsX[0] += this.current_ballsVelX[0];
                this.current_ballsY[0] += this.current_ballsVelY[0];
            }
            if (this.current_ballsX[0] < 0) {
                this.current_ballsY[0] += Math.ceil((Math.random() - 0.5) * 10);
                this.current_ballsX[0] = window.innerWidth-300;
            }
            if (this.current_ballsX[0] > window.innerWidth) {
                this.current_ballsY[0] += Math.ceil((Math.random() - 0.5) * 10);
                this.current_ballsX[0] = 300;
            }
            if (this.current_ballsY[0] < 0) {
                this.current_ballsY[0] = window.innerHeight - 300;
            }
            if (this.current_ballsY[0] > window.innerHeight) {
                this.current_ballsY[0] = 300;
            }
            balls[0].style.transform = `translate(${this.current_ballsX[0]}px, ${this.current_ballsY[0]}px)`;

            for (var i = 1; i < this.ball_number; i++) {
                var distance = Math.sqrt((this.mouseX - this.current_ballsX[i])**2+(this.mouseY - this.current_ballsY[i])**2);
                var intensity = Math.max(Math.min(10 * (-distance+2000)/1000.0,100), 0) * 0.1;
                
                if (distance > cutoff_distance) {
                    this.current_ballsVelX[i] += 8 * (Math.random() - 0.5);
                    this.current_ballsVelY[i] += 8 * (Math.random() - 0.5);
                    this.current_ballsVelX[i] *= 0.9;//2 *(Math.random() - 0.5);
                    this.current_ballsVelY[i] *= 0.9;
                    this.current_ballsX[i] += this.current_ballsVelX[i];
                    this.current_ballsY[i] += this.current_ballsVelY[i];
                } else {
                    this.current_ballsVelX[i] = -5 * Math.sign(this.mouseX - this.current_ballsX[i]) * intensity;
                    this.current_ballsVelY[i] = -5 * Math.sign(this.mouseY - this.current_ballsY[i]) * intensity;
                    this.current_ballsVelX[i] *= 0.9;//2 *(Math.random() - 0.5);
                    this.current_ballsVelY[i] *= 0.9;
                    this.current_ballsX[i] += this.current_ballsVelX[i];
                    this.current_ballsY[i] += this.current_ballsVelY[i];
                }
                if (this.current_ballsX[i] < 0) {
                    this.current_ballsY[i] += Math.ceil((Math.random() - 0.5) * 10);
                    this.current_ballsX[i] = window.innerWidth-300;
                }
                if (this.current_ballsX[i] > window.innerWidth) {
                    this.current_ballsY[i] += Math.ceil((Math.random() - 0.5) * 10);
                    this.current_ballsX[i] = 300;
                }
                if (this.current_ballsY[i] < 0) {
                    this.current_ballsY[i] = window.innerHeight - 300;
                }
                if (this.current_ballsY[i] > window.innerHeight) {
                    this.current_ballsY[i] = 300;
                }
                balls[i].style.transform = `translate(${this.current_ballsX[i]}px, ${this.current_ballsY[i]}px)`;
            }
        }
    }
    stop_avoid()
    //stop(_this)
    {
        console.log("StopAvoid", this._keep_avoiding);
        this._keep_avoid = false;
        const balls = document.querySelectorAll(".ball");
        for (var i = 0; i < balls.length; i++) {
            balls[i].remove();
        }
        cancelAnimationFrame(this._avoidAnimationFrame);
        console.log("StoppedAvoid?");
    }


}

let ball_number = 7;
const movement = new Movement(ball_number);
var current_state = "follow";

document.addEventListener("click", (event) => {
    console.log(current_state, "here");
    if (current_state == "follow") {
        current_state = "avoid";
        movement.stop_follow();
        movement.init_avoid();
        movement.avoid();
        console.log("hereavoid?");
        const mode_display = document.querySelector("#mode");
        mode_display.innerHTML = "Avoid";
    } else {
        current_state = "follow";
        movement.stop_avoid();
        movement.init_follow();
        movement.follow();
        console.log("herefollow");
        const mode_display = document.querySelector("#mode");
        mode_display.innerHTML = "Follow";
    }
});


