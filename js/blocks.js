const latest_id = [0];
generateBlocks();
tick();

function generateBlock(latest_id)
{
    const block = document.createElement("div");
    block.classList.add("moving_block");
    block.style.width = "60px";
    block.style.height = "60px";
    block.style.borderRadius = "10px";
    block.style.border = "2px solid white";
    block.style.backgroundColor = "#aabaee";
    block.style.position = "absolute";
    block.style.top = "calc(" + `-${100}px` + ")";
    block.style.left = "calc(" + `${60 * (latest_id[0] % 10) +200}px` + ")";
    block["id"] = latest_id[0];
    console.log("generate a block by ID ", latest_id[0]);
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        block.addEventListener("touchstart", () => {console.log("koko");generateBlock(latest_id);block.remove()});
    } else {
        block.addEventListener("mousedown", () => {console.log("koko");generateBlock(latest_id);block.remove()});
    }
    document.body.appendChild(block);
}

function generateBlocks()
{
    for (var i = 0; i < 100; i++) {
        const block = document.createElement("div");
        block.classList.add("moving_block");
        block.style.width = "60px";
        block.style.height = "60px";
        block.style.borderRadius = "10px";
        block.style.border = "2px solid white";
        block.style.backgroundColor = "#aabaee";
        block.style.position = "absolute";
        block.style.top = "calc(" + `-${i*100}px` + ")";
        block.style.left = "calc(" + `${60 * (i % 10) +200}px` + ")";
        block["id"] = latest_id[0];
        latest_id[0] += 1;
        if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
            block.addEventListener("touchstart", () => {console.log("koko");generateBlock(latest_id); latest_id[0] +=1;block.remove()});
        } else {
            block.addEventListener("mousedown", () => {console.log("koko");generateBlock(latest_id); latest_id[0] +=1;block.remove()});
        }
        document.body.appendChild(block);
    }
}

function tick()
{
    requestAnimationFrame(tick);

    const blocks = document.querySelectorAll(".moving_block");
    for (const block of blocks) {
        if (block.style.top == "calc(" + `${Math.floor(block["id"]/10)*-60 + 1000}` + "px)") {
            block.classList.remove("moving_block");
            block.classList.add("positioned_block");
            continue;
        } else {
        
        }
        block.style.top = "calc(" + `${block.style.top}` + " + 10px)";
    }
}
