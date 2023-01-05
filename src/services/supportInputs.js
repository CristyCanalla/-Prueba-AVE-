    
    function processPathForInputChange(val, objDatToChange, positionsPath) {
        let obDat = objDatToChange;
        positionsPath.forEach(function (pos, idx, array) {
            let idxPos = null;
            
            if (pos.indexOf('[') !== -1) {
                idxPos = pos.split('[');
                pos = idxPos[0];
                idxPos = idxPos[1].split(']');
                idxPos = idxPos[0];
            }

            if (idx < array.length - 1) {
                if (idxPos !== null) {
                    
                    if (obDat[pos] === undefined) {
                        obDat[pos] = [];
                        obDat[pos][idxPos] = {};
                    }
                    if (!Array.isArray(obDat[pos])) {
                        obDat[pos] = [];
                    }
                    if (obDat[pos][idxPos] === undefined) {
                        obDat[pos][idxPos] = {};
                    }
                    obDat = obDat[pos][idxPos];
                }
                else {
                    if (obDat[pos] === undefined) {
                        obDat[pos] = {};
                    }
                    obDat = obDat[pos];
                }
            }
            else {
                if (idxPos !== null) {
                    if (obDat[pos] === undefined) {
                        obDat[pos] = [];
                    }
                    if (!Array.isArray(obDat[pos])) {
                        obDat[pos] = [];
                    }
                    obDat[pos][idxPos] = val;
                } else {
                    obDat[pos] = val;
                }
            }
        });
        return objDatToChange;
    }

        

    function valueForInput(path, objToExplore) {
        let positionsPath = path.split('.');
        let obDat = objToExplore;
        let valToReturn = '';
        try {
            positionsPath.forEach(function (pos, idx, array) {
                let idxPos = null;
              
                if (pos.indexOf('[') !== -1) {
                    idxPos = pos.split('[');
                    pos = idxPos[0];
                    idxPos = idxPos[1].split(']');
                    idxPos = idxPos[0];
                }
                if (obDat[pos] === undefined) {
                    throw 'Valor [' + pos + '] undefined';
                }
                if (idxPos !== null) {
                    if (obDat[pos][idxPos] === undefined) {
                        throw 'Valor [' + pos + '] con indice [' + idxPos + '] undefined';
                    }
                    else {
                        obDat = obDat[pos][idxPos];
                    }
                }
                else {
                    obDat = obDat[pos];
                }
            });
            valToReturn = obDat;
        } catch (e) {
            valToReturn = '';
           
        }
        return valToReturn
    }

    export {
        processPathForInputChange,
        valueForInput
    }