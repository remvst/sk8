addZeroes = x => (x < 10 ? '0' : '') + ~~x;
formatTime = seconds => addZeroes(~~(seconds / 60)) + ':' + addZeroes(~~seconds % 60);
numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
