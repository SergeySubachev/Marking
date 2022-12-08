window.onload = () => {
    OnModeChange();
}

function OnModeChange() {
    document.getElementById("divGOST").hidden = !document.getElementById("radioGOST").checked;
    document.getElementById("divPIVRE").hidden = !document.getElementById("radioPIVRE").checked;
    document.getElementById("divPIVE").hidden = !document.getElementById("radioPIVE").checked;
}