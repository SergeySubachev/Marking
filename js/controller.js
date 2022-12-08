window.onload = () => {
    OnModeChange();
}

function OnModeChange() {
    document.getElementById("divGOST").hidden = !document.getElementById("radioGOST").checked;
    document.getElementById("divPIVRE").hidden = !document.getElementById("radioPIVRE").checked;
    document.getElementById("divPIVE").hidden = !document.getElementById("radioPIVE").checked;
    Clear();
}

function Clear() {
    let divResult = document.getElementById("divResult");
    divResult.innerHTML = "пусто";
}

function ShowError() {
    let divResult = document.getElementById("divResult");
    divResult.innerHTML = "Не удалось расшифровать маркировку.";
}

function GetDescriptionGOST() {
    Clear();

    var tBox = document.getElementById("tbGOSTMark");
    var mark = tBox.value;
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
        if (kinds.length > i) {
            do {
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
                            i++;
                        }
                        description.push(`${iStr} - вид взрывозащиты: "Искробезопасная электрическая цепь"`);
                        break;
                    default:
                        ShowError();
                        return;
                }
                i++;
            } while (i < kinds.length);
        }
        else {
            ShowError();
            return;
        }
    }

    var classPos = mark.indexOf('T');
    if (classPos < 0) {
        ShowError();
        return;
    }
    else {
        var group = mark.substring(groupPos, classPos);
        switch (group) {
            case 'I':
                description.push('I - группа электрооборудования. Электрооборудование является взрывозащищенным для взрывоопасных смесей I категории (только для рудничного метана)')
                break;
            case 'II':
                description.push('II - группа электрооборудования. Электрооборудование является взрывозащищенным для взрывоопасных смесей категорий IIA, IIB, IIC');
                break;
            case 'IIA':
                description.push('IIA - подгруппа электрооборудования. Электрооборудование является взрывозащищенным для взрывоопасных смесей категории IIA');
                break;
            case 'IIB':
                description.push('IIB - подгруппа электрооборудования. Электрооборудование является взрывозащищенным для взрывоопасных смесей категорий IIA и IIB');
                break;
            case 'IIC':
                description.push('IIC - подгруппа электрооборудования. Электрооборудование является взрывозащищенным для взрывоопасных смесей категорий IIA, IIB и IIC');
                break;
            default:
                ShowError();
                return;
        }

        var tClass = mark.substring(classPos, classPos + 2);
        switch (tClass) {
            case "T1":
                description.push('T1 - температурный класс электрооборудования. Электрооборудование является взрывозащищенным для взрывоопасных смесей группы T1');
                break;
            case "T2":
                description.push('T2 - температурный класс электрооборудования. Электрооборудование является взрывозащищенным для взрывоопасных смесей групп T1 и T2');
                break;
            case "T3":
                description.push('T3 - температурный класс электрооборудования. Электрооборудование является взрывозащищенным для взрывоопасных смесей групп T1, T2 и T3');
                break;
            case "T4":
                description.push('T4 - температурный класс электрооборудования. Электрооборудование является взрывозащищенным для взрывоопасных смесей групп T1, T2, T3 и T4');
                break;
            case "T5":
                description.push('T5 - температурный класс электрооборудования. Электрооборудование является взрывозащищенным для взрывоопасных смесей групп T1, T2, T3, T4 и T5');
                break;
            case "T6":
                description.push('T6 - температурный класс электрооборудования. Электрооборудование является взрывозащищенным для взрывоопасных смесей групп T1, T2, T3, T4, T5 и T6');
                break;
            default:
                ShowError();
                return;
        }
    }

    ShowDescription(description);
}

function ShowDescription(description) {
    let divResult = document.getElementById("divResult");
    divResult.innerHTML = "";
    for (const it of description) {
        let p = document.createElement("p");
        p.innerText = it;
        p.style.lineHeight = 1.0;
        divResult.appendChild(p);
    }
}