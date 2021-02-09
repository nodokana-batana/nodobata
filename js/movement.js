export class Movement {
    constructor(ball_number) {
        this.ball_number = ball_number;
        this.current_ballsX = new Int32Array(ball_number);
        this.current_ballsY = new Int32Array(ball_number);
        this.mouseX = 0;
        this.mouseY = 0;
        this.init_follow();
        this.follow();
        console.log("Inside Constructor");
    }

    init_follow() {
        const balls = document.querySelectorAll(".ball");
        for (var i = 0; i < balls.length; i++) {
            balls[i].remove();
        }
        for (var i = 0; i < this.ball_number; i++) {
            var ball = document.createElement("div");
            var ball_radius = 500;
            ball.classList.add("ball");
            ball.style.backgroundColor = "white";
            ball.style.top = `${-ball_radius}px`;//`${window.innerHeight/2-7}`+"px";
            ball.style.left = ${-ball_radius}px`;//`${window.innerWidth/2-7}`+"px";
            ball.style.width = `${ball_radius*2}px`;
            ball.style.height = `${ball_radius*2}px`;
            ball.style.borderRadius =`${ball_radius}px` ;
            ball.style.position = "absolute";

            document.body.appendChild(ball);
        }


        document.body.addEventListener("mousemove", (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });
    }

    follow() 
    {
        requestAnimationFrame(() => {this.follow(this)});
        const balls = document.querySelectorAll(".ball");

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
