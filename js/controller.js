let frames = [];
let currentFrame;

window.onload = () => {
    onresize();
};

window.onresize = () => {    
    let imgIds = ["imgIntro", "imgUserName", "imgClassZone", "imgCheckEngine", "imgCheckLamp"];
    let imgWidthRates = [0.3, 0.4, 0.3, 0.4, 0.5];
    let images = imgIds.map((item) => {
        return document.getElementById(item);
    })

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    for (let i = 0; i < images.length; i++) {
        images[i].width = Math.round(windowWidth * imgWidthRates[i]);
    }

    const isSmall = windowWidth < 600 || windowWidth < 0.8 * windowHeight;
    let divIds = ["imgIntro", "imgUserName", "imgClassZone", "divImageEngine", "divImageLamp"];
    divIds.forEach(divId => {
        if (isSmall) document.getElementById(divId).classList.add("w3-hide");
        else document.getElementById(divId).classList.remove("w3-hide");
    });
}

function Init() {
    frames = [
        new Frame("divIntro")
    ];

    const isControlMode = document.getElementById("radioControlMode").checked;
    if (isControlMode) {
        frames.push(new FrameUserName("divUserName"));
    }

    frames = frames.concat([
        new FrameAboutStation("divAboutStation"),
        new FrameAboutFuel("divAboutFuel"),
        new FrameClassZone("divFrameClassZone"),
        new FrameCheckEngineAndStarter("divFrameCheckEngineAndStarter"),
        new FrameCheckLamp("divFrameCheckLamp"),
        new FrameCheckCabel("divFrameCheckCabel"),
        new FrameCheckWire("divFrameCheckWire"),
        new FrameResult("divResult")
    ]);

    for (let i = 0; i < frames.length; i++) {
        if (i > 0) frames[i].PrevFrame = frames[i - 1];
        if (i < frames.length - 1) frames[i].NextFrame = frames[i + 1];
        frames[i].Init();
    }

    currentFrame = frames[0];
}

function btnNextClick() {
    if (currentFrame == frames[0]) {
        Init();
    }

    if (currentFrame.IsComplete() && currentFrame.NextFrame != null) {
        currentFrame.Hide();
        currentFrame = currentFrame.NextFrame;
        currentFrame.Show();
    }
}

function btnPrevClick() {
    if (currentFrame.PrevFrame != null) {
        currentFrame.Hide();
        currentFrame = currentFrame.PrevFrame;
        currentFrame.Show();
    }
}

function btnRepeatClick() {
    currentFrame.Hide();
    currentFrame = frames[0];
    currentFrame.Show();
}