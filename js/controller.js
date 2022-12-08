window.onload = () => {
    OnModeChange();
}

function OnModeChange() {
    document.getElementById("divGOST").hidden = !document.getElementById("radioGOST").checked;
    document.getElementById("divPIVRE").hidden = !document.getElementById("radioPIVRE").checked;
    document.getElementById("divPIVE").hidden = !document.getElementById("radioPIVE").checked;
}

function ShowError() {

}

function GetDescriptionGOST() {
    var mark = document.getElementById("tbGOSTMark").innerText;
    var description = [];

    var level = mark.charAt(0);
    switch (level) {
        case '0':
            description.push('0 - Уровень взрывозащиты: "Особовзрывобезопасное электрооборудование"');
            break;
        case '1':
            description.push('1 - Уровень взрывозащиты: "Взрывобезопасное электрооборудование"');
            break;
        case '2':
            description.push('2 - Уровень взрывозащиты: "Электрооборудование повышенной надежности против взрыва"');
            break;
        default:
            ShowError();
            return;
    }

    if (mark.substring(1, 3) == 'Ex') {
        description.push('Ex - знак, указывающий на соответствие электрооборудования стандартам на взрывозащищенное электрооборудование');
    }
    else {
        ShowError();
        return;
    }

    var groupPos = mark.indexOf('I');
    if (groupPos < 0) {
        ShowError();
        return;
    }
    else {
        var kinds = mark.substring(3, groupPos);
        var i = 0;
        do {
            if (kinds.length > i) {
                var kind = kinds.substring(i, i + 1);
                switch (kind) {
                    case 'd':
                        description.push('d - вид взрывозащиты: "Взрывонепроницаемая оболочка"');
                        break;
                    case 'p':
                        description.push('p - вид взрывозащиты: "Заполнение или продувка оболочки под избыточным давлением защитным газом"');
                        break;
                    case 'q':
                        description.push('q - вид взрывозащиты: "Кварцевое заполнение оболочки с токоведущими частями"');
                        break;
                    case 'o':
                        description.push('o - вид взрывозащиты: "Масляное заполнение оболочки с токоведущими частями"');
                        break;
                    case 's':
                        description.push('s - вид взрывозащиты: "Специальный вид взрывозащиты"');
                        break;
                    case 'e':
                        description.push('e - вид взрывозащиты: "Повышенная надежность против взрыва (защита вида "e")"');
                        break;
                    case 'i':
                        var iStr = 'i';
                        if (kinds.length >= i + 2) {
                            iStr = kinds.substring(i, i + 2);
                            if (iStr != 'ia' && iStr != 'ib' && iStr != 'ic') {
                                ShowError();
                                return;
                            }
                        }
                        description.push(`${iStr} - вид взрывозащиты: "Искробезопасная электрическая цепь"`);
                       
                        break;
                    default:
                        ShowError();
                        return;
                }
            }
            else {
                ShowError();
                return;
            }
        } while ();

    }



}